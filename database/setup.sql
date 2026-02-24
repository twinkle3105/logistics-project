-- Database setup script for Logistics Management System
-- This script creates the database and user (optional)

-- Create database
CREATE DATABASE IF NOT EXISTS logistics_db;

-- Use the database
USE logistics_db;

-- Optional: Create a dedicated user for the application
-- Uncomment the following lines if you want to create a dedicated user
-- CREATE USER IF NOT EXISTS 'logistics_user'@'localhost' IDENTIFIED BY 'logistics_password';
-- GRANT ALL PRIVILEGES ON logistics_db.* TO 'logistics_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Note: The application will automatically create the required tables
-- using Spring Boot's JPA auto-ddl feature when it first runs.
-- Tables that will be created:
-- - customers
-- - drivers  
-- - vehicles
-- - shipments
