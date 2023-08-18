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
-- Table structure for table `commit_analyze`
--

DROP TABLE IF EXISTS `commit_analyze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commit_analyze` (
  `github_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`github_id`,`type`),
  CONSTRAINT `fk_commit_analyze_user1` FOREIGN KEY (`github_id`) REFERENCES `user` (`github_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commit_analyze`
--

LOCK TABLES `commit_analyze` WRITE;
/*!40000 ALTER TABLE `commit_analyze` DISABLE KEYS */;
INSERT INTO `commit_analyze` VALUES ('Jungu12','algo','알고리즘 풀이'),('Jungu12','feat','새로운 기능 개발'),('Jungu12','fix','버그 수정'),('Jungu12','refactor','코드 리팩토링'),('Jungu12','study','공부 및 내용 정리'),('Jungu12','style','코드 스타일링\n'),('ksg2388','algo','알고리즘 풀이'),('ksg2388','chore','빌드 과정 또는 보조 기능 수정'),('ksg2388','feat','새로운 기능 개발'),('ksg2388','fix','버그 수정'),('ksg2388','refactor','코드 리팩토링'),('ksg2388','study','공부 및 내용 정리'),('ksg2388','style','코드 스타일링'),('LEEILHO','chore','빌드 과정 또는 보조 기능 수정'),('LEEILHO','feat','새로운 기능 개발'),('LEEILHO','fix','버그 수정'),('LEEILHO','refactor','코드 리팩토링'),('LEEILHO','study','공부 및 내용 정리'),('LEEILHO','style','코드 스타일링'),('PpoSil','algo','알고리즘 풀이'),('PpoSil','chore','빌드 과정 또는 보조 기능 수정'),('PpoSil','feat','새로운 기능 개발'),('PpoSil','fix','버그 수정'),('PpoSil','refactor','코드 리팩토링'),('PpoSil','study','공부 및 내용 정리'),('PpoSil','style','코드 스타일링'),('se0987','algo','알고리즘 풀이'),('se0987','chore','빌드 과정 또는 보조 기능 수정'),('se0987','docs','문서 추가 및 수정'),('se0987','feat','새로운 기능 개발'),('se0987','fix','버그 수정'),('se0987','refactor','코드 리팩토링'),('se0987','study','공부 및 내용 정리'),('se0987','style','코드 스타일링');
/*!40000 ALTER TABLE `commit_analyze` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:33
