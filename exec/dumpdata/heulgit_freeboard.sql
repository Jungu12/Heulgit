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
-- Table structure for table `freeboard`
--

DROP TABLE IF EXISTS `freeboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freeboard` (
  `freeboard_id` int NOT NULL AUTO_INCREMENT,
  `github_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_date` timestamp NOT NULL,
  `view` int NOT NULL,
  PRIMARY KEY (`freeboard_id`),
  UNIQUE KEY `freeboard_id_UNIQUE` (`freeboard_id`),
  KEY `fk_freeboard_user1_idx` (`github_id`),
  CONSTRAINT `fk_freeboard_github_id` FOREIGN KEY (`github_id`) REFERENCES `user` (`github_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freeboard`
--

LOCK TABLES `freeboard` WRITE;
/*!40000 ALTER TABLE `freeboard` DISABLE KEYS */;
INSERT INTO `freeboard` VALUES (1,'Jungu12','자고 싶다.','쿨쿨쿨쿨','2023-08-18 03:01:21',2),(2,'ksg2388','나는야 야행성 부엉이','부엉부엉~ ???','2023-08-18 03:01:48',3),(3,'Jungu12','저 내일 부산 놀러가요 ~','부럽죠 ?','2023-08-18 03:01:53',6),(4,'Jungu12','알고 풀 때는 JAVA가 좋나요 Python이 좋나요 ','네 ?','2023-08-18 03:02:49',12),(5,'ksg2388','안녕 안녕 안녕하세요~',' 흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃  흘깃 흘깃 흘깃 흘깃','2023-08-18 03:04:32',5),(6,'PpoSil','여기 고양이 천국이라 좋아','로그인부터 로딩, 오류창까지 여기저기 고양이라니 행복사\n먀-하?','2023-08-18 03:07:12',1),(7,'PpoSil','집 언제 갈까 말까 고민되네','오랜만에 집 가려하는데 한 숨 자고 갈까 바로 갈까? ','2023-08-18 03:08:42',9),(8,'Jungu12','안녕하세요','오늘도 코딩 열심히 해서 뿌듯해용\n','2023-08-18 03:14:20',3),(9,'ksg2388','현 상황','ㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㅇㅁㄹㅁㅇㅁㅇㅁㅇㅁㅇㅇㅇㅇㅇㄹㅇㅇㅇㅁㅇㅁㅁㅇㅇㅁ','2023-08-18 04:00:18',6),(10,'Jungu12','하….','가고싶다','2023-08-18 04:00:23',2),(11,'Jungu12','우리집','우리집임 ㅋㅋ','2023-08-18 04:07:05',4),(12,'PpoSil','살아서 뵙겠습니다...','ㅇㄸㅂㅈ\n난 그냥 안 자려고 ㅋㅋㅋㅋㅋㅋㅋ','2023-08-18 05:22:11',1);
/*!40000 ALTER TABLE `freeboard` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:14:59
