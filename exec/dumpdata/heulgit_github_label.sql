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
-- Table structure for table `github_label`
--

DROP TABLE IF EXISTS `github_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `github_label` (
  `github_label_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eureka_github_info_id` int NOT NULL,
  PRIMARY KEY (`github_label_id`),
  UNIQUE KEY `idgithub_label_id_UNIQUE` (`github_label_id`),
  KEY `fk_github_label_eureka_github_info_id_idx` (`eureka_github_info_id`),
  CONSTRAINT `fk_github_label_eureka_github_info_id` FOREIGN KEY (`eureka_github_info_id`) REFERENCES `eureka_github_info` (`eureka_github_info_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `github_label`
--

LOCK TABLES `github_label` WRITE;
/*!40000 ALTER TABLE `github_label` DISABLE KEYS */;
INSERT INTO `github_label` VALUES (1,'BOJ','baekjoon',1),(2,'Programmers','programmers',1),(3,'Javascript','javascript',1),(4,'? JavaNextStep','java web programming next step',2),(5,'Design Pattern','디자인 패턴, 아키텍처 이슈',3),(6,'Architecture','소프트웨어 아키텍처(구성 방식) 이슈',3),(10,'BOJ','baekjoon',7),(11,'Java','java',7),(12,'Programmers','programmers',7),(13,'BOJ','baekjoon',8),(14,'Programmers','programmers',8),(15,'Javascript','javascript',8);
/*!40000 ALTER TABLE `github_label` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:00
