-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 28, 2024 at 06:48 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `on_tap_khoa_hoc`
--

-- --------------------------------------------------------

--
-- Table structure for table `cauhoi`
--

CREATE TABLE `cauhoi` (
  `id` int NOT NULL,
  `noi_dung` text NOT NULL,
  `mon_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cauhoi`
--

INSERT INTO `cauhoi` (`id`, `noi_dung`, `mon_id`) VALUES
(1, 'Chuyên đề hàm số: Cho hàm số y = 2x^3 - 3x^2 + 1. Đạo hàm của hàm số tại điểm x = 1 là gì?', 1),
(2, 'Chuyên đề tổ hợp: Có bao nhiêu cách sắp xếp 4 người vào 4 ghế?', 1),
(3, 'Chuyên đề hình học không gian: Diện tích toàn phần của hình lập phương có cạnh bằng 3 là bao nhiêu?', 1),
(4, 'Chuyên đề phương trình: Nghiệm của phương trình x^2 - 4x + 4 = 0 là gì?', 1),
(5, 'Chuyên đề tích phân: Tích phân ∫0^1 x^2 dx có giá trị là bao nhiêu?', 1),
(6, 'Chuyên đề xác suất: Xác suất để tung một con xúc xắc và ra số chẵn là bao nhiêu?', 1),
(7, 'Chuyên đề hệ phương trình: Giải hệ phương trình x + y = 5, 2x - y = 1. Giá trị của x là bao nhiêu?', 1),
(8, 'Chuyên đề hình học phẳng: Trong tam giác đều, mỗi góc có độ lớn là bao nhiêu?', 1),
(9, 'Chuyên đề logarit: Giải phương trình log_2(x + 1) = 3. Giá trị của x là bao nhiêu?', 1),
(10, 'Chuyên đề số phức: Số phức nào sau đây có mô-đun bằng 5?', 1),
(11, 'What is the past tense of \"go\"?', 3),
(12, 'Which word is a synonym for \"happy\"?', 3),
(13, 'How do you say \"hello\" in French?', 3),
(14, 'What is the plural form of \"child\"?', 3),
(15, 'Complete the sentence: She ___ to the store yesterday.', 3),
(16, 'Which of the following is a noun?', 3),
(17, 'What does \"bilingual\" mean?', 3),
(18, 'What is the opposite of \"difficult\"?', 3),
(19, 'Choose the correct article: ___ apple a day.', 3),
(20, 'Which of these is a preposition?', 3);

-- --------------------------------------------------------

--
-- Table structure for table `khoahoc`
--

CREATE TABLE `khoahoc` (
  `id` int NOT NULL,
  `ten_khoa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `khoahoc`
--

INSERT INTO `khoahoc` (`id`, `ten_khoa`) VALUES
(1, 'AT19'),
(2, 'AT20'),
(3, 'AT18'),
(4, 'AT21');

-- --------------------------------------------------------

--
-- Table structure for table `monhoc`
--

CREATE TABLE `monhoc` (
  `id` int NOT NULL,
  `ten_mon` varchar(255) NOT NULL,
  `khoa_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `monhoc`
--

INSERT INTO `monhoc` (`id`, `ten_mon`, `khoa_id`) VALUES
(1, 'Toán Chuyên Đề', 1),
(2, 'Hệ quản trị cơ sở dữ liệu', 1),
(3, 'Tiếng Anh 3', 1),
(4, 'Cấu trúc dữ liệu và giải thuật', 1),
(5, 'Kỹ thuật truyền số liệu', 1),
(6, 'Nguyên lý hệ điều hành', 1),
(7, 'An toàn mạng không dây và di động', 3),
(8, 'An toàn mạng máy tính', 3),
(9, 'Chuyên đề Kỹ nghệ an toàn mạng', 3),
(10, 'Công nghệ web an toàn', 3);

-- --------------------------------------------------------

--
-- Table structure for table `phuongan`
--

CREATE TABLE `phuongan` (
  `id` int NOT NULL,
  `noi_dung` text NOT NULL,
  `dung` tinyint(1) NOT NULL,
  `cau_hoi_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `phuongan`
--

INSERT INTO `phuongan` (`id`, `noi_dung`, `dung`, `cau_hoi_id`) VALUES
(1, '6', 0, 1),
(2, '-6', 0, 1),
(3, '4', 0, 1),
(4, '8', 1, 1),
(5, '24', 1, 2),
(6, '12', 0, 2),
(7, '30', 0, 2),
(8, '20', 0, 2),
(9, '27', 0, 3),
(10, '12', 0, 3),
(11, '18', 1, 3),
(12, '36', 0, 3),
(13, '2', 0, 4),
(14, '1', 1, 4),
(15, '3', 0, 4),
(16, '4', 0, 4),
(17, '1/3', 1, 5),
(18, '1/2', 0, 5),
(19, '2/3', 0, 5),
(20, '1/4', 0, 5),
(21, '1/2', 1, 6),
(22, '1/3', 0, 6),
(23, '2/3', 0, 6),
(24, '1/6', 0, 6),
(25, '3', 1, 7),
(26, '4', 0, 7),
(27, '2', 0, 7),
(28, '5', 0, 7),
(29, '60 độ', 1, 8),
(30, '45 độ', 0, 8),
(31, '90 độ', 0, 8),
(32, '120 độ', 0, 8),
(33, '7', 0, 9),
(34, '5', 1, 9),
(35, '6', 0, 9),
(36, '8', 0, 9),
(37, '5 + 0i', 1, 10),
(38, '4 + 3i', 0, 10),
(39, '3 + 4i', 0, 10),
(40, '5 + 2i', 0, 10),
(41, 'Went', 1, 11),
(42, 'Go', 0, 11),
(43, 'Going', 0, 11),
(44, 'Gone', 0, 11),
(45, 'Joyful', 1, 12),
(46, 'Sad', 0, 12),
(47, 'Angry', 0, 12),
(48, 'Tired', 0, 12),
(49, 'Bonjour', 1, 13),
(50, 'Hola', 0, 13),
(51, 'Ciao', 0, 13),
(52, 'Hallo', 0, 13),
(53, 'Children', 1, 14),
(54, 'Childs', 0, 14),
(55, 'Childes', 0, 14),
(56, 'Childrens', 0, 14),
(57, 'Went', 1, 15),
(58, 'Go', 0, 15),
(59, 'Going', 0, 15),
(60, 'Gone', 0, 15),
(61, 'Book', 1, 16),
(62, 'Quickly', 0, 16),
(63, 'Run', 0, 16),
(64, 'Happy', 0, 16),
(65, 'Able to speak two languages', 1, 17),
(66, 'A person who speaks one language', 0, 17),
(67, 'A type of food', 0, 17),
(68, 'A type of animal', 0, 17),
(69, 'Easy', 1, 18),
(70, 'Hard', 0, 18),
(71, 'Complicated', 0, 18),
(72, 'Challenging', 0, 18),
(73, 'An', 1, 19),
(74, 'The', 0, 19),
(75, 'A', 0, 19),
(76, 'Some', 0, 19),
(77, 'In', 1, 20),
(78, 'Quickly', 0, 20),
(79, 'Happily', 0, 20),
(80, 'Beautifully', 0, 20);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` int NOT NULL DEFAULT '0',
  `token` text,
  `refreshToken` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `admin`, `token`, `refreshToken`) VALUES
(1, 'administrator', 'administratoR321123', 1, NULL, NULL),
(2, 'l3mnt2010', 'l3mnt2010L3mNt2010', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJsM21udDIwMTAiLCJhZG1pbiI6MSwiaWF0IjoxNzI0ODIzNTkwLCJleHAiOjE3MjQ4MzA3OTB9.VC3S4Q8DteQONKKf-38U8w-H24vI3ax_GJcIIOyWEaE', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJsM21udDIwMTAiLCJhZG1pbiI6MSwiaWF0IjoxNzI0ODIzNTkwLCJleHAiOjE3MjU0MjgzOTB9.gsfLOUNWZIlEy6Q0Z6h0jgD8o1z2gN45kYjmxYVXV58'),
(3, 'user001', 'Passw0rd!001', 0, NULL, NULL),
(4, 'user002', 'Passw0rd!002', 0, NULL, NULL),
(5, 'user003', 'Passw0rd!003', 0, NULL, NULL),
(6, 'user004', 'Passw0rd!004', 0, NULL, NULL),
(7, 'user005', 'Passw0rd!005', 0, NULL, NULL),
(14, 'l3mnt20102004', 'l3mnt2010L3mNt2010', 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cauhoi`
--
ALTER TABLE `cauhoi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mon_id` (`mon_id`);

--
-- Indexes for table `khoahoc`
--
ALTER TABLE `khoahoc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monhoc`
--
ALTER TABLE `monhoc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `khoa_id` (`khoa_id`);

--
-- Indexes for table `phuongan`
--
ALTER TABLE `phuongan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cau_hoi_id` (`cau_hoi_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cauhoi`
--
ALTER TABLE `cauhoi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `khoahoc`
--
ALTER TABLE `khoahoc`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `monhoc`
--
ALTER TABLE `monhoc`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `phuongan`
--
ALTER TABLE `phuongan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cauhoi`
--
ALTER TABLE `cauhoi`
  ADD CONSTRAINT `cauhoi_ibfk_1` FOREIGN KEY (`mon_id`) REFERENCES `monhoc` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `monhoc`
--
ALTER TABLE `monhoc`
  ADD CONSTRAINT `monhoc_ibfk_1` FOREIGN KEY (`khoa_id`) REFERENCES `khoahoc` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `phuongan`
--
ALTER TABLE `phuongan`
  ADD CONSTRAINT `phuongan_ibfk_1` FOREIGN KEY (`cau_hoi_id`) REFERENCES `cauhoi` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
