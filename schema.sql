-- Database Schema for PixelA2 Control Panel
-- Matches frontend TypeScript interfaces

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Users Table (Admin, Tecnico, Ventas)
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Tecnico', 'Ventas') DEFAULT 'Tecnico',
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Clients Table
DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),