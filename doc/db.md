1. 数据库表

CREATE TABLE IF NOT EXISTS `app_mocks` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `data` VARCHAR(255),
  `name` VARCHAR(255),
  `type` TEXT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);