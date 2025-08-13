/*
  Warnings:

  - You are about to drop the column `weight` on the `Pet` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "WeightLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "petId" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WeightLog_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "gender" TEXT,
    "birthday" DATETIME NOT NULL,
    "image" TEXT,
    "goal" TEXT,
    "neutered" BOOLEAN,
    "activityLevel" INTEGER,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("activityLevel", "birthday", "breed", "createdAt", "gender", "goal", "id", "image", "name", "neutered", "ownerId", "updatedAt") SELECT "activityLevel", "birthday", "breed", "createdAt", "gender", "goal", "id", "image", "name", "neutered", "ownerId", "updatedAt" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
