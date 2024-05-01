from typing import Dict, List, Tuple, Any, Type
import datetime

from sql.databaseMGR import DatabaseManager
from jwtHandler import JWTHandler

class Benchmark(DatabaseManager):
    def __init__(self, id: int):
        self.id: int = id
        self.name = ""
        self.unit = ""
        self.data_range = 0
        self.data_cutoff = 0

        # The constructor should not run with invalid IDs
        if id == -1:
            return

        db, cursor = self._connect()

        # Get information about the user
        benchmark_info = self._execute_query(
            db, cursor,
            "SELECT benchmark_name, unit, data_range, data_cutoff FROM benchmarks WHERE id = %s", 
            [id]
        )[0]

        # Save the information in the object
        self.name = benchmark_info["benchmark_name"]
        self.unit = benchmark_info["unit"]
        self.data_range = benchmark_info["data_range"]
        self.data_cutoff = benchmark_info["data_cutoff"]

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

    def get_bell(self, user_id: int = -1) -> List[Dict[str, Any]]:
        db, cursor = self._connect()

        world_data = self._execute_query(
            db, cursor,
        """
WITH RECURSIVE NumberSeries AS (
  SELECT %s AS value
  UNION ALL
  SELECT value + %s
  FROM NumberSeries
  WHERE value < %s
)
SELECT NumberSeries.value, COUNT(scores.value) / (SELECT count(*) FROM scores WHERE scores.benchmark_id=%s) * 100 AS count, COUNT(scores.value) as count_amount
FROM NumberSeries
LEFT JOIN (SELECT * FROM scores WHERE benchmark_id = %s) AS scores ON scores.value >= NumberSeries.value AND scores.value < NumberSeries.value +%s 
GROUP BY NumberSeries.value
ORDER BY NumberSeries.value;""",
        [self.data_range, self.data_range, self.data_cutoff, self.id, self.id, self.data_range])

        user_data = self._execute_query(
            db, cursor,
        """
WITH RECURSIVE NumberSeries AS (
  SELECT %s AS value
  UNION ALL
  SELECT value + %s
  FROM NumberSeries
  WHERE value < %s
)
SELECT NumberSeries.value, COUNT(scores.value) / (SELECT count(*) FROM scores WHERE scores.benchmark_id=%s AND scores.user_id = %s) * 100 AS count, COUNT(scores.value) as count_amount
FROM NumberSeries
LEFT JOIN (SELECT * FROM scores WHERE benchmark_id = %s AND user_id = %s) AS scores ON scores.value >= NumberSeries.value AND scores.value < NumberSeries.value + %s
GROUP BY NumberSeries.value
ORDER BY NumberSeries.value;""",
        [self.data_range, self.data_range, self.data_cutoff, self.id, user_id, self.id, user_id, self.data_range])

        friend_data = self._execute_query(
            db, cursor,
        """
WITH RECURSIVE NumberSeries AS (
  SELECT %s AS value
  UNION ALL
  SELECT value + %s
  FROM NumberSeries
  WHERE value < %s
)
SELECT NumberSeries.value, COUNT(scores.value) / (SELECT count(scores.value) FROM scores, friends WHERE scores.benchmark_id = %s AND ((%s = friends.user_id_1 AND friends.user_id_2 = scores.user_id)OR(%s = friends.user_id_2 AND friends.user_id_1 = scores.user_id)) ) * 100 AS count, COUNT(scores.value) as count_amount
FROM NumberSeries
LEFT JOIN (SELECT scores.id, scores.benchmark_id, scores.user_id, scores.value, scores.create_time  FROM scores, friends WHERE scores.benchmark_id = %s AND ((%s = friends.user_id_1 AND friends.user_id_2 = scores.user_id)OR(%s = friends.user_id_2 AND friends.user_id_1 = scores.user_id))) AS scores ON scores.value >= NumberSeries.value AND scores.value < NumberSeries.value + %s
GROUP BY NumberSeries.value
ORDER BY NumberSeries.value;
        """,
        [self.data_range, self.data_range, self.data_cutoff, self.id, user_id, user_id, self.id, user_id, user_id, self.data_range])

        self._close(db)
        return {
            "world": world_data,
            "user": user_data,
            "friends": friend_data,
        }
