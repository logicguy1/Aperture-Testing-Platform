from typing import Dict, List, Tuple, Any, Type
import datetime

from sql.databaseMGR import DatabaseManager
from jwtHandler import JWTHandler

class User(DatabaseManager):
    def __init__(self, id: int):
        self.id: int = id
        self.username = ""
        self.email = ""
        self.create_time = ""

        # The constructor should not run with invalid IDs
        if id == -1:
            return

        db, cursor = self._connect()

        # Get information about the user
        user_info = self._execute_query(
            db, cursor,
            "SELECT username, email, create_time FROM users WHERE id = %s", 
            [id]
        )[0]

        # Save the information in the object
        self.username = user_info["username"]
        self.email = user_info["email"]
        self.create_time = user_info["create_time"]

        # Close the database connection
        self._close(db)

    def __repr__(self):
        return f"<User:{self.id}_{self.username}>"

    def __bool__(self):
        return self.id != -1

    def __eq__(self, other):
        return self.id == other.id

    def login(self, username: str, password: str) -> bool:
        db, cursor = self._connect()

        try:
            # Find the user in the database
            user_id = self._execute_query(
                db, cursor,
                "SELECT id FROM users WHERE username = %s AND password = %s", 
                [username, password]
            )[0]
            self._close(db)

            return User(user_id["id"])
        # If the login failed
        except IndexError:
            return User(-1)
            
    def generate_jwt(self) -> str:
        # Generate the jwt token
        jwt = JWTHandler().encode({
            "id": self.id,
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

        # Save jwt to the database for authendication
        db, cursor = self._connect()
        self._commit_data(
            db, cursor,
            "INSERT INTO tokens (jwt, user_id) VALUES (%s,%s)", 
            [jwt, self.id]
        )
        self._close(db)

        return jwt

