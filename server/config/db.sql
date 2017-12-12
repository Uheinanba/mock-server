CREATE TABLE IF NOT EXISTS `Users` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT, 
  `username` VARCHAR(255), 
  `createdAt` DATETIME NOT NULL, 
  `updatedAt` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `Tasks` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT, 
  `title` VARCHAR(255), 
  `createdAt` DATETIME NOT NULL, 
  `updatedAt` DATETIME NOT NULL, 
  `UserId` INTEGER NOT NULL REFERENCES 
  `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);