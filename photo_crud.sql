-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2024 at 11:23 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photo_crud`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `reset_auto_increment` ()   BEGIN
    DECLARE max_id INT;
    SELECT MAX(id) INTO max_id FROM images;
    SET @sql = CONCAT('ALTER TABLE images AUTO_INCREMENT = ', max_id + 1);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `image_url` text NOT NULL,
  `description` text DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image_url`, `description`, `title`) VALUES
(1, 'https://lp-cms-production.imgix.net/features/2018/02/Aleksander-Nevski-Cathedral-Sofia-6303650c1b02.jpg', 'Description for image 1', 'Title for image 1'),
(2, 'https://i.natgeofe.com/n/ed5dd8fb-d73b-4770-b7f1-ed9a4227d852/gettyimages-1205570855.jpg', 'Description for image 2', 'Title for image 2'),
(3, 'https://www.telegraph.co.uk/content/dam/travel/2023/01/19/TELEMMGLPICT000322566298_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQf0Rf_Wk3V23H2268P_XkPxc.jpeg', 'Description for image 3', 'Title for image 3'),
(4, 'https://3seaseurope.com/wp-content/uploads/2023/08/city.webp', 'Description for image 4', 'Title for image 4'),
(5, 'https://www.telegraph.co.uk/content/dam/travel/2023/01/19/TELEMMGLPICT000322566293_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQf0Rf_Wk3V23H2268P_XkPxc.jpeg', 'Description for image 5', 'Title for image 5'),
(6, 'https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/best-time-to-visit-bulgaria-1501051322-785X440.jpg', 'Description for image 6', 'Title for image 6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
