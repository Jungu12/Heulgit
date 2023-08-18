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
-- Table structure for table `eureka_github_info`
--

DROP TABLE IF EXISTS `eureka_github_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eureka_github_info` (
  `eureka_github_info_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` tinyint NOT NULL,
  `updated_date` timestamp NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci,
  `comments` int NOT NULL DEFAULT '0',
  `eureka_id` int NOT NULL,
  PRIMARY KEY (`eureka_github_info_id`),
  UNIQUE KEY `eureka_github_info_id_UNIQUE` (`eureka_github_info_id`),
  KEY `fk_eureka_github_info_eureka1_idx` (`eureka_id`),
  CONSTRAINT `fk_eureka_github_info_eureka1` FOREIGN KEY (`eureka_id`) REFERENCES `eureka` (`eureka_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eureka_github_info`
--

LOCK TABLES `eureka_github_info` WRITE;
/*!40000 ALTER TABLE `eureka_github_info` DISABLE KEYS */;
INSERT INTO `eureka_github_info` VALUES (1,'Ksg2388 : [19week]',0,'2023-07-16 03:18:29','1. 귀여운 라이언\r\n- 시간 복잡도 : $O(N)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/4caf8e25-a7e7-41a9-9219-7e6020da50db)\r\n\r\n2. 가장 가까운 공통 조상\r\n- 시간 복잡도 : $O(NlogN)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/6f1df2a5-1e9e-4dd9-b6dd-5a9e0c4e3db0)\r\n\r\n3. 개근상\r\n- 시간 복잡도 : $O(N)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/cc7ea4a9-45c1-4fbb-9915-980f992f8ebf)\r\n\r\n4. 풍선 터트리기\r\n- 시간 복잡도 : $O(N)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/32da1f01-89a7-4875-b888-7c8e460c32af)\r\n\r\n5. 호텔 대실\r\n- 시간 복잡도 : $O(N^2)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/8fd3ff8d-1c54-4ad7-ba19-d81b0ab591b2)\r\n',0,1),(2,'[1week/1team] SUbbb : 1 ~ 2장',0,'2023-04-26 00:04:44','## 주요 내용\r\n- 개발자로서 이 책을 읽기 위해 가져야 할 생각과 고민들\r\n- 테스트 코드 작성과 리팩토링의 관계, 그리고 그 중요성\r\n\r\n## 후기\r\n- 이 책에서 계속해서 다룰 리팩토링을 맛볼 수 있었다.\r\n- 그리고 그 사이사이에 개발자로서 가져야 할 생각들에 대해 배울 수 있었다.\r\n- 가장 기억에 남는 것은 리팩토링의 3가지 원칙!\r\n',7,2),(3,'품질 높은 코드 디자인 (Design Patterns)',0,'2023-03-09 06:57:05','## 학습 목표\n\n설계가 부족해 읽기 어렵고 유지 보수 또한 힘든 코드를 \"[스파게티 코드](https://namu.wiki/w/%EC%8A%A4%ED%8C%8C%EA%B2%8C%ED%8B%B0%20%EC%BD%94%EB%93%9C)\"라 부르며, \n**개발자는 규격화 된 설계 패턴을 이해하여 스파게티 코드를 만들지 않도록 노력해야 합니다.**\n\nReact 학습에 앞서 코드 품질을 향상시키는 다양한 설계 방법에 대해 살펴봅니다. ?\n\n- [ ] 디자인 패턴 (OOP)\n- [ ] 안티 패턴 피하기\n- [ ] MV* 아키텍처 패턴\n- [ ] 컴포넌트 패턴\n\n<br />\n\n아래 학습 저장소를 [degit](https://github.com/Rich-Harris/degit#usage) 명령으로 로컬 드라이브로 복제한 후 학습합니다.\n\n- [yamoo9/mvc-design-patterns](https://github.com/yamoo9/mvc-design-patterns)',0,3),(4,'Scrolling does not work',0,'2023-08-15 15:28:17','**Scrolling issue:**\r\nWhen we visit the link https://react.dev/reference/react the scroll does not work. \r\n\r\nIf we look into this element <div class=\"overflow-y-scroll no-bg-scrollbar lg:w-[342px] grow bg-wash dark:bg-wash-dark\" style=\"overscroll-behavior: contain;\"> and under the selector .lg\\:w-\\[342px\\] change the width to 320px scroll works correctly. \r\n\r\nI am new to web developement and I hope my understanding of the problem and solution is correct. \r\n\r\nRegards,\r\nSaurabh',2,4),(5,'업데이트 좀 그만 하세요 !!!',0,'2018-12-03 00:12:19','React 개발팀:\r\n\r\n업데이트 좀 그만 하세요!!! 써글넘들...\r\n이전 버전과 현재 버전 사이에는 항상 연관성이 있고, 공통성이 있어야지!!!\r\n업데이트 할 때마다, 대량으로 수정을 해놓으면..\r\n사용자들이 React 각 버전마다 새로 공부를 해야 되잖아요!!!\r\n너무 변득스럽네요. 맨날 이랬다. 저랬다! \r\nReact가 그렇게 불안전한 플랫폼인가요? \r\n매뉴얼도 좀 간단하게 만드세요. \r\n링크가 너무 많아서, 사용자들이 이리 갔다, 저리 갔다 하면서 헷갈리게 하지말고..\r\n\r\nAngular 나 vue 로 갈아타던가 해야지! \r\nReact 업데이트가 정말 짜증나네요.',3,5),(7,'Jungu12 : [18week]',0,'2023-06-30 07:06:05','1. 주식가격\r\n- 시간 복잡도 : $O(N^2)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/75069880/2afc028d-86d3-44a5-b413-c6350aa795a8)\r\n\r\n2. 무인도 여행\r\n- 시간 복잡도 : $O(N^2)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/75069880/624f3586-60b4-4042-b690-124087a76ac7)\r\n\r\n3. 표 병합\r\n- 시간 복잡도 : $O(N^2)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/75069880/5be3ca60-c88b-4f41-9f81-2a5991355927)\r\n\r\n4. 골목 대장 호석 - 기능성\r\n- 시간 복잡도 : $O(N^2)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/75069880/40f12750-d863-41a6-80a1-f3f0c0bedfe8)\r\n\r\n5. 문자열 지옥에 빠진 호석\r\n- 시간 복잡도 : $O(N^2)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/75069880/b1506b87-3c71-4da7-a5d8-52c39cd246b7)\r\n',0,7),(8,'Ksg2388 : [19week]',0,'2023-07-16 03:18:29','1. 귀여운 라이언\r\n- 시간 복잡도 : $O(N)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/4caf8e25-a7e7-41a9-9219-7e6020da50db)\r\n\r\n2. 가장 가까운 공통 조상\r\n- 시간 복잡도 : $O(NlogN)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/6f1df2a5-1e9e-4dd9-b6dd-5a9e0c4e3db0)\r\n\r\n3. 개근상\r\n- 시간 복잡도 : $O(N)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/cc7ea4a9-45c1-4fbb-9915-980f992f8ebf)\r\n\r\n4. 풍선 터트리기\r\n- 시간 복잡도 : $O(N)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/32da1f01-89a7-4875-b888-7c8e460c32af)\r\n\r\n5. 호텔 대실\r\n- 시간 복잡도 : $O(N^2)$\r\n![image](https://github.com/SeongukBaek/algoStudy/assets/45422827/8fd3ff8d-1c54-4ad7-ba19-d81b0ab591b2)\r\n',0,8);
/*!40000 ALTER TABLE `eureka_github_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:15:01
