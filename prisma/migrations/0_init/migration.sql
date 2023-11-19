-- CreateTable
CREATE TABLE `Connection` (
    `connectionId` VARCHAR(191) NOT NULL,
    `userIdOne` VARCHAR(191) NOT NULL,
    `userIdTwo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`connectionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConnectionLink` (
    `connectionId` VARCHAR(191) NOT NULL,
    `fromUserId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`connectionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

