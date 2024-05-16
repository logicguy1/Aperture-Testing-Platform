import pytest
from sql.databaseMGR import DatabaseManager
from sql.benchmark import Benchmark
from sql.user import User
import random
import string


class TestBenchmarkDbManager(DatabaseManager):
    def delete_user(self, username: str) -> None:
        db, cursor = self._connect()
        self._commit_data(db, cursor, "DELETE FROM users WHERE username = %s;", [username])
        self._close(db)

    def create_benchmark(self) -> 'Benchmark':
        db, cursor = self._connect()
        self._commit_data(db, cursor, "INSERT INTO apeture.benchmarks (id, benchmark_name, unit, data_range, data_cutoff, normalisation_vector) VALUES(0, '', 'ms', 100, 1000, 'lower_better');")
        benchmarkId = self._execute_query(db, cursor, "SELECT id FROM benchmarks WHERE benchmark_name = 'Testing Benchmark'")[0]["id"]
        self._close(db)
        return Benchmark(benchmarkId)

    def get_user_score(self, userId) -> int:
        db, cursor = self._connect()
        score = self._execute_query(db, cursor, "SELECT value FROM scores WHERE user_id = %s;", [userId])[0]["value"]
        self._close(db)
        return score

    def delete_benchmark(self) -> None:
        db, cursor = self._connect()
        self._commit_data(db, cursor, "DELETE FROM benchmarks WHERE benchmark_name = 'Testing Benchmark'")
        self._close(db)

    def delete_scores(self, userId: int) -> None:
        db, cursor = self._connect()
        self._commit_data(db, cursor, "DELETE FROM scores WHERE user_id = %s;", [userId])
        self._close(db)


def random_word(length) -> str:
    return 'test_'.join(random.choice(string.ascii_lowercase) for i in range(length))



DBMGR = TestBenchmarkDbManager()

USER = User(-1)

USERNAME = random_word(5)
EMAIL = f"{random_word(5)}@{random_word(5)}.com"
PASSWORD = random_word(5)

SCORE = random.randint(1, 1000)

def test_score_save():
    """
    Test score saving using the Benchmark class
    """
    USER.register(USERNAME, EMAIL, PASSWORD)
    user1 = USER.login(USERNAME, PASSWORD)
    benchmark = DBMGR.create_benchmark()
    benchmark.update_score(user1.id, SCORE)
    DBMGR.delete_scores(user1.id)
    DBMGR.delete_benchmark()
    DBMGR.delete_user(user1.username)

def test_score_get():
    """
    Test get score using the Benchmark class
    """
    USER.register(USERNAME, EMAIL, PASSWORD)
    user1 = USER.login(USERNAME, PASSWORD)
    benchmark = DBMGR.create_benchmark()
    benchmark.update_score(user1.id, SCORE)
    DBMGR.delete_scores(user1.id)
    DBMGR.delete_benchmark()
    DBMGR.delete_user(user1.username)
