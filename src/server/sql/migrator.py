from typing import Dict, List, Tuple, Any, Type, Optional

from sql.databaseMGR import DatabaseManager

class Migrator(DatabaseManager):
    def __init__(self):
        db, cursor = self._connect()

        self._add_column(db, cursor, "benchmarks", "normalisation_vector", "varchar(100)", "'lower_better'")
        self._commit_data(db, cursor, "UPDATE benchmarks SET normalisation_vector='higher_better' WHERE id=4;")
        self._commit_data(db, cursor, "UPDATE benchmarks SET normalisation_vector='higher_better' WHERE id=6;")

        # Close the database connection
        self._close(db)

    def _add_column(self, db, cursor, table: str, name: str, datatype: str = "varchar(100)", default: Optional[str] = None):
        default_text = f" DEFAULT {default}" if default else ''
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
