-- Create Database
CREATE DATABASE IF NOT EXISTS community_db;
USE community_db;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    age INT,
    company VARCHAR(255),
    country VARCHAR(100),
    image TEXT
);

-- Insert Realistic Sample Records
INSERT INTO users (firstName, lastName, email, phone, age, company, country, image) VALUES
('Sarah', 'Johnson', 'sarah.j@future.io', '+1 555-0101', 28, 'Future Collective', 'USA', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'),
('Marcus', 'Chen', 'm.chen@techhub.com', '+65 9123-4567', 34, 'TechHub Solutions', 'Singapore', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'),
('Elena', 'Rodriguez', 'elena.rod@creative.es', '+34 912-345-678', 31, 'Studio Creative', 'Spain', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'),
('Kofi', 'Arhin', 'kofi.ar@insight.gh', '+233 24-123-4567', 29, 'Insight Data', 'Ghana', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi'),
('Yuki', 'Tanaka', 'y.tanaka@zen.jp', '+81 90-1234-5678', 42, 'Zen Architecture', 'Japan', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki'),
('Aria', 'Voss', 'aria.v@research.de', '+49 30 123456', 27, 'Max Planck Institute', 'Germany', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria'),
('Leo', 'Silva', 'leo.s@dev.br', '+55 11 91234-5678', 33, 'Digital Nomad', 'Brazil', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo'),
('Chloe', 'Dupont', 'chloe.d@fashion.fr', '+33 1 23 45 67 89', 26, 'Parisian Style', 'France', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe'),
('Amir', 'Khan', 'amir.k@build.in', '+91 98765-43210', 38, 'BuildRight India', 'India', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amir'),
('Olivia', 'Smith', 'olivia.s@media.au', '+61 2 1234 5678', 30, 'Skyline Media', 'Australia', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia');
