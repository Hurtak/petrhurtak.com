-- Adminer 4.2.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `description` varchar(250) COLLATE utf8_czech_ci NOT NULL,
  `url` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `directory` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `date_publication` datetime NOT NULL,
  `date_last_update` datetime NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`),
  KEY `date_publication` (`date_publication`),
  KEY `published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;


DROP TABLE IF EXISTS `articles_html`;
CREATE TABLE `articles_html` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_article` int(11) NOT NULL,
  `html` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_article` (`id_article`),
  CONSTRAINT `articles_html_ibfk_2` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `snippets`;
CREATE TABLE `snippets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_article` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_czech_ci NOT NULL,
  `inline` tinyint(4) NOT NULL DEFAULT '0',
  `head` mediumtext CHARACTER SET utf8 COLLATE utf8_czech_ci,
  `html` mediumtext CHARACTER SET utf8 COLLATE utf8_czech_ci,
  `css` mediumtext CHARACTER SET utf8 COLLATE utf8_czech_ci,
  `js` mediumtext CHARACTER SET utf8 COLLATE utf8_czech_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_article_name` (`id_article`,`name`),
  KEY `id_article` (`id_article`),
  CONSTRAINT `snippets_ibfk_2` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2016-10-23 19:09:17
