-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table stepflex.address: ~1 rows (approximately)
REPLACE INTO `address` (`id`, `line1`, `line2`, `zip_code`, `district_id`, `mobile`, `user_id`) VALUES
	(1, '351/8, Raddolugama road,', 'Raddolugama', '11400', 9, '0768210740', 26);

-- Dumping data for table stepflex.brand: ~6 rows (approximately)
REPLACE INTO `brand` (`id`, `name`) VALUES
	(1, 'Nike'),
	(2, 'Adidas'),
	(3, 'Puma'),
	(4, 'New Balance'),
	(5, 'Converse'),
	(6, 'Vans');

-- Dumping data for table stepflex.cart: ~0 rows (approximately)

-- Dumping data for table stepflex.category: ~3 rows (approximately)
REPLACE INTO `category` (`id`, `name`) VALUES
	(1, 'Men'),
	(2, 'Women'),
	(3, 'Kids');

-- Dumping data for table stepflex.district: ~25 rows (approximately)
REPLACE INTO `district` (`id`, `name`, `province_id`) VALUES
	(1, 'Jaffna', 1),
	(2, 'Kilinochchi', 1),
	(3, 'Mannar', 1),
	(4, 'Mullaitivu', 1),
	(5, 'Vavuniya', 1),
	(6, 'Puttalam', 2),
	(7, 'Kurunegala', 2),
	(8, 'Gampaha', 3),
	(9, 'Colombo', 3),
	(10, 'Kalutara', 3),
	(11, 'Anuradhapura', 4),
	(12, 'Polonnaruwa', 4),
	(13, 'Matale', 5),
	(14, 'Kandy', 5),
	(15, 'Nuwara Eliya', 5),
	(16, 'Kegalle', 6),
	(17, 'Ratnapura', 6),
	(18, 'Trincomalee', 7),
	(19, 'Batticaloa', 7),
	(20, 'Ampara', 7),
	(21, 'Badulla', 8),
	(22, 'Monaragala', 8),
	(23, 'Hambantota', 9),
	(24, 'Matara', 9),
	(25, 'Galle', 9);

-- Dumping data for table stepflex.order: ~2 rows (approximately)
REPLACE INTO `order` (`id`, `date_time`, `user_id`, `address_id`) VALUES
	(3, '2024-12-18 19:18:13', 26, 1),
	(16, '2024-12-18 22:27:44', 26, 1);

-- Dumping data for table stepflex.order_item: ~2 rows (approximately)
REPLACE INTO `order_item` (`id`, `qty`, `order_id`, `product_id`, `order_status_id`) VALUES
	(2, 1, 3, 38, 1),
	(15, 1, 16, 32, 1);

-- Dumping data for table stepflex.order_status: ~4 rows (approximately)
REPLACE INTO `order_status` (`id`, `name`) VALUES
	(1, 'Paid'),
	(2, 'Processing'),
	(3, 'Shipped'),
	(4, 'Deliverd');

