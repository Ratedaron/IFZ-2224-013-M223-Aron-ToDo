-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema m223todo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema m223todo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `m223todo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `m223todo` ;

-- -----------------------------------------------------
-- Table `m223todo`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `m223todo`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` ENUM('ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER') NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `m223todo`.`tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `m223todo`.`tasks` (
  `taskid` INT NOT NULL AUTO_INCREMENT,
  `task_name` VARCHAR(255) NULL DEFAULT NULL,
  `task_description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`taskid`))
ENGINE = InnoDB
AUTO_INCREMENT = 290
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `m223todo`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `m223todo`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(120) NULL DEFAULT NULL,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UKr43af9ap4edm43mmtq01oddj6` (`username` ASC) VISIBLE,
  UNIQUE INDEX `UK6dotkott2kjsp8vw4d0m25fb7` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `m223todo`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `m223todo`.`user_roles` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id` ASC) VISIBLE,
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6`
    FOREIGN KEY (`role_id`)
    REFERENCES `m223todo`.`roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f`
    FOREIGN KEY (`user_id`)
    REFERENCES `m223todo`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
