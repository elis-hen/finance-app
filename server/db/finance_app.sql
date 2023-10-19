-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2023 at 09:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finance_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(33) NOT NULL,
  `user_key` varchar(255) NOT NULL,
  `nature` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `balance` varchar(255) NOT NULL,
  `current_value` varchar(255) NOT NULL,
  `deductions` varchar(255) NOT NULL,
  `is_default` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `user_key`, `nature`, `account`, `currency`, `category`, `qty`, `balance`, `current_value`, `deductions`, `is_default`, `status`) VALUES
(1, 'admin@admin', 'account', 'bank', 'NZD', '', '0', '950', '', '', '', ''),
(4, 'admin@admin', 'investment', 'apple', 'USD', 'shares', '5', '50', '', '', '', ''),
(7, 'admin@admin', 'account', 'cash', 'NZD', '', '0', '0', '', '', '', ''),
(9, 'admin@admin', 'investment', 'savings', 'USD', 'fixed', '0', '0', '', '', '', ''),
(11, 'admin@admin', 'account', 'itau', 'BRL', '', '0', '250', '', '', 'yes', ''),
(12, 'admin@admin', 'account', 'nomad', 'USD', '', '0', '-50', '', '', '', ''),
(13, 'admin@admin', 'account', 'wise', 'USD', '', '0', '0', '', '', '', ''),
(14, 'admin@admin', 'account', 'nubank', 'BRL', '', '0', '0', '', '', '', ''),
(15, 'admin@admin', 'account', 'wiseNz', 'NZD', '', '0', '0', '', '', '', ''),
(16, 'admin@admin', 'account', 'avenue', 'BRL', '', '0', '0', '', '', '', ''),
(17, 'admin@admin', 'account', 'bradesco', 'EUR', '', '0', '0', '', '', '', ''),
(18, 'admin@admin', 'investment', 'ibov', 'BRL', 'shares', '0', '0', '', '', '', ''),
(19, 'admin@admin', 'investment', 'tesouro', 'BRL', '', '0.5', '50', '', '', 'yes', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(33) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
