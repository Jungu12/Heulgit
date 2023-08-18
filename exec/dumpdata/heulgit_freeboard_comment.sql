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
-- Table structure for table `freeboard_comment`
--

DROP TABLE IF EXISTS `freeboard_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freeboard_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `freeboard_id` int NOT NULL,
  `github_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_date` timestamp NOT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  KEY `fk_freeboard_comment_freeboard1_idx` (`freeboard_id`),
  KEY `fk_freeboard_comment_user1_idx` (`github_id`),
  KEY `fk_freeboard_comment_freeboard_comment1_idx` (`parent_id`),
  CONSTRAINT `fk_freeboard_comment_freeboard1` FOREIGN KEY (`freeboard_id`) REFERENCES `freeboard` (`freeboard_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_freeboard_comment_freeboard_comment1` FOREIGN KEY (`parent_id`) REFERENCES `freeboard_comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_freeboard_comment_user1` FOREIGN KEY (`github_id`) REFERENCES `user` (`github_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freeboard_comment`
--

LOCK TABLES `freeboard_comment` WRITE;
/*!40000 ALTER TABLE `freeboard_comment` DISABLE KEYS */;
INSERT INTO `freeboard_comment` VALUES (1,4,'Jungu12','@ksg2388 뭐가 좋아요 ?','2023-08-18 03:03:37',NULL),(3,4,'PpoSil','파이썬 하세요.','2023-08-18 03:07:23',NULL),(4,3,'PpoSil','나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? ','2023-08-18 03:07:49',NULL),(5,3,'Jungu12','누구시져 ?','2023-08-18 03:08:34',NULL),(7,7,'Jungu12','한숨 자고 가세요 바로가면 차 막혀요','2023-08-18 03:13:14',NULL),(8,9,'Jungu12','ㅋㅋ','2023-08-18 04:07:51',NULL),(9,9,'Jungu12','쏘리~','2023-08-18 04:07:55',NULL),(10,7,'PpoSil','집에 보내줘~~~~','2023-08-18 04:39:26',NULL),(11,10,'PpoSil','롤 ㄱㄱ','2023-08-18 05:19:57',NULL);
/*!40000 ALTER TABLE `freeboard_comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:35
