from typing import Dict, List, Tuple, Any, Type, Optional
import secrets
import hashlib

from sql.databaseMGR import DatabaseManager

class Migrator(DatabaseManager):
    def __init__(self):
        db, cursor = self._connect()

        # Added normalisation vector for the scoreboard
        self._add_column(db, cursor, "benchmarks", "normalisation_vector", "varchar(100)", "'lower_better'")
        self._commit_data(db, cursor, "UPDATE benchmarks SET normalisation_vector='higher_better' WHERE id=4;")
        self._commit_data(db, cursor, "UPDATE benchmarks SET normalisation_vector='higher_better' WHERE id=6;")

        # Password hashing update with SHA256
        if not self._column_exsists(db, cursor, "users", "password_salt"):
            self._add_column(db, cursor, "users", "password_salt", "varchar(30)", after="password")
            self._update_datatype(db, cursor, "users", "password", "varchar(64)")

            users = self._execute_query(db, cursor, "SELECT id, password FROM users;")
            for u in users:
                salt = secrets.token_hex(nbytes=None)[0:30]
                hash = hashlib.sha256()
                hash.update(u["password"].encode())
                hash.update(salt.encode())

                self._commit_data(db, cursor, "UPDATE users SET password=%s, password_salt=%s WHERE id=%s", [hash.hexdigest(), salt, u["id"]])

        # Add typing game
        if not len(self._execute_query(db, cursor, """SELECT id FROM benchmarks WHERE id=1;""")):
            self._commit_data(db, cursor, """INSERT INTO benchmarks (id, benchmark_name, unit, data_range, data_cutoff, normalisation_vector) VALUES (1, 'Typing game', 'wpm', 100, 1000, 'lower_better')""")
        self._commit_data(db, cursor, """UPDATE benchmarks SET data_range=25, data_cutoff=250 WHERE id=1;""")
        

        
        # Close the database connection
        self._close(db)

    def _add_column(self, db, cursor, table: str, name: str, datatype: str, default: Optional[str] = None, after: Optional[str] = None) -> None:
        default_text = f" DEFAULT {default}" if default else ''
        after_text = f" AFTER {after}" if after else ''
        # Unsafe query, do not have dynamic user input
        self._commit_data(db, cursor, f"""
IF NOT EXISTS ( 
    SELECT * FROM information_schema.columns 
    WHERE table_name = '{table}' 
    AND column_name = '{name}'
) THEN
    ALTER TABLE {table} ADD {name} {datatype}{default_text};
END IF;
        """)

    def _column_exsists(self, db, cursor, table, column_name) -> bool:
        result = self._execute_query(db, cursor, f"""
SHOW COLUMNS FROM `{table}` LIKE '{column_name}';
        """)
        return bool(len(result))

    def _update_datatype(self, db, cursor, table, column_name, datatype):
        self._commit_data(db, cursor, f"ALTER TABLE {table} MODIFY {column_name} {datatype};")
