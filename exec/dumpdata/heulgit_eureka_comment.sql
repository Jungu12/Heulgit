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
-- Table structure for table `eureka_comment`
--

DROP TABLE IF EXISTS `eureka_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eureka_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `eureka_id` int NOT NULL,
  `github_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_date` timestamp NOT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  KEY `fk_heulgit_comment_heulgit1_idx` (`eureka_id`),
  KEY `fk_heulgit_comment_user1_idx` (`github_id`),
  KEY `fk_heulgit_comment_heulgit_comment1_idx` (`parent_id`),
  CONSTRAINT `fk_eureka_comment_eureka1` FOREIGN KEY (`eureka_id`) REFERENCES `eureka` (`eureka_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_eureka_comment_eureka_comment1` FOREIGN KEY (`parent_id`) REFERENCES `eureka_comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_eureka_comment_user1` FOREIGN KEY (`github_id`) REFERENCES `user` (`github_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eureka_comment`
--

LOCK TABLES `eureka_comment` WRITE;
/*!40000 ALTER TABLE `eureka_comment` DISABLE KEYS */;
INSERT INTO `eureka_comment` VALUES (1,5,'Jungu12','안녕하세요','2023-08-18 04:08:46',NULL),(2,3,'LEEILHO','정말 좋은 정보네요!!','2023-08-18 04:09:04',NULL),(3,3,'PpoSil','좋은 정보 감사합니다!','2023-08-18 04:14:18',NULL),(4,4,'PpoSil','나중에 함 봐볼게 ㅋㅋ 좋아요 눌러놨지롱','2023-08-18 04:14:41',NULL),(5,3,'se0987','정보 감사합니다~','2023-08-18 04:34:42',NULL),(6,7,'PpoSil','wa','2023-08-18 05:20:08',NULL);
/*!40000 ALTER TABLE `eureka_comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:31
