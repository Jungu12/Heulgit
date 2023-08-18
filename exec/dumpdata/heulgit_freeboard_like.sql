CREATE DATABASE  IF NOT EXISTS `heulgit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `heulgit`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: i9d211.p.ssafy.io    Database: heulgit
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `freeboard_like`
--

DROP TABLE IF EXISTS `freeboard_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freeboard_like` (
  `github_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `freeboard_id` int NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`github_id`,`freeboard_id`),
  KEY `fk_user_has_freeboard_freeboard1_idx` (`freeboard_id`),
  KEY `fk_user_has_freeboard_user1_idx` (`github_id`),
  CONSTRAINT `fk_user_has_freeboard_freeboard1` FOREIGN KEY (`freeboard_id`) REFERENCES `freeboard` (`freeboard_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_freeboard_user1` FOREIGN KEY (`github_id`) REFERENCES `user` (`github_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freeboard_like`
--

LOCK TABLES `freeboard_like` WRITE;
/*!40000 ALTER TABLE `freeboard_like` DISABLE KEYS */;
INSERT INTO `freeboard_like` VALUES ('Jungu12',1,'2023-08-17 18:03:16'),('Jungu12',2,'2023-08-17 18:08:53'),('Jungu12',3,'2023-08-17 18:03:13'),('Jungu12',4,'2023-08-17 18:03:12'),('Jungu12',9,'2023-08-17 19:07:25'),('ksg2388',2,'2023-08-17 18:38:42'),('LEEILHO',10,'2023-08-17 19:06:08'),('PpoSil',11,'2023-08-17 20:19:50'),('se0987',6,'2023-08-17 18:46:07');
/*!40000 ALTER TABLE `freeboard_like` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:02
