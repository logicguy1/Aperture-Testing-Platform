from typing import Dict, List, Tuple, Any, Type
import datetime
import hashlib
import secrets

from sql.databaseMGR import DatabaseManager
from jwtHandler import JWTHandler

class User(DatabaseManager):
    def __init__(self, id: int):
        self.id: int = id
        self.username = ""
        self.email = ""
        self.create_time = ""
        self.friend_code = ""

        # The constructor should not run with invalid IDs
        if id == -1:
            return

        db, cursor = self._connect()

        # Get information about the user
        user_info = self._execute_query(
            db, cursor,
            "SELECT username, email, create_time, friend_code FROM users WHERE id = %s", 
            [id]
        )[0]

        # Save the information in the object
        self.username = user_info["username"]
        self.email = user_info["email"]
        self.create_time = user_info["create_time"]
        self.friend_code = user_info["friend_code"]

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
            user = self._execute_query(
                db, cursor,
                "SELECT id, password, password_salt FROM users WHERE username = %s", 
                [username]
            )[0]
            self._close(db)

            hash = hashlib.sha256()
            hash.update(password.encode())
            hash.update(user["password_salt"].encode())

            if hash.hexdigest() == user["password"]:
                return User(user["id"])
            else:
                raise IndexError

        # If the login failed
        except IndexError:
            self._close(db)
            return User(-1)

    def register(self, username: str, email: str, password: str):
        db, cursor = self._connect()

        salt = secrets.token_hex(nbytes=None)[0:30]
        hash = hashlib.sha256()
        hash.update(password.encode())
        hash.update(salt.encode())
        password = hash.hexdigest()

        try:
            self._commit_data(
                db, cursor, 
                "INSERT INTO users (username, email, password, password_salt) VALUES(%s, %s, %s, %s);", 
                [username, email, password, salt]
            )
            self._close(db)
            return True

        except IndexError:
            self._close(db)
            return False


    def generate_jwt(self) -> str:
        # Generate the jwt token
        jwt = JWTHandler().encode({
            "id": self.id,
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        print(jwt)

        # Save jwt to the database for authendication
        db, cursor = self._connect()
        self._commit_data(
            db, cursor,
            "INSERT INTO tokens (jwt, user_id) VALUES (%s,%s)", 
            [jwt, self.id]
        )
        self._close(db)

        return jwt

    def authendicate_jwt(self, jwt: str, decoded_jwt: Tuple[str, Any]) -> bool:
        db, cursor = self._connect()

        try:
            # Find the token in the database, where it is no older than 24 hours
            user_id = self._execute_query(
                db, cursor,
                """
SELECT 
    id
FROM
    tokens
WHERE
    jwt = %s AND user_id = %s
        AND TIMESTAMPDIFF(HOUR,
        NOW(),
        create_time) <= 24;""", 
                [jwt, decoded_jwt["id"]]
            )[0]
            self._close(db)

            return True

        # If the authendication failed
        except IndexError:
            self._close(db)
            return False
        
    def get_scores(self):
        db, cursor = self._connect()
        scores = self._execute_query(
            db, cursor,
                """
SELECT 
    B.id,
    B.benchmark_name,
    B.unit,
    count(S.id) AS attempts,
    COALESCE(AVG(S.value), - 1) AS avg,
    COALESCE(MIN(S.value), - 1) AS min,
    COALESCE(MAX(S.value), - 1) AS max
FROM
    benchmarks B
        LEFT JOIN
    (SELECT * FROM scores WHERE user_id = %s) S 
        ON S.benchmark_id = B.id
GROUP BY B.id
ORDER BY B.benchmark_name;""", 
            [self.id]
        )
        self._close(db)

        return scores

    def use_friend_code(self, friend_code: str):
        db, cursor = self._connect()
        scores = self._commit_data(
            db, cursor,
                """
INSERT
	INTO
	friends (user_id_1,
	user_id_2)
VALUES (%s,
(
SELECT
	id
FROM
	users
WHERE
	friend_code = %s));""", 
            [self.id, friend_code]
        )
        self._close(db)

    def get_friends(self):
        db, cursor = self._connect()
        friends = self._execute_query(
            db, cursor,
                """
SELECT DISTINCT
	username
FROM
	users,
	friends
WHERE 
	(%s = friends.user_id_1
		AND friends.user_id_2 = users.id)
	OR (%s = friends.user_id_2
		AND friends.user_id_1 = users.id)
GROUP BY 
	friends.id
                """, 
            [self.id, self.id]
        )
        self._close(db)

        print(friends)

        return [friend['username'] for friend in friends]


