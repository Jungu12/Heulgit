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
-- Table structure for table `eureka`
--

DROP TABLE IF EXISTS `eureka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eureka` (
  `eureka_id` int NOT NULL AUTO_INCREMENT,
  `github_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_date` timestamp NOT NULL,
  `view` int NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`eureka_id`),
  UNIQUE KEY `heulgit_id_UNIQUE` (`eureka_id`),
  KEY `fk_heulgit_user1_idx` (`github_id`),
  CONSTRAINT `fk_eureka_user1` FOREIGN KEY (`github_id`) REFERENCES `user` (`github_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eureka`
--

LOCK TABLES `eureka` WRITE;
/*!40000 ALTER TABLE `eureka` DISABLE KEYS */;
INSERT INTO `eureka` VALUES (1,'Jungu12','알고리즘 문제 추천합니다.','4번 문제는 꼭 풀어보고 저랑 효율성 비교해보세요 ~~','2023-08-18 02:01:28',6,'https://github.com/SeongukBaek/algoStudy/pull/116'),(2,'Jungu12','리팩토링과 테스트 코드 관련 이슈 공유','좋은 이슈가 있어서 공유합니다.','2023-08-18 02:03:39',12,'https://github.com/BookBBu/JavaWebProgrammingNextStep/pull/1'),(3,'ksg2388','품질 높은 코드에 대해 고민하시는분한테 추천드려요!','코드 품질에 대해 고민하시는 분이라면 한번 참고해보세요!!','2023-08-18 03:45:11',20,'https://github.com/yamoo9/likelion-react/issues/37'),(4,'ksg2388','이거 한번 보세요!','한번 봐방','2023-08-18 03:48:01',8,'https://github.com/reactjs/react.dev/issues/6230'),(5,'ksg2388','진짜 제발!!!!!!!!!!!!!!!!!!!!!!!!!','제발 제발 제발 제발 제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발 제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제발 제발 제발 제발  제','2023-08-18 03:51:41',15,'https://github.com/facebook/react/issues/14366'),(7,'Jungu12','이거 보세요','다 풀었답니다','2023-08-18 04:20:42',5,'https://github.com/SeongukBaek/algoStudy/pull/111'),(8,'ksg2388','알고리즘 어려워....','코드 리뷰 해주세요!','2023-08-18 04:42:42',1,'https://github.com/SeongukBaek/algoStudy/pull/116');
/*!40000 ALTER TABLE `eureka` ENABLE KEYS */;
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
