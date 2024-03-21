from typing import Dict, List, Tuple, Any
import mysql.connector
from abc import ABC, abstractmethod


class DatabaseManager(ABC):
    def __init__(self):
        schema: str = "apeture"
        host: str = "localhost"
        user: str = "drill"
        password: str = "test123"

    def _connect(self) -> Tuple[mysql.connector.connection.MySQLConnection, mysql.connector.connection_cext.CMySQLConnection]:
        db = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.schema,
            dictionary=True
        )
        cursor = db.cursor()

        return (db, cursor)

    def _execute_query(
        self, 
        db: mysql.connector.connection.MySQLConnection, 
        cursor: mysql.connector.connection_cext.CMySQLConnection, 
        sql: str, 
        vals: List[Any]
    ) -> List[Any]:
        cursor.execute(sql, vals)
        result = self.cursor.fetchall()
        return result

    def _commit_data(
        self, 
        db: mysql.connector.connection.MySQLConnection, 
        cursor: mysql.connector.connection_cext.CMySQLConnection, 
        sql: str, 
        vals: List[Any]
    ) -> None:
        cursor.execute(sql, vals)
        db.commit()
        return result

    def _close(self, db: mysql.connector.connection.MySQLConnection) -> None:
        db.close()


