/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE,
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_luu` datetime DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE,
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 2, 1, '2024-10-02 12:10:12', 'Love this shot!');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(3, 3, 8, '2024-10-03 15:45:30', 'Amazing view!');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 4, 2, '2024-10-04 09:00:00', 'Nice profile picture.');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(5, 5, 11, '2024-10-05 17:22:50', 'Looking good!'),
(6, 6, 6, '2024-10-06 13:30:22', 'Awesome!'),
(7, 7, 9, '2024-10-07 18:15:10', 'Very cool!'),
(8, 8, 4, '2024-10-08 20:55:05', 'Such a great moment.'),
(9, 9, 3, '2024-10-09 11:10:18', 'Perfect capture!'),
(10, 10, 12, '2024-10-10 14:40:45', 'So beautiful!'),
(11, 11, 7, '2024-10-11 19:32:00', 'Fantastic picture!'),
(12, 12, 10, '2024-10-12 08:20:30', 'I love this!'),
(13, 13, 18, '2024-10-13 09:45:12', 'Very creative!'),
(14, 14, 14, '2024-10-14 21:00:45', 'Really inspiring.'),
(15, 15, 16, '2024-10-15 10:11:30', 'This is awesome!'),
(16, 16, 17, '2024-10-16 13:25:55', 'Looking great!'),
(17, 17, 15, '2024-10-17 16:45:05', 'So cool!'),
(18, 18, 20, '2024-10-18 18:30:20', 'Absolutely fantastic!'),
(19, 19, 19, '2024-10-19 14:50:15', 'Beautiful shot!'),
(20, 20, 13, '2024-10-20 15:10:30', 'I really like this!'),
(22, 13, NULL, '2024-10-22 08:43:51', 'Post thử'),
(25, 1, 24, '2024-10-22 09:04:21', 'Khong co gi dac biet'),
(26, 3, 25, '2024-10-22 09:05:23', 'test thu'),
(28, 5, NULL, '2024-10-22 09:31:21', 'Test thử '),
(30, 5, NULL, '2024-10-23 09:20:06', 'Test thử '),
(31, 5, NULL, '2024-10-23 09:27:05', 'Test thử '),
(32, 5, NULL, '2024-10-23 09:31:00', 'Test thử ');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'profile_pic_1', '/images/john.jpg', 'John’s profile picture', 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'profile_pic_2', '/images/jane.jpg', 'Jane’s profile picture', 2);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, 'profile_pic_3', '/images/alice.jpg', 'Alice’s profile picture', 3);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'profile_pic_4', '/images/bob.jpg', 'Bob’s profile picture', 4),
(6, 'profile_pic_6', '/images/emily.jpg', 'Emily’s profile picture', 6),
(7, 'profile_pic_7', '/images/frank.jpg', 'Frank’s profile picture', 7),
(8, 'profile_pic_8', '/images/david.jpg', 'David’s profile picture', 8),
(9, 'profile_pic_9', '/images/olivia.jpg', 'Olivia’s profile picture', 9),
(10, 'profile_pic_10', '/images/lisa.jpg', 'Lisa’s profile picture', 10),
(11, 'profile_pic_11', '/images/mike.jpg', 'Mike’s profile picture', 11),
(12, 'profile_pic_12', '/images/natalie.jpg', 'Natalie’s profile picture', 12),
(13, 'profile_pic_13', '/images/paul.jpg', 'Paul’s profile picture', 13),
(14, 'profile_pic_14', '/images/quinn.jpg', 'Quinn’s profile picture', 14),
(15, 'profile_pic_15', '/images/rachel.jpg', 'Rachel’s profile picture', 15),
(16, 'profile_pic_16', '/images/steve.jpg', 'Steve’s profile picture', 16),
(17, 'profile_pic_17', '/images/tina.jpg', 'Tina’s profile picture', 17),
(18, 'profile_pic_18', '/images/victor.jpg', 'Victor’s profile picture', 18),
(19, 'profile_pic_19', '/images/wendy.jpg', 'Wendy’s profile picture', 19),
(20, 'profile_pic_20', '/images/xavier.jpg', 'Xavier’s profile picture', 20),
(24, 'comment/Screenshot 2024-10-22 152902', 'https://res.cloudinary.com/dyyxpb4nu/image/upload/v1729586718/comment/Screenshot%202024-10-22%20152902.jpg', NULL, 1),
(25, 'comment/Screenshot 2024-10-22 152902', 'https://res.cloudinary.com/dyyxpb4nu/image/upload/v1729586718/comment/Screenshot%202024-10-22%20152902.jpg', NULL, 3),
(31, 'cat', 'https://res.cloudinary.com/dyyxpb4nu/image/upload/v1729673002/comment/download.jpg', 'cute cat in the pic', 19),
(32, 'cat', 'https://res.cloudinary.com/dyyxpb4nu/image/upload/v1729673002/comment/download.jpg', 'cute cat in the pic', 19),
(33, 'cat', 'https://res.cloudinary.com/dyyxpb4nu/image/upload/v1729673002/comment/download.jpg', 'cute cat in the pic', 19);

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 2, '2024-10-01 09:30:00');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(2, 4, '2024-10-02 11:15:22');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(3, 6, '2024-10-03 14:20:10');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(4, 8, '2024-10-04 16:45:50'),
(5, 10, '2024-10-05 18:30:40'),
(6, 12, '2024-10-06 08:10:25'),
(7, 14, '2024-10-07 20:50:55'),
(8, 16, '2024-10-08 12:35:00'),
(9, 18, '2024-10-09 15:20:35'),
(10, 20, '2024-10-10 17:00:00'),
(11, 1, '2024-10-11 13:25:45'),
(12, 3, '2024-10-12 09:40:15'),
(14, 7, '2024-10-14 10:05:00'),
(15, 9, '2024-10-15 14:15:30'),
(16, 11, '2024-10-16 18:20:00'),
(17, 13, '2024-10-17 16:40:25'),
(18, 15, '2024-10-18 22:30:10'),
(19, 17, '2024-10-19 19:05:50'),
(20, 19, '2024-10-20 11:45:35');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'john.doe@example.com', 'password123', 'John Doe', 25, 'john.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'jane.smith@example.com', 'pass456', 'Jane Smith', 28, 'jane.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'alice.wonderland@example.com', 'wonder789', 'Alice Wonderland', 22, 'alice.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'duy@mail.com', '123456', 'duy', 4, 'avatar.jpg'),
(5, 'charlie.brown@example.com', 'charlie123', 'Charlie Brown', 18, 'charlie.jpg'),
(6, 'k@mail.com', '123456', 'Jason', 4, 'https://res.cloudinary.com/dyyxpb4nu/image/upload/v1729739200/comment/Screenshot%202024-10-24%20094950.jpg'),
(7, 'frank.carter@example.com', 'frankpass', 'Frank Carter', 27, 'frank.jpg'),
(8, 'david.taylor@example.com', 'david000', 'David Taylor', 33, 'david.jpg'),
(9, 'olivia.jones@example.com', 'oliviaxyz', 'Olivia Jones', 21, 'olivia.jpg'),
(10, 'lisa.white@example.com', 'lisaabc', 'Lisa White', 24, 'lisa.jpg'),
(11, 'mike.miller@example.com', 'mike111', 'Mike Miller', 40, 'mike.jpg'),
(12, 'natalie.hall@example.com', 'natalie456', 'Natalie Hall', 26, 'natalie.jpg'),
(13, 'paul.anderson@example.com', 'paul321', 'Paul Anderson', 29, 'paul.jpg'),
(14, 'quinn.lee@example.com', 'quinnxyz', 'Quinn Lee', 20, 'quinn.jpg'),
(15, 'rachel.green@example.com', 'rachelpass', 'Rachel Green', 32, 'rachel.jpg'),
(16, 'steve.jobs@example.com', 'steve123', 'Steve Jobs', 45, 'steve.jpg'),
(17, 'tina.brown@example.com', 'tinapass', 'Tina Brown', 19, 'tina.jpg'),
(18, 'victor.king@example.com', 'victor007', 'Victor King', 31, 'victor.jpg'),
(19, 'wendy.wilson@example.com', 'wendy888', 'Wendy Wilson', 23, 'wendy.jpg'),
(20, 'xavier.lopez@example.com', 'xavier456', 'Xavier Lopez', 37, 'xavier.jpg'),
(21, 'duytest@mail.com', '$2a$10$KIgrshCjSDFeUvz8pAwGyeNLxAjAFZq8tCuEPp2g.IwIBEhTYliuC', 'test', 18, NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;