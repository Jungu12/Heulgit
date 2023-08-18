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
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `receiver_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('LIKE','FOLLOW','MENTION','COMMENT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `related_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` timestamp NOT NULL,
  `has_read` tinyint NOT NULL,
  `content` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  UNIQUE KEY `notification_id_UNIQUE` (`notification_id`),
  KEY `fk_notification_user1_idx` (`receiver_id`),
  KEY `fk_notification_user2_idx` (`sender_id`),
  CONSTRAINT `fk_notification_user1` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`github_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_notification_user2` FOREIGN KEY (`sender_id`) REFERENCES `user` (`github_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'ksg2388','Jungu12','FOLLOW',NULL,'2023-08-18 02:05:29',1,NULL),(2,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:00:35',1,NULL),(3,'Jungu12','LEEILHO','FOLLOW',NULL,'2023-08-18 03:02:21',1,NULL),(4,'ksg2388','LEEILHO','FOLLOW',NULL,'2023-08-18 03:02:33',1,NULL),(5,'ksg2388','Jungu12','MENTION','/freeboard/posts/4','2023-08-18 03:03:37',1,'@ksg2388 뭐가 좋아요 ?'),(6,'LEEILHO','Jungu12','FOLLOW',NULL,'2023-08-18 03:05:51',1,NULL),(7,'PpoSil','Jungu12','FOLLOW',NULL,'2023-08-18 03:06:17',1,NULL),(8,'Jungu12','LEEILHO','FOLLOW',NULL,'2023-08-18 03:07:09',1,NULL),(9,'LEEILHO','ksg2388','FOLLOW',NULL,'2023-08-18 03:07:12',1,NULL),(10,'LEEILHO','ksg2388','FOLLOW',NULL,'2023-08-18 03:07:15',1,NULL),(11,'LEEILHO','ksg2388','FOLLOW',NULL,'2023-08-18 03:07:16',1,NULL),(12,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:07:18',1,NULL),(13,'LEEILHO','ksg2388','FOLLOW',NULL,'2023-08-18 03:07:19',1,NULL),(14,'Jungu12','PpoSil','COMMENT','/freeboard/posts/4','2023-08-18 03:07:23',1,'파이썬 하세요.'),(15,'Jungu12','PpoSil','COMMENT','/freeboard/posts/3','2023-08-18 03:07:49',1,'나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? 나는? '),(16,'LEEILHO','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:10',1,NULL),(17,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:13',1,NULL),(18,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:13',1,NULL),(19,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:13',1,NULL),(20,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:14',1,NULL),(21,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:14',1,NULL),(22,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:15',1,NULL),(23,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:15',1,NULL),(24,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:16',1,NULL),(25,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:16',1,NULL),(26,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:16',1,NULL),(27,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:17',1,NULL),(28,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 03:08:17',1,NULL),(29,'ksg2388','Jungu12','LIKE','/freeboard/posts/2','2023-08-18 03:08:54',1,NULL),(30,'ksg2388','se0987','LIKE','/heuglit/posts/16031','2023-08-18 03:11:11',1,NULL),(31,'PpoSil','ksg2388','COMMENT','/freeboard/posts/7','2023-08-18 03:12:05',1,'가지마 솔비시치야'),(32,'PpoSil','Jungu12','COMMENT','/freeboard/posts/7','2023-08-18 03:13:15',1,'한숨 자고 가세요 바로가면 차 막혀요'),(33,'Jungu12','ksg2388','LIKE','/eureka/posts/1','2023-08-18 03:13:26',1,NULL),(34,'Jungu12','se0987','LIKE','/eureka/posts/1','2023-08-18 03:45:25',1,NULL),(35,'ksg2388','se0987','LIKE','/eureka/posts/3','2023-08-18 03:45:30',1,NULL),(36,'Jungu12','se0987','LIKE','/eureka/posts/2','2023-08-18 03:45:36',1,NULL),(37,'PpoSil','se0987','LIKE','/freeboard/posts/6','2023-08-18 03:46:07',1,NULL),(38,'Jungu12','se0987','FOLLOW',NULL,'2023-08-18 03:47:58',1,NULL),(39,'LEEILHO','se0987','FOLLOW',NULL,'2023-08-18 03:47:59',1,NULL),(40,'PpoSil','se0987','FOLLOW',NULL,'2023-08-18 03:48:01',1,NULL),(41,'ksg2388','se0987','FOLLOW',NULL,'2023-08-18 03:48:02',1,NULL),(42,'se0987','ksg2388','FOLLOW',NULL,'2023-08-18 03:58:54',0,NULL),(43,'Jungu12','LEEILHO','LIKE','/freeboard/posts/10','2023-08-18 04:06:08',1,NULL),(44,'ksg2388','Jungu12','LIKE','/freeboard/posts/9','2023-08-18 04:07:25',1,NULL),(45,'ksg2388','Jungu12','COMMENT','/freeboard/posts/9','2023-08-18 04:07:51',1,'ㅋㅋ'),(46,'ksg2388','Jungu12','COMMENT','/freeboard/posts/9','2023-08-18 04:07:55',1,'쏘리~'),(47,'ksg2388','Jungu12','COMMENT','/eureka/posts/5','2023-08-18 04:08:46',1,'안녕하세요'),(48,'ksg2388','LEEILHO','LIKE','/eureka/posts/3','2023-08-18 04:08:46',1,NULL),(49,'ksg2388','LEEILHO','COMMENT','/eureka/posts/3','2023-08-18 04:09:04',1,'정말 좋은 정보네요!!'),(50,'ksg2388','PpoSil','LIKE','/eureka/posts/5','2023-08-18 04:09:26',1,NULL),(51,'ksg2388','PpoSil','LIKE','/eureka/posts/5','2023-08-18 04:09:29',1,NULL),(52,'ksg2388','PpoSil','LIKE','/eureka/posts/3','2023-08-18 04:13:41',1,NULL),(53,'ksg2388','PpoSil','COMMENT','/eureka/posts/3','2023-08-18 04:14:18',1,'좋은 정보 감사합니다!'),(54,'ksg2388','PpoSil','LIKE','/eureka/posts/4','2023-08-18 04:14:31',1,NULL),(55,'ksg2388','PpoSil','COMMENT','/eureka/posts/4','2023-08-18 04:14:41',1,'나중에 함 봐볼게 ㅋㅋ 좋아요 눌러놨지롱'),(56,'Jungu12','ksg2388','LIKE','/eureka/posts/7','2023-08-18 04:24:45',1,NULL),(57,'Jungu12','PpoSil','FOLLOW',NULL,'2023-08-18 04:25:17',1,NULL),(58,'ksg2388','se0987','LIKE','/eureka/posts/5','2023-08-18 04:34:05',1,NULL),(59,'ksg2388','se0987','COMMENT','/eureka/posts/3','2023-08-18 04:34:42',1,'정보 감사합니다~'),(60,'se0987','ksg2388','FOLLOW',NULL,'2023-08-18 04:37:59',0,NULL),(61,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 04:38:00',0,NULL),(62,'Jungu12','ksg2388','FOLLOW',NULL,'2023-08-18 04:38:01',0,NULL),(63,'se0987','PpoSil','FOLLOW',NULL,'2023-08-18 04:38:47',0,NULL),(64,'se0987','PpoSil','FOLLOW',NULL,'2023-08-18 04:38:49',0,NULL),(65,'Jungu12','PpoSil','LIKE','/freeboard/posts/11','2023-08-18 05:19:51',0,NULL),(66,'Jungu12','PpoSil','COMMENT','/freeboard/posts/10','2023-08-18 05:19:57',0,'롤 ㄱㄱ'),(67,'Jungu12','PpoSil','COMMENT','/eureka/posts/7','2023-08-18 05:20:08',0,'wa'),(68,'LEEILHO','PpoSil','FOLLOW',NULL,'2023-08-18 05:24:23',0,NULL),(69,'ksg2388','PpoSil','FOLLOW',NULL,'2023-08-18 05:24:29',1,NULL),(70,'PpoSil','ksg2388','FOLLOW',NULL,'2023-08-18 08:46:22',1,NULL),(71,'Jungu12','ksg2388','LIKE','/heuglit/posts/16042','2023-08-18 08:46:29',0,NULL);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
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
