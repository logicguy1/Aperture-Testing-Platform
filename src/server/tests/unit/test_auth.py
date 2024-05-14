import pytest
from sql.databaseMGR import DatabaseManager
from sql.user import User
import random
import string


class TestAuthDbManager(DatabaseManager):
    def get_username_from_email(self, email: str) -> str:
        db, cursor = self._connect()
        username = self._execute_query(db, cursor, 
                                       "SELECT username FROM users WHERE email = %s",
                                       [email])[0]["username"]
        self._close(db)
        return username

    def delete_user(self, username: str):
        db, cursor = self._connect()
        self._commit_data(db, cursor, "DELETE FROM users WHERE username = %s;", [username])
        self._close(db)



def random_word(length) -> str:
    return 'test_'.join(random.choice(string.ascii_lowercase) for i in range(length))



DBMGR = TestAuthDbManager()

USERNAME = random_word(5)
EMAIL = f"{random_word(5)}@{random_word(5)}.com"
PASSWORD = random_word(5)




def test_user_signup():
    """
    Test user signup using the User class
    """
    user = User(-1)
    user.register(USERNAME, EMAIL, PASSWORD)
    username_from_db = DBMGR.get_username_from_email(EMAIL)
    DBMGR.delete_user(USERNAME)

    assert USERNAME == username_from_db

def test_user_signup_errors():
    """
    Test errors on user signup using the User class
    """
    user = User(-1)
    user1 = user.register(USERNAME, EMAIL, PASSWORD)
    user2 = user.register(USERNAME, EMAIL, PASSWORD)
    DBMGR.delete_user(USERNAME)

    assert user1 == True
    assert user2 == False

def test_user_login():
    """
    Test user login using the User class
    """
    user = User(-1)
    user.register(USERNAME, EMAIL, PASSWORD)
    user1 = user.login(USERNAME, PASSWORD)
    DBMGR.delete_user(USERNAME)

    assert user1.username == USERNAME

def test_user_login_errors():
    """
    Test errors on user login using the User class
    """
    user = User(-1)
    user1 = user.login(USERNAME, PASSWORD)
    user.register(USERNAME, EMAIL, PASSWORD)
    user2 = user.login(USERNAME, f"{PASSWORD}1")
    DBMGR.delete_user(USERNAME)

    assert user1.id == -1 
    assert user2.id == -1
