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
-- Table structure for table `freeboard_image`
--

DROP TABLE IF EXISTS `freeboard_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freeboard_image` (
  `freeboard_image_id` int NOT NULL AUTO_INCREMENT,
  `file_uri` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `freeboard_id` int NOT NULL,
  PRIMARY KEY (`freeboard_image_id`),
  UNIQUE KEY `freeboard_image_id_UNIQUE` (`freeboard_image_id`),
  KEY `fk_freeboard_image_freeboard1_idx` (`freeboard_id`),
  CONSTRAINT `fk_freeboard_image_freeboard1` FOREIGN KEY (`freeboard_id`) REFERENCES `freeboard` (`freeboard_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freeboard_image`
--

LOCK TABLES `freeboard_image` WRITE;
/*!40000 ALTER TABLE `freeboard_image` DISABLE KEYS */;
INSERT INTO `freeboard_image` VALUES (1,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/freeboard/ksg2388_41876429-A2E8-4C95-9B53-1DA5E6874EA9_1692295307618_.webp',2),(2,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/freeboard/ksg2388_ce3a68f74cb7ce6db8e16243bf03c42f_1692295471556_.jfif',5),(3,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/freeboard/ksg2388_D2DA6DC5-124C-4156-A6AF-BE64D6EF4A0E_1692298817966_.jpeg',9),(4,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/freeboard/Jungu12_27415290-82C4-48FD-8B78-C20AF8B3EB98_1692298823326_.jpeg',10),(5,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/freeboard/Jungu12_image_1692299224672_.jpg',11),(6,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/freeboard/PpoSil_20230818_052116_1692303731042_.jpg',12);
/*!40000 ALTER TABLE `freeboard_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:32
