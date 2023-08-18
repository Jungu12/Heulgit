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
-- Table structure for table `eureka_image`
--

DROP TABLE IF EXISTS `eureka_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eureka_image` (
  `eureka_image_id` int NOT NULL AUTO_INCREMENT,
  `file_uri` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eureka_id` int NOT NULL,
  PRIMARY KEY (`eureka_image_id`),
  UNIQUE KEY `eureka_image_id_UNIQUE` (`eureka_image_id`),
  KEY `fk_heulgit_image_heulgit1_idx` (`eureka_id`),
  CONSTRAINT `fk_eureka_image_heulgit1` FOREIGN KEY (`eureka_id`) REFERENCES `eureka` (`eureka_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eureka_image`
--

LOCK TABLES `eureka_image` WRITE;
/*!40000 ALTER TABLE `eureka_image` DISABLE KEYS */;
INSERT INTO `eureka_image` VALUES (1,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/eureka/Jungu12_4번 문제_1692291688073_.PNG',1),(2,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/eureka/ksg2388_어그로_1692298081474_.png',4),(3,'https://s3.ap-northeast-2.amazonaws.com/heulgitbucket/eureka/ksg2388_둠칫_1692298301039_.gif',5);
/*!40000 ALTER TABLE `eureka_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:03
