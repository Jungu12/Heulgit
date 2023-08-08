-- MySQL Script generated by MySQL Workbench
-- Mon Aug  7 10:50:53 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema heulgit
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `heulgit` ;

-- -----------------------------------------------------
-- Schema heulgit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heulgit` DEFAULT CHARACTER SET utf8 ;
USE `heulgit` ;

-- -----------------------------------------------------
-- Table `heulgit`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`user` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`user` (
  `github_id` VARCHAR(45) NOT NULL,
  `avatar_url` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NULL,
  `bio` VARCHAR(320) NULL,
  `company` VARCHAR(100) NULL,
  `location` VARCHAR(100) NULL,
  `blog` VARCHAR(255) NULL,
  PRIMARY KEY (`github_id`),
  UNIQUE INDEX `github_id_UNIQUE` (`github_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`freeboard`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`freeboard` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`freeboard` (
  `freeboard_id` INT NOT NULL AUTO_INCREMENT,
  `github_id` VARCHAR(45) NOT NULL,
  `title` VARCHAR(30) NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `updated_date` TIMESTAMP NOT NULL,
  `view` INT NOT NULL,
  PRIMARY KEY (`freeboard_id`),
  INDEX `fk_freeboard_user1_idx` (`github_id` ASC) VISIBLE,
  UNIQUE INDEX `freeboard_id_UNIQUE` (`freeboard_id` ASC) VISIBLE,
  CONSTRAINT `fk_freeboard_github_id`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`freeboard_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`freeboard_image` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`freeboard_image` (
  `freeboard_image_id` INT NOT NULL AUTO_INCREMENT,
  `file_uri` VARCHAR(255) NOT NULL,
  `freeboard_id` INT NOT NULL,
  PRIMARY KEY (`freeboard_image_id`),
  INDEX `fk_freeboard_image_freeboard1_idx` (`freeboard_id` ASC) VISIBLE,
  UNIQUE INDEX `freeboard_image_id_UNIQUE` (`freeboard_image_id` ASC) VISIBLE,
  CONSTRAINT `fk_freeboard_image_freeboard1`
    FOREIGN KEY (`freeboard_id`)
    REFERENCES `heulgit`.`freeboard` (`freeboard_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`freeboard_like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`freeboard_like` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`freeboard_like` (
  `github_id` VARCHAR(45) NOT NULL,
  `freeboard_id` INT NOT NULL,
  `created_date` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`github_id`, `freeboard_id`),
  INDEX `fk_user_has_freeboard_freeboard1_idx` (`freeboard_id` ASC) VISIBLE,
  INDEX `fk_user_has_freeboard_user1_idx` (`github_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_freeboard_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_freeboard_freeboard1`
    FOREIGN KEY (`freeboard_id`)
    REFERENCES `heulgit`.`freeboard` (`freeboard_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`freeboard_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`freeboard_comment` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`freeboard_comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `freeboard_id` INT NOT NULL,
  `github_id` VARCHAR(45) NOT NULL,
  `content` VARCHAR(50) NOT NULL,
  `updated_date` TIMESTAMP NOT NULL,
  `parent_id` INT NULL,
  INDEX `fk_freeboard_comment_freeboard1_idx` (`freeboard_id` ASC) VISIBLE,
  PRIMARY KEY (`comment_id`),
  UNIQUE INDEX `comment_id_UNIQUE` (`comment_id` ASC) VISIBLE,
  INDEX `fk_freeboard_comment_user1_idx` (`github_id` ASC) VISIBLE,
  INDEX `fk_freeboard_comment_freeboard_comment1_idx` (`parent_id` ASC) VISIBLE,
  CONSTRAINT `fk_freeboard_comment_freeboard1`
    FOREIGN KEY (`freeboard_id`)
    REFERENCES `heulgit`.`freeboard` (`freeboard_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_freeboard_comment_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_freeboard_comment_freeboard_comment1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `heulgit`.`freeboard_comment` (`comment_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`eureka`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`eureka` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`eureka` (
  `eureka_id` INT NOT NULL AUTO_INCREMENT,
  `github_id` VARCHAR(45) NOT NULL,
  `title` VARCHAR(30) NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `updated_date` TIMESTAMP NOT NULL,
  `view` INT NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`eureka_id`),
  UNIQUE INDEX `heulgit_id_UNIQUE` (`eureka_id` ASC) VISIBLE,
  INDEX `fk_heulgit_user1_idx` (`github_id` ASC) VISIBLE,
  CONSTRAINT `fk_eureka_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`eureka_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`eureka_comment` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`eureka_comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `eureka_id` INT NOT NULL,
  `github_id` VARCHAR(45) NOT NULL,
  `content` VARCHAR(50) NOT NULL,
  `updated_date` TIMESTAMP NOT NULL,
  `parent_id` INT NULL,
  INDEX `fk_heulgit_comment_heulgit1_idx` (`eureka_id` ASC) VISIBLE,
  PRIMARY KEY (`comment_id`),
  UNIQUE INDEX `comment_id_UNIQUE` (`comment_id` ASC) VISIBLE,
  INDEX `fk_heulgit_comment_user1_idx` (`github_id` ASC) VISIBLE,
  INDEX `fk_heulgit_comment_heulgit_comment1_idx` (`parent_id` ASC) VISIBLE,
  CONSTRAINT `fk_eureka_comment_eureka1`
    FOREIGN KEY (`eureka_id`)
    REFERENCES `heulgit`.`eureka` (`eureka_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_eureka_comment_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_eureka_comment_eureka_comment1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `heulgit`.`eureka_comment` (`comment_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`eureka_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`eureka_image` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`eureka_image` (
  `eureka_image_id` INT NOT NULL AUTO_INCREMENT,
  `file_uri` VARCHAR(255) NOT NULL,
  `eureka_id` INT NOT NULL,
  PRIMARY KEY (`eureka_image_id`),
  INDEX `fk_heulgit_image_heulgit1_idx` (`eureka_id` ASC) VISIBLE,
  UNIQUE INDEX `eureka_image_id_UNIQUE` (`eureka_image_id` ASC) VISIBLE,
  CONSTRAINT `fk_eureka_image_heulgit1`
    FOREIGN KEY (`eureka_id`)
    REFERENCES `heulgit`.`eureka` (`eureka_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`eureka_like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`eureka_like` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`eureka_like` (
  `eureka_id` INT NOT NULL,
  `github_id` VARCHAR(45) NOT NULL,
  `created_date` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`eureka_id`, `github_id`),
  INDEX `fk_heulgit_has_user_user1_idx` (`github_id` ASC) VISIBLE,
  INDEX `fk_heulgit_has_user_heulgit1_idx` (`eureka_id` ASC) VISIBLE,
  CONSTRAINT `fk_eureka_has_user_eureka1`
    FOREIGN KEY (`eureka_id`)
    REFERENCES `heulgit`.`eureka` (`eureka_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_eureka_has_user_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`relation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`relation` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`relation` (
  `relation_id` INT NOT NULL AUTO_INCREMENT,
  `from_id` VARCHAR(45) NOT NULL,
  `to_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`relation_id`),
  UNIQUE INDEX `follow_id_UNIQUE` (`relation_id` ASC) VISIBLE,
  INDEX `fk_follow_info_user1_idx` (`from_id` ASC) VISIBLE,
  INDEX `fk_follow_info_user2_idx` (`to_id` ASC) VISIBLE,
  CONSTRAINT `fk_follow_info_user1`
    FOREIGN KEY (`from_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_follow_info_user2`
    FOREIGN KEY (`to_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`heulgit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`heulgit` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`heulgit` (
  `heulgit_id` INT NOT NULL AUTO_INCREMENT,
  `github_id` VARCHAR(45) NOT NULL,
  `heulgit_name` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NULL,
  `star` INT NOT NULL,
  `updated_date` TIMESTAMP NOT NULL,
  `language` VARCHAR(45) NULL,
  `view` INT NOT NULL,
  `avatar_url` VARCHAR(255) NULL,
  PRIMARY KEY (`heulgit_id`),
  UNIQUE INDEX `eureka_id_UNIQUE` (`heulgit_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`heulgit_like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`heulgit_like` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`heulgit_like` (
  `github_id` VARCHAR(45) NOT NULL,
  `heulgit_id` INT NOT NULL,
  `created_date` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`github_id`, `heulgit_id`),
  INDEX `fk_user_has_eureka_eureka1_idx` (`heulgit_id` ASC) VISIBLE,
  INDEX `fk_user_has_eureka_user1_idx` (`github_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_heulgit_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_heulgit_heulgit1`
    FOREIGN KEY (`heulgit_id`)
    REFERENCES `heulgit`.`heulgit` (`heulgit_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`heulgit_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`heulgit_comment` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`heulgit_comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `heulgit_id` INT NOT NULL,
  `github_id` VARCHAR(45) NOT NULL,
  `content` VARCHAR(50) NULL,
  `updated_date` TIMESTAMP NULL,
  `parent_id` INT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE INDEX `comment_id_UNIQUE` (`comment_id` ASC) VISIBLE,
  INDEX `fk_eureka_comment_eureka1_idx` (`heulgit_id` ASC) VISIBLE,
  INDEX `fk_eureka_comment_user1_idx` (`github_id` ASC) VISIBLE,
  INDEX `fk_eureka_comment_eureka_comment1_idx` (`parent_id` ASC) VISIBLE,
  CONSTRAINT `fk_heulgit_comment_heulgit1`
    FOREIGN KEY (`heulgit_id`)
    REFERENCES `heulgit`.`heulgit` (`heulgit_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_heulgit_comment_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_heulgit_comment_heulgit_comment1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `heulgit`.`heulgit_comment` (`comment_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`notification` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`notification` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `receiver_id` VARCHAR(45) NOT NULL,
  `sender_id` VARCHAR(45) NOT NULL,
  `type` ENUM('LIKE', 'FOLLOW', 'MENTION', 'COMMENT') NOT NULL,
  `related_link` VARCHAR(255) NULL,
  `created_date` TIMESTAMP NOT NULL,
  `has_read` TINYINT NOT NULL,
  `content` VARCHAR(100) NULL,
  PRIMARY KEY (`notification_id`),
  UNIQUE INDEX `notification_id_UNIQUE` (`notification_id` ASC) VISIBLE,
  INDEX `fk_notification_user1_idx` (`receiver_id` ASC) VISIBLE,
  INDEX `fk_notification_user2_idx` (`sender_id` ASC) VISIBLE,
  CONSTRAINT `fk_notification_user1`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_notification_user2`
    FOREIGN KEY (`sender_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`commit_analyze`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`commit_analyze` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`commit_analyze` (
  `github_id` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`github_id`, `type`),
  CONSTRAINT `fk_commit_analyze_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`chatroom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`chatroom` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`chatroom` (
  `chatroom_id` VARCHAR(255) NOT NULL,
  `updated_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`chatroom_id`),
  UNIQUE INDEX `chatroom_id_UNIQUE` (`chatroom_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`chatroom_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`chatroom_user` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`chatroom_user` (
  `chatroom_id` VARCHAR(255) NOT NULL,
  `github_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`chatroom_id`, `github_id`),
  INDEX `fk_user_has_chatroom_chatroom1_idx` (`chatroom_id` ASC) VISIBLE,
  INDEX `fk_user_has_chatroom_user1_idx` (`github_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_chatroom_user1`
    FOREIGN KEY (`github_id`)
    REFERENCES `heulgit`.`user` (`github_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_chatroom_chatroom1`
    FOREIGN KEY (`chatroom_id`)
    REFERENCES `heulgit`.`chatroom` (`chatroom_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`eureka_github_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`eureka_github_info` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`eureka_github_info` (
  `eureka_github_info_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `state` TINYINT NOT NULL,
  `updated_date` TIMESTAMP NOT NULL,
  `body` LONGTEXT NULL,
  `comments` INT NOT NULL DEFAULT 0,
  `eureka_id` INT NOT NULL,
  PRIMARY KEY (`eureka_github_info_id`),
  UNIQUE INDEX `eureka_github_info_id_UNIQUE` (`eureka_github_info_id` ASC) VISIBLE,
  INDEX `fk_eureka_github_info_eureka1_idx` (`eureka_id` ASC) VISIBLE,
  CONSTRAINT `fk_eureka_github_info_eureka1`
    FOREIGN KEY (`eureka_id`)
    REFERENCES `heulgit`.`eureka` (`eureka_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heulgit`.`github_label`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heulgit`.`github_label` ;

CREATE TABLE IF NOT EXISTS `heulgit`.`github_label` (
  `github_label_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `eureka_github_info_id` INT NOT NULL,
  PRIMARY KEY (`github_label_id`),
  UNIQUE INDEX `idgithub_label_id_UNIQUE` (`github_label_id` ASC) VISIBLE,
  INDEX `fk_github_label_eureka_github_info_id_idx` (`eureka_github_info_id` ASC) VISIBLE,
  CONSTRAINT `fk_github_label_eureka_github_info_id`
    FOREIGN KEY (`eureka_github_info_id`)
    REFERENCES `heulgit`.`eureka_github_info` (`eureka_github_info_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;