-- Dumping data for table stepflex.product: ~9 rows (approximately)
REPLACE INTO `product` (`id`, `title`, `description`, `price`, `user_id`, `brand_id`, `date_time`, `qty`, `product_status_id`, `size_id`) VALUES
	(31, ' Air Jordan 11 \'Legend Blue\'', 'A legendâs impact can be felt immediately and never fades. But that doesnât mean it comes around often. For the first time in a decade, the famed original blue AJ11 colorway is back in all its glory. MJ debuted this edition in that star-studded 1996 midseason exhibition, his first after making a riveting return to the league. The 11 stays dressed to impress, with its patent leather detailing remaining a shining symbol of iconic design. A carbon fiber plate and full-length Nike Air cushioning bring support, while that icy blue translucent outsole keeps your look clean.', 4000, 26, 1, '2024-12-16 20:16:22.694', 1, 1, 10),
	(32, 'Air Force 1 Low x Stash ', 'Legendary graffiti artist Stash returns for another stunning round with Nike, reviving his iconic 2006 AF-1 design. The updated retro style celebrates over 20 years of partnership between Nike and Stash, who was the first artist to officially put his spin on a Nike silhouetteâever. For this elevated edition, Stash mixes stitched and fused overlays to create a silky-smooth finish. The durable upper combines Soft Grey nubuck and textured Harbour Blue textiles, plus Varsity Royal and Midnight Navy accents. Custom insoles pop against the Pure Platinum lining, while Stash\'s signature handwork is embroidered on the tongue label.\r\n', 39000, 26, 1, '2024-12-16 21:14:20.972', 1, 1, 11),
	(33, 'PUMA x ONE PIECE Suede Blackbeard Teach', 'Inspired by Blackbeard, this pair features dark clouds to represent his power of darkness â plus maroon', 20290, 26, 3, '2024-12-17 10:32:29.081', 2, 1, 3),
	(34, 'Adidas Samba OG Sneaker', 'Since its founding in the 1950s, adidas has stood above all for quality and innovative product design. So it\'s no wonder that the sporting goods manufacturer is the market leader in this segment together with Nike. The three stripes that adorn the adidas corporate logo are legendary, but the characteristic brand symbol also has a high recognition value.\r\n', 19900, 26, 2, '2024-12-17 11:28:54.021', 2, 1, 13),
	(35, 'New Balance U740WM2', 'The name New Balance stands for quality. So it\'s no wonder that the brand can look back on a 100-year company history. Their slogan "a more intelligent approach to building shoes" describes the ethos of the company very aptly. New Balance sneakers are consistently designed for the best possible performance, but without disregarding the aesthetic aspect. ', 37900, 26, 4, '2024-12-17 11:34:34.11', 1, 1, 15),
	(36, 'Nike Cortez Textile', 'we\'ve revamped the original Cortez while maintaining the retro appeal you know and love. Now with a wider toe area and firmer side panels, you can comfortably wear them day in and day out. Plus, re-engineered textile helps prevent warping or creasing. Cortez fansâthis one\'s for you.', 42790, 26, 1, '2024-12-17 11:40:12.418', 2, 1, 17),
	(37, 'Nike Tech Hera', 'Inspired by early-2000s running, the Tech Hera is here to fulfil all of your chunky sneaker wishes. The wavy lifted midsole and suede accents level up your look while keeping you comfortable. Its durable design holds up beautifully to everyday wearâwhich is perfect, because you\'ll definitely want to wear these every day.', 43500, 26, 1, '2024-12-17 11:45:01.342', 4, 1, 8),
	(38, 'Adidas Coutblock', 'The history of adidas began somewhat earlier and more contemplatively: with the brothers Adi and Rudolf Dassler, who fulfilled their dream of independence with the "Dassler Schuhfabrik". After they decided to go their separate ways following a successful collaboration, Adi Dassler founded the adidas company.', 19500, 26, 2, '2024-12-17 11:51:51.318', 5, 1, 8),
	(39, 'Test Title', 'test description', 100, 27, 1, '2024-12-18 21:40:52.934', 2, 1, 11);

-- Dumping data for table stepflex.product_status: ~2 rows (approximately)
REPLACE INTO `product_status` (`id`, `name`) VALUES
	(1, 'active'),
	(2, 'deactivate');

-- Dumping data for table stepflex.province: ~9 rows (approximately)
REPLACE INTO `province` (`id`, `name`) VALUES
	(1, 'Northern'),
	(2, 'North Western'),
	(3, 'Western'),
	(4, 'North Central'),
	(5, 'Central'),
	(6, 'Sabaragamuwa'),
	(7, 'Eastern'),
	(8, 'Uva'),
	(9, 'Southern');

-- Dumping data for table stepflex.size: ~30 rows (approximately)
REPLACE INTO `size` (`id`, `name`, `category_id`) VALUES
	(1, '15', 3),
	(2, '16', 3),
	(3, '17', 3),
	(4, '18', 3),
	(5, '19', 3),
	(6, '35', 2),
	(7, '36', 2),
	(8, '37', 2),
	(9, '40', 1),
	(10, '41', 1),
	(11, '42', 1),
	(12, '43', 1),
	(13, '44', 1),
	(14, '45', 1),
	(15, '46', 1),
	(16, '47', 1),
	(17, '38', 2),
	(18, '39', 2),
	(19, '40', 2),
	(20, '41', 2),
	(21, '42', 2),
	(22, '43', 2),
	(23, '20', 3),
	(24, '21', 3),
	(25, '22', 3),
	(26, '23', 3),
	(27, '24', 3),
	(28, '25', 3),
	(29, '26', 3),
	(30, '27', 3);

-- Dumping data for table stepflex.storage: ~0 rows (approximately)

-- Dumping data for table stepflex.user: ~4 rows (approximately)
REPLACE INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `status`) VALUES
	(6, 'Tharidu', 'Perera', 'tharidu022@gmail.com', 'Clever@02', 'verified'),
	(8, 'Thidas', 'Wickramarachchi', 'wthidas01@gmail.com', 'Thidasc@02', 'verified'),
	(26, 'Saman', 'Silva', 'wthidas95@gmail.com', 'Saman@02', 'verified'),
	(27, 'Tharidu', 'Silva', 'wthidas02@gmail.com', 'Thidasc@02', 'verified');

-- Dumping data for table stepflex.verification_code: ~4 rows (approximately)
REPLACE INTO `verification_code` (`id`, `code`, `expire_time`, `user_id`, `purpose`) VALUES
	(1, 'done', 'no_expire', 6, 'email_verification'),
	(3, 'done', 'no_expire', 8, 'email_verification'),
	(4, 'done', 'no_expire', 26, 'email_verification'),
	(5, 'done', 'no_expire', 27, 'email_verification');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
