--for database
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

--for products table
CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT (10) NOT NULL
);

ALTER TABLE products
ADD COLUMN product_sales DECIMAL(10,2);

--for departments table
CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(255) NOT NULL,
overhead_cost DECIMAL(10,2) NOT NULL
);

ALTER TABLE departments AUTO_INCREMENT = 1000;