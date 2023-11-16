CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT DEFAULT NULL,
    PRIMARY KEY (id)
);

DESCRIBE employee;

INSERT INTO employee (name, salary) 
VALUES 
    ("Henry", 1000),
    ("Lucas", 1200),
    ("Winter", 1500),
    ("Ketsy", 3400);

SELECT * FROM employee;