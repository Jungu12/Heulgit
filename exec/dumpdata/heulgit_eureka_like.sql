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
-- Table structure for table `eureka_like`
--

DROP TABLE IF EXISTS `eureka_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eureka_like` (
  `eureka_id` int NOT NULL,
  `github_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`eureka_id`,`github_id`),
  KEY `fk_heulgit_has_user_user1_idx` (`github_id`),
  KEY `fk_heulgit_has_user_heulgit1_idx` (`eureka_id`),
  CONSTRAINT `fk_eureka_has_user_eureka1` FOREIGN KEY (`eureka_id`) REFERENCES `eureka` (`eureka_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_eureka_has_user_user1` FOREIGN KEY (`github_id`) REFERENCES `user` (`github_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eureka_like`
--

LOCK TABLES `eureka_like` WRITE;
/*!40000 ALTER TABLE `eureka_like` DISABLE KEYS */;
INSERT INTO `eureka_like` VALUES (1,'ksg2388','2023-08-17 18:13:26'),(1,'se0987','2023-08-17 18:45:25'),(2,'se0987','2023-08-17 18:45:36'),(3,'LEEILHO','2023-08-17 19:08:46'),(3,'PpoSil','2023-08-17 19:13:41'),(3,'se0987','2023-08-17 18:45:30'),(4,'PpoSil','2023-08-17 19:14:31'),(5,'ksg2388','2023-08-17 19:24:46'),(5,'se0987','2023-08-17 19:34:04'),(7,'ksg2388','2023-08-17 19:24:45');
/*!40000 ALTER TABLE `eureka_like` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:34
