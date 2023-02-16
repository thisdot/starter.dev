/*
  Warnings:

  - You are about to drop the column `name` on the `technology` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[displayName]` on the table `technology` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `technology` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `technology_name_key` ON `technology`;

-- AlterTable
ALTER TABLE `technology` DROP COLUMN `name`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `displayName` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `technology_displayName_key` ON `technology`(`displayName`);
