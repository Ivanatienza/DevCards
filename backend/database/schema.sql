CREATE DATABASE IF NOT EXISTS devcards CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/*Nombre de la base de datos*/
USE devcards;

/*Tabla donde se almacena la información de los usuarios*/
CREATE TABLE IF NOT EXISTS users(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user',
    avatar_url VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/*Tabla que almacena la información de las cards con referencia a la tabla usuarios*/
CREATE TABLE IF NOT EXISTS cards(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    logo_url VARCHAR(255) DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    documentation_url VARCHAR(255) NOT NULL,
    is_public TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

/*Tabla que guarda las etiquetas de las cards*/
CREATE TABLE IF NOT EXISTS tags(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

/*Tabla que guarda las etiquetas asignadas a las cards y hace referencia a las tablas de cards y etiquetas*/
CREATE TABLE IF NOT EXISTS card_tags(
    card_id INT UNSIGNED,
    tag_id INT UNSIGNED,
    PRIMARY KEY (card_id, tag_id),
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE
);

/*Tabla que guarda las preferencias del usuario y hace referencia a la tabla usuarios*/
CREATE TABLE IF NOT EXISTS settings(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL UNIQUE,
    theme ENUM('light', 'dark') DEFAULT 'light',
    language ENUM('es', 'en') DEFAULT 'es',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);