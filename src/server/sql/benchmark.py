from typing import Dict, List, Tuple, Any, Type
import datetime

from sql.databaseMGR import DatabaseManager
from jwtHandler import JWTHandler

class Benchmark(DatabaseManager):
    def __init__(self, id: int):
        self.id: int = id
        self.name = ""
        self.unit = ""

        # The constructor should not run with invalid IDs
        if id == -1:
            return

        db, cursor = self._connect()

        # Get information about the user
        benchmark_info = self._execute_query(
            db, cursor,
            "SELECT benchmark_name, unit FROM benchmarks WHERE id = %s", 
            [id]
        )[0]

        # Save the information in the object
        self.name = benchmark_info["benchmark_name"]
        self.unit = benchmark_info["unit"]

        # Close the database connection
        self._close(db)

    def __repr__(self):
        return f"<Benchmark:{self.id}_{self.name}>"

    def __bool__(self):
        return self.id != -1

    def __eq__(self, other):
        return self.id == other.id

    def update_score(self, user_id: str, score: int) -> Dict[str, Any]:
        db, cursor = self._connect()

        user_id = self._commit_data(
            db, cursor,
            """INSERT INTO scores (benchmark_id, user_id, value) VALUES (%s,%s,%s);""", 
            [self.id, user_id, int(score)]
        )
        self._close(db)

        return True
        
    def get_scoreboard(self) -> List[Dict[str, Any]] :
        db, cursor = self._connect()

        data = self._execute_query(
            db, cursor,
            """
SELECT 
    S.user_id,
    U.username,
    AVG(S.value / S_SUM.sumValue) AS normalised_value,
    S.benchmark_id
FROM
    scores S
        JOIN
    (SELECT 
        benchmark_id, SUM(value) AS sumValue
    FROM
        scores
    GROUP BY benchmark_id) S_SUM ON S_SUM.benchmark_id = S.benchmark_id
JOIN users U ON U.id = S.user_id
GROUP BY user_id
ORDER BY normalised_value
LIMIT 50;""")
        self._close(db)

        return data
