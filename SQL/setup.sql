DROP DATABASE IF EXISTS pickup;

CREATE DATABASE pickup;

USE pickup;

CREATE TABLE user(
name VARCHAR(100),
id INT auto_increment PRIMARY KEY,
salt VARCHAR(256),
hash VARCHAR(64),
email VARCHAR(100)
);

CREATE TABLE login(
login DATETIME,
username VARCHAR(100),
PRIMARY KEY(login, username)
);

CREATE TABLE session(
username VARCHAR(100),
sessionKey VARCHAR(256)
);

CREATE TABLE friend(
friender VARCHAR(100),
friendee VARCHAR(100),
PRIMARY KEY(friender, friendee)
);

CREATE TABLE sportPreference(
username VARCHAR(100),
sport VARCHAR(100),
PRIMARY KEY(username, sport)
);

CREATE TABLE game(
id INT PRIMARY KEY auto_increment,
sport VARCHAR(100),
time TIME,
date DATE,
playerCount INT,
location VARCHAR(100),
full TINYINT
);

CREATE TABLE enlist(
playerName VARCHAR(100),
gameID INT,
PRIMARY KEY(playerName, gameID)
);
