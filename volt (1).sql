-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2026 at 01:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `volt`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `program_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_date` datetime NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'upcoming',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coaches`
--

CREATE TABLE `coaches` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `specialty` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', 'This is a test message from Contact VOLT.', 0, '2026-09-15 19:27:58', '2026-09-15 19:27:58'),
(2, 'Test User', 'test@example.com', 'This is a test message from Contact VOLT.', 0, '2026-09-15 19:29:47', '2026-09-15 19:29:47'),
(3, 'ملك', 'maloka.mo500@gmail.com', 'هاااي', 0, '2026-09-15 19:33:59', '2026-09-15 19:33:59'),
(4, 'Malak', 'maloka.mo500@gmail.com', 'هاااي', 0, '2026-09-15 20:11:11', '2026-09-15 20:11:11'),
(5, 'Malak', 'maloka.mo500@gmail.com', 'هاي', 0, '2026-09-15 20:26:41', '2026-09-15 20:26:41'),
(6, 'malak', 'malokahelmy7@gmail.com', 'hi', 0, '2026-09-16 08:12:31', '2026-09-16 08:12:31'),
(7, 'Malak', 'maloka.mo500@gmail.com', 'hiii', 0, '2026-09-16 08:13:42', '2026-09-16 08:13:42');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_09_12_132607_create_personal_access_tokens_table', 2),
(5, '2026_09_13_100108_add_role_to_users_table', 3),
(6, '2026_09_13_101518_add_role_to_users_table', 4),
(7, '2026_09_14_000001_create_subscriptions_table', 5),
(8, '2026_09_14_000002_create_coaches_table', 5),
(9, '2026_09_14_000003_create_programs_table', 5),
(10, '2026_09_14_000004_create_bookings_table', 5),
(11, '2026_09_15_151343_add_phone_and_avatar_to_users_table', 6),
(12, '2026_09_15_171804_add_google_id_to_users_table', 7),
(13, '2026_09_15_190226_create_reviews_table', 8),
(14, '2026_09_15_212451_create_contact_messages_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '125963861c2359fc4948db9e4c4508e0859ed19452291011d6ae5a04e33586f8', '[\"*\"]', NULL, NULL, '2026-09-12 10:53:50', '2026-09-12 10:53:50'),
(2, 'App\\Models\\User', 1, 'auth_token', 'd9c48430cc8cd081ea941cb3fd7f1a7b74f7d99e582a3ebd3e4dfb7396d75828', '[\"*\"]', '2026-09-12 10:59:11', NULL, '2026-09-12 10:55:09', '2026-09-12 10:59:11'),
(3, 'App\\Models\\User', 2, 'auth_token', 'd84f2c6f1b6e4e3b9c21e9cffd3a507fbaf93a989fdeb8433c42f7aef58eb930', '[\"*\"]', NULL, NULL, '2026-09-12 11:29:15', '2026-09-12 11:29:15'),
(4, 'App\\Models\\User', 3, 'auth_token', '11cc13d7d1f66338ed935296e9cd6d34c8dd33afba9ea9cafee0ff18eafb073b', '[\"*\"]', NULL, NULL, '2026-09-12 11:33:11', '2026-09-12 11:33:11'),
(5, 'App\\Models\\User', 2, 'auth_token', 'db696e8d3aef1605dc7bc1e7a3223fa39ec739c8802fafbefde47d5174be2262', '[\"*\"]', NULL, NULL, '2026-09-12 11:39:10', '2026-09-12 11:39:10'),
(6, 'App\\Models\\User', 2, 'auth_token', 'fd9f62775c721773057863f066325aa7f73eb21a4bf04c49d77ca8d5b5b2e8fb', '[\"*\"]', NULL, NULL, '2026-09-12 14:02:24', '2026-09-12 14:02:24'),
(7, 'App\\Models\\User', 2, 'auth_token', 'fed7e9a44052349b753f19ea422c187bac429ca5e9c6a4e41307b09cc77f2094', '[\"*\"]', NULL, NULL, '2026-09-12 16:06:30', '2026-09-12 16:06:30'),
(8, 'App\\Models\\User', 2, 'auth_token', 'c41fcbc712963780cd800f6fea6050c684f7bcafc8adc5b6ba30e8ae5eb4003f', '[\"*\"]', NULL, NULL, '2026-09-13 07:38:09', '2026-09-13 07:38:09'),
(9, 'App\\Models\\User', 2, 'auth_token', '628135fc2c6b764f70a20d65b969859ee50f392afd43de0657bce8ad419a362d', '[\"*\"]', NULL, NULL, '2026-09-13 08:48:03', '2026-09-13 08:48:03'),
(10, 'App\\Models\\User', 2, 'auth_token', 'e6718d8bcacac3c8a36293187cbdcfa70acc58e05c920213da219c57f542e586', '[\"*\"]', NULL, NULL, '2026-09-13 09:05:31', '2026-09-13 09:05:31'),
(11, 'App\\Models\\User', 2, 'auth_token', '2dc63e42cdf12d0256ec7e4b779943ac6815cc860c17c28f1f9f650ce99f4e39', '[\"*\"]', NULL, NULL, '2026-09-13 09:18:10', '2026-09-13 09:18:10'),
(12, 'App\\Models\\User', 2, 'auth_token', 'f467aa9f5bf986250872dcdf0ebcc49fd1026c9b0937a857cccda9e2d92dd5e0', '[\"*\"]', NULL, NULL, '2026-09-15 12:39:04', '2026-09-15 12:39:04'),
(13, 'App\\Models\\User', 2, 'auth_token', '9aa08ca90918d892f66d881fdc23a2a2ee9d95517fe5d0a3d5b015d77ae9feb3', '[\"*\"]', NULL, NULL, '2026-09-15 13:03:59', '2026-09-15 13:03:59'),
(14, 'App\\Models\\User', 2, 'auth_token', '975a6e12c6da67422ed1d9102b5de915c9c7ec9abc6b0d13166da7f15cbc4c5c', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:02', '2026-09-15 13:04:02'),
(15, 'App\\Models\\User', 2, 'auth_token', '60ae34e63d6fc5df7a81b76b6473a77672e54ef9a7641c149c6effb1d1c88b45', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:03', '2026-09-15 13:04:03'),
(16, 'App\\Models\\User', 2, 'auth_token', '9d8af612cba41de927a4ada00489f5834b85110e3245db7c6e438f0c514470e5', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:04', '2026-09-15 13:04:04'),
(17, 'App\\Models\\User', 2, 'auth_token', '211c34c306570824b1325328d983c2a75ac385d1b4eb2c2293ee16b01ee14f12', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:05', '2026-09-15 13:04:05'),
(18, 'App\\Models\\User', 2, 'auth_token', '737e006da408b79f14ae0ad0c57b57a949d58040bb598c8f0441147474b819aa', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:06', '2026-09-15 13:04:06'),
(19, 'App\\Models\\User', 2, 'auth_token', 'fba3774eb38c798a39c52fa450edd3da48f2c9315abaeccf05f0ddd83d84f1c2', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:07', '2026-09-15 13:04:07'),
(20, 'App\\Models\\User', 2, 'auth_token', 'ff26e73debac936e0386bfce8614e0b0ff62c67bf2709cade7781ac0217ef4ef', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:08', '2026-09-15 13:04:08'),
(21, 'App\\Models\\User', 2, 'auth_token', '60143d4e5c594b21513ecc58306d5ec030331ba8ab1fed662d72e3354143318b', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:09', '2026-09-15 13:04:09'),
(22, 'App\\Models\\User', 2, 'auth_token', 'bc0d7070d2e4b5bd7dc01f91b45bea7e78e44958ce28cf6e7d91992456ef2040', '[\"*\"]', NULL, NULL, '2026-09-15 13:04:11', '2026-09-15 13:04:11'),
(23, 'App\\Models\\User', 2, 'auth_token', '0ecc73d7da6a86bbef0387342d6a12176e613bc62f804d158546672536abd3f0', '[\"*\"]', '2026-09-15 13:20:18', NULL, '2026-09-15 13:04:12', '2026-09-15 13:20:18'),
(24, 'App\\Models\\User', 2, 'auth_token', '51e6d86f99afe3d8f75a6405669cdb57029c0120cb191885ae30f7d98b7dded7', '[\"*\"]', NULL, NULL, '2026-09-15 13:21:38', '2026-09-15 13:21:38'),
(25, 'App\\Models\\User', 2, 'auth_token', 'd68d270dd2c8bd6c842f35252790423002be9c613e9b4e02aa820691c5c91010', '[\"*\"]', NULL, NULL, '2026-09-15 14:54:30', '2026-09-15 14:54:30'),
(26, 'App\\Models\\User', 2, 'auth_token', '1720e97c8202cf0318f4a2b5b6503145fbb4fde906ca78a3d6d076bc3522a5c6', '[\"*\"]', '2026-09-15 15:58:17', NULL, '2026-09-15 15:57:19', '2026-09-15 15:58:17'),
(27, 'App\\Models\\User', 2, 'auth_token', '569180cff9a35c66550e6f33d0f9b0f73924965c2e8f35e2579bf6201e290591', '[\"*\"]', '2026-09-16 08:29:33', NULL, '2026-09-15 16:31:57', '2026-09-16 08:29:33');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL DEFAULT 'Intermediate',
  `weeks` tinyint(3) UNSIGNED NOT NULL DEFAULT 8,
  `sessions_per_week` tinyint(3) UNSIGNED NOT NULL DEFAULT 3,
  `intensity` decimal(3,1) NOT NULL DEFAULT 8.0,
  `coach_id` bigint(20) UNSIGNED DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `review` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('dQmJ2EOhSgaDTYCBQO4TzUhys4RCKxzCBn4Hn4sf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmNxRHFMS0sxTUF0WHE4ak53bWFIWEFQRUtlR29STmtFVjdUcDFjTSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789557056),
('fn7kYz8Y93UzyIzaS5nwjlSDZR0baGzHKal6EVj3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoickVZakRrY28xTTA0Q0htNG1WMDFmSFk4eVVHRXlVOEZ5aUs2NTN1ZSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789498194),
('Kyxdqe3BlMJA1WYHUrObwBjzpuDYtDGNIL6dDb4p', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiakkwVTJncm11Qld4RzdPbnZ1UFRzVDJFZVZFdGtnS3h1QWVTNWpLdSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789377309),
('KZUZZWLAppYORoXszcTuHoaoXfs79Sqo0RCiXkE0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTTlTcjcyQUxUeHRlZnVxUzZrNDBLNG5NMnM1bDN1ak5yb3VlTFI2SiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789483484),
('PUntL1kX2pldSlMQBXPBdGledCof0yyZaMqGK8LN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia1FsamdSWGpUYzVuODFheHYyOExOcWJ5QzgxRnpFdWlHOUlvTFkyaCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789302388),
('yCfaKYnQrhXVmsFjSX90KkLo2GyXZ26fA8FPE3U7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVms1UDZrbUZZazhLdWQ0cGVHeGVKSTcwdFBOeVRQQ3Zxelo2RGtEZSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789517064);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `plan_name` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `billing_cycle` varchar(255) NOT NULL DEFAULT 'monthly',
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `starts_at` date NOT NULL,
  `ends_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `name`, `email`, `phone`, `avatar`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Malak', 'malak@test.com', NULL, NULL, NULL, '$2y$12$cQB8wAq5q5dAMdp8Elq/eORsPGo.OQfUjYrE5VCSjSJG.THU1/Azi', 'user', NULL, '2026-09-12 10:53:50', '2026-09-12 10:53:50'),
(2, NULL, 'Malak mohamed', 'maloka.mo500@gmail.com', NULL, NULL, NULL, '$2y$12$or35XEL4Cy3owQIJowxfl.0q.lz01hoqH9ZlIvjPUDIP45EsJKjCS', 'admin', NULL, '2026-09-12 11:29:15', '2026-09-13 07:32:06'),
(3, NULL, 'Malak mohamed', 'mohammedhelmy75@yahoo.com', NULL, NULL, NULL, '$2y$12$vE1Tmimt8pRcLxWGLMNUqOQVwOtp4pnawhZ4nWrEjBJK579UWe5z.', 'user', NULL, '2026-09-12 11:33:11', '2026-09-12 11:33:11'),
(4, NULL, 'Malak Mohamed', 'malakmohmmed771@gmail.com', NULL, NULL, NULL, NULL, 'user', NULL, '2026-09-15 15:09:36', '2026-09-15 15:09:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_user_id_foreign` (`user_id`),
  ADD KEY `bookings_program_id_foreign` (`program_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `coaches`
--
ALTER TABLE `coaches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `programs_coach_id_foreign` (`coach_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_google_id_unique` (`google_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coaches`
--
ALTER TABLE `coaches`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_program_id_foreign` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_coach_id_foreign` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
