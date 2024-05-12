-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: apeture
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-0+deb12u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `benchmarks`
--

DROP TABLE IF EXISTS `benchmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `benchmarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `benchmark_name` varchar(128) NOT NULL,
  `unit` varchar(45) NOT NULL DEFAULT 'ms',
  `data_range` int(11) DEFAULT 100,
  `data_cutoff` int(11) DEFAULT 1000,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benchmarks`
--

LOCK TABLES `benchmarks` WRITE;
/*!40000 ALTER TABLE `benchmarks` DISABLE KEYS */;
INSERT INTO `benchmarks` VALUES
(1,'Typing speed','wpm',100,1000),
(2,'Reaction speed','ms',10,800),
(3,'Aim speed','ms',100,5000),
(4,'Number memory','numbers',100,1000),
(5,'Word memory','letters',100,1000),
(6,'Simon sais','squares',100,1000);
/*!40000 ALTER TABLE `benchmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_1` int(11) NOT NULL,
  `user_id_2` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_friends_user_1_idx` (`user_id_1`),
  KEY `fk_friends_user_2_idx` (`user_id_2`),
  CONSTRAINT `fk_friends_user_1` FOREIGN KEY (`user_id_1`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_friends_user_2` FOREIGN KEY (`user_id_2`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `benchmark_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `value` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_scores_1_idx` (`benchmark_id`),
  KEY `fk_scores_users_idx` (`user_id`),
  CONSTRAINT `fk_scores_benchmarks` FOREIGN KEY (`benchmark_id`) REFERENCES `benchmarks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_scores_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=870 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES
(38,2,12,280,'2024-05-02 09:31:52'),
(39,2,13,350,'2024-05-02 09:32:17'),
(40,3,13,2469,'2024-05-02 09:33:29'),
(41,2,15,700,'2024-05-02 09:40:52'),
(42,3,15,3000,'2024-05-02 09:41:09'),
(43,2,13,321,'2024-05-02 09:42:44'),
(44,2,16,578,'2024-05-02 09:43:12'),
(45,2,16,391,'2024-05-02 09:43:22'),
(46,3,17,1776,'2024-05-02 09:44:34'),
(47,2,16,10184,'2024-05-02 09:44:54'),
(49,3,12,3214,'2024-05-02 09:45:44'),
(50,3,16,1978,'2024-05-02 09:45:48'),
(51,2,20,416,'2024-05-02 09:46:03'),
(52,3,12,3870,'2024-05-02 09:46:04'),
(53,2,19,450,'2024-05-02 09:46:05'),
(54,2,20,433,'2024-05-02 09:46:13'),
(155,2,19,16,'2024-05-02 09:47:39'),
(156,2,19,17,'2024-05-02 09:47:54'),
(257,2,23,15,'2024-05-02 09:51:28'),
(258,2,23,14,'2024-05-02 09:51:43'),
(259,3,27,4614,'2024-05-02 09:51:44'),
(260,3,27,4427,'2024-05-02 09:52:07'),
(261,3,28,4407,'2024-05-02 09:52:31'),
(262,3,28,3628,'2024-05-02 09:52:50'),
(263,3,23,3540,'2024-05-02 09:52:57'),
(364,2,28,464,'2024-05-02 09:53:32'),
(365,2,28,349,'2024-05-02 09:53:43'),
(466,2,12,15485,'2024-05-02 09:53:56'),
(467,2,27,921,'2024-05-02 09:53:58'),
(468,3,29,2514,'2024-05-02 09:54:03'),
(469,2,27,333,'2024-05-02 09:54:23'),
(470,2,27,328,'2024-05-02 09:54:33'),
(839,3,29,2419,'2024-05-02 09:55:52'),
(840,3,29,3443,'2024-05-02 09:56:10'),
(841,3,38,2492,'2024-05-02 09:59:49'),
(842,3,23,1693,'2024-05-02 10:00:58'),
(843,2,38,259,'2024-05-02 10:01:06'),
(844,3,23,1951,'2024-05-02 10:01:08'),
(845,3,23,3619,'2024-05-02 10:02:22'),
(846,2,39,311,'2024-05-02 10:02:37'),
(847,3,39,2201,'2024-05-02 10:03:47'),
(848,3,39,2456,'2024-05-02 10:04:02'),
(849,2,18,315,'2024-05-02 10:04:11'),
(850,3,52,2723,'2024-05-02 10:05:14'),
(851,3,52,3327,'2024-05-02 10:05:32'),
(852,2,39,223,'2024-05-02 10:05:44'),
(853,3,52,2881,'2024-05-02 10:05:49'),
(854,2,39,247,'2024-05-02 10:05:55'),
(855,2,56,489,'2024-05-02 10:06:30'),
(856,3,52,2734,'2024-05-02 10:06:46'),
(857,2,56,353,'2024-05-02 10:06:51'),
(858,3,52,3152,'2024-05-02 10:07:03'),
(859,2,53,886,'2024-05-02 10:07:04'),
(860,3,38,2564,'2024-05-02 10:07:11'),
(861,2,53,763,'2024-05-02 10:07:16'),
(862,3,52,3000,'2024-05-02 10:07:19'),
(863,3,38,3231,'2024-05-02 10:07:29'),
(864,2,52,330,'2024-05-02 10:07:41'),
(865,2,56,320,'2024-05-02 10:08:02'),
(866,3,52,2502,'2024-05-02 10:08:35'),
(867,3,56,2900,'2024-05-02 10:08:41'),
(868,2,75,355,'2024-05-02 10:49:45'),
(869,3,75,5026,'2024-05-02 10:51:08');
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jwt` varchar(528) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `jwt_UNIQUE` (`jwt`),
  KEY `fk_tokens_user_idx` (`user_id`),
  CONSTRAINT `fk_tokens_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES
(61,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6MzE6MDIifQ.v4sRwsJ3lzTKGvNZIlLr9Yo4H9KB8xbQA8Z_yOTEixM',12,'2024-05-02 09:31:02'),
(62,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6MzE6MTEifQ.FdEjsscru9TLTWMLQxZEd8QGVVYyJe4nV6B1CGIHSng',13,'2024-05-02 09:31:11'),
(63,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6MzE6MjYifQ.cfdxSEqV2oZIIq-X1Q11SELgC_FbglzbHmHRijcHhik',13,'2024-05-02 09:31:26'),
(64,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NDA6MTYifQ.CzFXENzqRx2bO8uGl7WB-tL_rt6mvcd30G0JM7qplQk',13,'2024-05-02 09:40:16'),
(65,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NDA6MjUifQ.l8r9SDxj3FRzLA8d_6NCK2K_N0EvYZgi5STD5vaH0FQ',15,'2024-05-02 09:40:25'),
(66,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NDI6MTIifQ.-NEUXdxkG7CDvOJCs11Fkj6Il9d12xBaO6clr9IdFPQ',13,'2024-05-02 09:42:12'),
(67,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NDI6NDAifQ.jIhpKrkgyeh4r3aVTFBPINK-OZTg8A-_zvrHYlA1w3k',16,'2024-05-02 09:42:40'),
(68,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NDM6NDAifQ._2Vp9Cwy8Sc7GrjxD394n1ZQevh7DOG04aVBvNcDjak',17,'2024-05-02 09:43:40'),
(69,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NDQ6MTMifQ.J8ISwYFIhwYllocHQ8ZPfLwuzFLDcJH0oyP3PZJ7kAw',18,'2024-05-02 09:44:13'),
(70,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NDU6MDYifQ.yMYjKQzah--VbN2zO94hqk2wdP7gBHjPOPJ8IS624VA',19,'2024-05-02 09:45:06'),
(71,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NDU6MTYifQ.klVIkjg8KfWBJ4LiSA46KGwvup0VY8C3lctDtpSivQ4',20,'2024-05-02 09:45:16'),
(72,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTA6MTIifQ.RIJc_ZDlpmH1QpGjruOzxN3kmNmq83FwmrREAqHpZO8',23,'2024-05-02 09:50:12'),
(73,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTE6MDAifQ.FvSK82U41HDYrKd1Qkr0iYvOqGN5x8yr-M_zr5kk0-E',27,'2024-05-02 09:51:00'),
(74,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTE6MzUifQ.hCTFxfX8rXajjy4y0vWodSnonG5qrGk2jr3a6uX1pb8',28,'2024-05-02 09:51:35'),
(75,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTM6MzcifQ.vd9xbv8wWtZICm6Fs1OKbpzqKBDeD4CTk6d5O_3Pu9w',29,'2024-05-02 09:53:37'),
(76,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTQ6MDAifQ.__oH-iOJ6dViZiUxc8CCMXMLEaJGvqsuwy95N7Xdex0',18,'2024-05-02 09:54:00'),
(77,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTU6MDgifQ.M1HiQ5hP0leUseVGDePebqT9OqB31lF_M8fB-7vpFpU',29,'2024-05-02 09:55:08'),
(78,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTU6MzAifQ.TOmSKKXnjj9AeZG-KOQCAC0wkwF-9JeX1fKJ8XHOfss',37,'2024-05-02 09:55:30'),
(79,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTU6MzcifQ.dWNnHp1Ly0H0M6zKNwnzoTxL4D8NiP82I4_epgG2xGo',23,'2024-05-02 09:55:37'),
(80,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTU6NDQifQ.xvWfnEYm3XLs2jEy6k8u6TXcawMjpVWHyiROrofUfRo',18,'2024-05-02 09:55:44'),
(81,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTY6MjgifQ.cet6xgqaWJd2UXwdnTMwOlOPKFO0qmAmtxVK4T09dRM',29,'2024-05-02 09:56:28'),
(82,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTE6NTg6NDAifQ.2MG9H3LFJr1rYeQ0FI8QYh5NDbTEIfnNEhGojqCsP28',38,'2024-05-02 09:58:40'),
(83,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDA6MjcifQ.CVnbcRcc2eR-CdeT1LWbK5DR_d6lqj8ykgFqUulk4u4',23,'2024-05-02 10:00:27'),
(84,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDE6MzQifQ.st3rLEKADzktK67764_BC5oAVzi9uR9Okxc8e0qURLI',39,'2024-05-02 10:01:34'),
(85,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDE6MzgifQ.C3npZRH8dT02HKM26dizrZZ0G_0exBiMziOfUPZudj4',18,'2024-05-02 10:01:38'),
(86,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDI6MTUifQ.twDVWW2rINKi_GVs9qfU1dbbeHoUfOEJDIhD1NTxr7w',39,'2024-05-02 10:02:15'),
(87,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDM6MzUifQ.ghympwkfedHED4te4xUwqxx7KSQ9iIsbUci0xg5sL3g',18,'2024-05-02 10:03:35'),
(88,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDQ6MzkifQ.UP2deDEzjNipBlAcLUEv8gnMb8_B5zO7Qt7T2EO4fNI',52,'2024-05-02 10:04:39'),
(89,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDU6MDQifQ.61qMlYmW0K-oIFTK1mLCziRYpMM2Xt2d7K5n5k8I-nI',53,'2024-05-02 10:05:04'),
(90,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTYsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDU6NTYifQ.jWk3LnJVknP4paIr2A9snLhtkGf8scc8MXoKdTpqDcM',56,'2024-05-02 10:05:56'),
(91,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDY6MjcifQ.7YAgPGLx-7GcOc6lypwOL3Eia3MPjBSuy-NG6b5QDgU',52,'2024-05-02 10:06:27'),
(92,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTYsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MDk6NTkifQ._H_W2EtzB_uS8YkTK8s4GNpTW1vQw_VUXmwpvwfrj1s',56,'2024-05-02 10:09:59'),
(93,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzUsInRpbWVzdGFtcCI6IjIwMjQtMDUtMDIgMTI6MTk6MzEifQ.0bkmmuwDt_8wP31a0zWRUP0SZ8VaIlO_1gvwKcSKNyA',75,'2024-05-02 10:19:31');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `friend_code` uuid NOT NULL DEFAULT uuid(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `name_constraint` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(12,'isa','isa@mail.com','test123','2024-05-02 09:30:57','ae1d8e00-0866-11ef-9139-de3f9e5df4b2'),
(13,'magnustænder','magnusertilsmåbørn@gmail.com','kode','2024-05-02 09:30:57','ae2b3317-0866-11ef-9139-de3f9e5df4b2'),
(14,'påbørn','påbørn@gmail.com','dontlookatmypasswordyouweirdo','2024-05-02 09:35:38','555936e5-0867-11ef-9139-de3f9e5df4b2'),
(15,'påsmåbørn','mail@mail.mail','penis','2024-05-02 09:40:21','fe4b70a8-0867-11ef-9139-de3f9e5df4b2'),
(16,'AdvancedHEX','CUMMASTER69@gmail.dk','gameisgame','2024-05-02 09:42:33','4cc95198-0868-11ef-9139-de3f9e5df4b2'),
(17,'NIGMAN101','Nahfam@lols.com','123','2024-05-02 09:43:36','7266ad00-0868-11ef-9139-de3f9e5df4b2'),
(18,'dinmor','dinmor@dinmor.dinmor','dinmor','2024-05-02 09:44:05','83b75397-0868-11ef-9139-de3f9e5df4b2'),
(19,'aa','aa','\"\"**?)!?\"','2024-05-02 09:45:03','a609a632-0868-11ef-9139-de3f9e5df4b2'),
(20,'Nigga','Nigga@thehood.dk','LAMAO','2024-05-02 09:45:11','ab222acf-0868-11ef-9139-de3f9e5df4b2'),
(23,'fastasfuck','fucku','fucku','2024-05-02 09:50:09','5cc3527e-0869-11ef-9139-de3f9e5df4b2'),
(27,'dinmorjohn','john@gmail.com','1234','2024-05-02 09:50:56','7859db23-0869-11ef-9139-de3f9e5df4b2'),
(28,'klunkeklasker69','ahmedhansen72@gmail.com','911','2024-05-02 09:51:21','87373f8c-0869-11ef-9139-de3f9e5df4b2'),
(29,'Dyhrman','Victor.dyhrman@gmail.com','wp1rMw%K*','2024-05-02 09:53:30','d42576fe-0869-11ef-9139-de3f9e5df4b2'),
(37,'Magnus','herjeas','herjeas','2024-05-02 09:55:28','1a96ebaa-086a-11ef-9139-de3f9e5df4b2'),
(38,'Olle_Bolle','oskarffc@gmail.com','Password1234','2024-05-02 09:58:27','8564a4a8-086a-11ef-9139-de3f9e5df4b2'),
(39,'Really?','jlundgren07@gmail.com','gay','2024-05-02 10:01:30','f228a72d-086a-11ef-9139-de3f9e5df4b2'),
(52,'QuiZaX','magnusthorup04@gmail.com','Magnus2004','2024-05-02 10:04:28','5c6e0d0d-086b-11ef-9139-de3f9e5df4b2'),
(53,'dnawjd','dnja@njksa.com','123','2024-05-02 10:04:59','6efa5300-086b-11ef-9139-de3f9e5df4b2'),
(56,'DinMor69','DinMor@gmail.com','DinMor','2024-05-02 10:05:47','8bb974a8-086b-11ef-9139-de3f9e5df4b2'),
(75,'t','t','t','2024-05-02 10:19:20','70d11aa1-086d-11ef-a1cc-a87eeae79924');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-12 17:31:12
