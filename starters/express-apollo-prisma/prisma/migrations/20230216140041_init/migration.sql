-- CreateTable
CREATE TABLE `technology` (
    `description` VARCHAR(191) NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NULL,

    UNIQUE INDEX `technology_displayName_key`(`displayName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
