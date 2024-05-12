-- MariaDB dump 10.19-11.3.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: apeture
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benchmarks`
--

LOCK TABLES `benchmarks` WRITE;
/*!40000 ALTER TABLE `benchmarks` DISABLE KEYS */;
INSERT INTO `benchmarks` VALUES
(1,'Typing speed','wpm'),
(2,'Reaction speed','ms'),
(3,'Aim speed','ms'),
(4,'Number memory','numbers'),
(5,'Word memory','letters'),
(6,'Simon sais','squares');
/*!40000 ALTER TABLE `benchmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `user_id_1` int(11) NOT NULL,
  `user_id_2` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_friends_user_1_idx` (`user_id_1`),
  KEY `fk_friends_user_2_idx` (`user_id_2`),
  CONSTRAINT `fk_friends_user_1` FOREIGN KEY (`user_id_1`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_friends_user_2` FOREIGN KEY (`user_id_2`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES
(3,2,1,301,'2024-03-25 08:46:03'),
(4,2,1,405,'2024-03-25 08:46:03'),
(5,2,1,328,'2024-03-25 08:46:03'),
(6,2,1,198,'2024-03-25 08:46:03'),
(7,6,1,7,'2024-03-25 09:17:52'),
(8,6,1,6,'2024-03-25 09:17:52'),
(9,6,1,8,'2024-03-25 09:17:52'),
(10,6,1,7,'2024-03-25 09:17:52'),
(13,3,1,1923,'2024-04-02 18:42:34'),
(14,3,1,1893,'2024-04-02 18:42:56'),
(15,3,1,1763,'2024-04-02 18:44:09'),
(16,3,1,2193,'2024-04-02 18:44:23'),
(17,3,1,1983,'2024-04-02 18:44:41'),
(18,3,1,1813,'2024-04-02 18:44:55'),
(19,3,1,1913,'2024-04-02 18:45:12'),
(20,3,1,2296,'2024-04-02 18:45:30'),
(21,3,1,1936,'2024-04-02 18:56:01'),
(22,3,1,2636,'2024-04-02 18:56:16'),
(23,3,1,2343,'2024-04-02 18:56:34'),
(24,3,1,1720,'2024-04-02 19:14:47'),
(25,3,1,1770,'2024-04-02 19:15:10'),
(26,3,3,2073,'2024-04-02 19:24:25'),
(27,3,3,3290,'2024-04-02 19:24:45');
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES
(1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNCAxOTo0ODozOCJ9.0WHpJjIp0SSS5CrZyMsyoIEH-WuRaA9C57cUBAAJJkA',1,'2024-03-24 18:48:38'),
(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNCAxOTo0ODo1NiJ9.QiPXoJ7XpZfDofIGBThMkwN6ld8byPKQuoyAKXEqFUM',1,'2024-03-24 18:48:56'),
(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNCAyMDoxMzowMyJ9.yNJk5_aFVToOKnFYJScE8HAy6UQe4FCgdGzLH7Gty70',1,'2024-03-24 19:13:03'),
(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNCAyMDoyNjoyMCJ9.yg6ZtsQtaK3l9aKBH6Vb7WITvv66mWvfMXldxBMD5MU',1,'2024-03-24 19:26:20'),
(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNCAyMDoyNjo0NyJ9.Q3am9kGIPnRP6g-80Tm_gXaHB9jh05vZxlYj5qhFjFE',1,'2024-03-24 19:26:47'),
(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNCAyMDoyNzoxMyJ9.MfArv75y-Hi1iC0D52TgbcgrrX33XI6AL6CbZRvn82M',1,'2024-03-28 19:27:13'),
(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNCAyMDozMTo0NCJ9.VvFaQQO7adJZ8yQgUc5FvDgRgI0eSwUu8dlxfbuDxmU',1,'2024-03-24 19:31:44'),
(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAwODo0NDo0NCJ9.h1JdkUA1EyXuPnBlIJ8235cwbdy6JYtb1rNpMxNVXto',1,'2024-03-25 07:44:44'),
(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAwODo0NjowNyJ9.TTVqAIkGvEZcQ5HnLxUH6tY1LyGuvFqv8oe0fESUvVA',1,'2024-03-25 07:46:07'),
(10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAwOTowNDoxNSJ9.yKvchdEs2vJl5Efr5BZ1YUXKBmpJcljDbKhIUvLmSIQ',1,'2024-03-25 08:04:15'),
(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAxMDowODowNCJ9.WO6ZfrawhViyrHAxF_b4Wzyzt3pKbIxQxYA78u8W0jQ',1,'2024-03-25 09:08:04'),
(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAxMDowODoyNyJ9.L5CqLT7LquLkzc2BSEjqTPlrasLWkE3zIoh5gHhF3aw',1,'2024-03-25 09:08:27'),
(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAxMDozMDowNCJ9.4rdHpstJT2aucwi2McccEnZqYo_VTVHuce7ZJtndv00',1,'2024-03-25 09:30:04'),
(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAxMjo0ODozOCJ9.fFVec1AYuP4jYQEp52yn2EsW-0Twn0uMluKv4QWgR40',1,'2024-03-25 11:48:38'),
(15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAyMDo0MDoyNiJ9._XL5pNxmuhq3uDBm0Cik7GT3sWGS0CdDIa5d_ctR7Mk',1,'2024-03-25 19:40:26'),
(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAyMDo0Mzo1NyJ9.aXDumlN73aJagja5bOtsqGzUxEjZEFsbEIKOukZValw',1,'2024-03-25 19:43:57'),
(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wMy0yNSAyMDo0NjoyNCJ9.RIkdIOXdC0_eRc-ccV3R9Q4FxCcoiHD1oepFAJVcvB8',1,'2024-03-25 19:46:24'),
(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAwODo0MTo0OSJ9.c4HIpkLrN5uDZjUlWudqfZ_KbZaVMZ0qI0SM_L-1D08',1,'2024-04-02 06:41:49'),
(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAwOTowNTowMyJ9._bkbwOveK_4SdCyCrRDX_mWghc8WzoemMHb09N2dH9g',1,'2024-04-02 07:05:03'),
(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAwOTozNDo0OCJ9.dj_YFp5m1dPVmilZjlMfGZqGaOPcIseL5j5Ba8FGu3E',1,'2024-04-02 07:34:48'),
(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAwOTozODoyNCJ9.56w0R5RkIEKvNCRBJLurkmFahDh2mzK5EIzGEMZTKzI',1,'2024-04-02 07:38:24'),
(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAwOTo0MjoyNCJ9.zsks4mZFsEHdI98sihOfkXU5p7U1ZHQZAks4qiOtkHU',1,'2024-04-02 07:42:24'),
(23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAwOTo0NTowMSJ9.i3gCFY5NYQ5XmNJNnk3IzUC1GkewQVtiYpeIZcrQs2Q',1,'2024-04-02 07:45:01'),
(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAwOTo0NjoxOSJ9.4CpEYAzpNbVCttttwPp4Xxy_OqrGTU-2QYs6UCtlJ2c',1,'2024-04-02 07:46:19'),
(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAwOTo0OTozOSJ9.gTQbwGnNPEmcy9PZcsD3M0rw48EzSOhPvjpiBpnNDqk',1,'2024-04-02 07:49:39'),
(26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAxMToyNzoyNCJ9.K_5GLCTR0d4tKRdNMzISvhOFyebh1pVm_mGAfeHRu_I',1,'2024-04-02 09:27:24'),
(27,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAxMTo0ODozMyJ9.WkW5ZI96EkG1w2T47LxqL7M-x4rrGPL5dab5_mBj8tA',1,'2024-04-02 09:48:33'),
(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAxNjoxMzowMiJ9.M6IYjo_UoQJJG2p8gF-gQ3ANsb4mWqH39D770PSrd6c',1,'2024-04-02 14:13:02'),
(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAyMToyNDowNyJ9.e-_Vy6sEmsqjTRqaIY7umkxyzD0EgXBZ2Q_ZM9zeGT8',3,'2024-04-02 19:24:07'),
(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAyMTo1MjowNSJ9.n3dFU8GmFdZA_LvKDzx8K6LwzJnl6gufZEP9BxJ5EJA',1,'2024-04-02 19:52:05'),
(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZXN0YW1wIjoiMjAyNC0wNC0wMiAyMTo1NzowNSJ9.oB_0G7Ivk8UdYZxfgUgfwOwI3fQGGtJEokzLvhpb9cw',1,'2024-04-02 19:57:05');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'drill','a@a.dk','test123','2024-03-24 18:07:29'),
(2,'isa','i@i.dk','test123','2024-04-02 19:23:45'),
(3,'thomads','t@t.dk','test123','2024-04-02 19:23:54');
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

-- Dump completed on 2024-04-02 22:12:36
