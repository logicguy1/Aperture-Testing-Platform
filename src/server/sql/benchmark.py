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
	user_id,
	(
	SELECT
		username
	FROM
		users
	WHERE
		id = user_id) AS username,
	AVG(normalized_value)AS normalised_value,
	input_count
FROM
	(
	SELECT
		b.id,
		u.user_id, 
		(SELECT
				COUNT(DISTINCT ss.benchmark_id) AS unique_benchmark_ids
			FROM
				scores ss
			WHERE
				ss.user_id = u.user_id) AS input_count,
		COALESCE(s.value, 0) AS value,
		CASE
			WHEN b.normalisation_vector = 'lower_better' THEN 
                CASE
				WHEN AVG(s.value) OVER(PARTITION BY b.id) = 0 THEN NULL
				ELSE 1 / (COALESCE(s.value, 0) / AVG(s.value) OVER(PARTITION BY b.id))
			END
			ELSE 
                CASE
				WHEN AVG(s.value) OVER(PARTITION BY b.id) = 0 THEN NULL
				ELSE COALESCE(s.value, 0) / AVG(s.value) OVER(PARTITION BY b.id)
			END
		END AS normalized_value
	FROM
		(
		SELECT
			DISTINCT id,
			normalisation_vector
		FROM
			benchmarks) b
	CROSS JOIN
        (
		SELECT
			DISTINCT user_id
		FROM
			scores) u
	LEFT JOIN 
        scores s ON
		s.benchmark_id = b.id
		AND s.user_id = u.user_id
) AS subquery
GROUP BY
	user_id
ORDER BY
	input_count DESC, normalised_value DESC;""")
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
