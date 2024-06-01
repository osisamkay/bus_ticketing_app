/*
  Warnings:

  - The primary key for the `Bus` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "seats" INTEGER NOT NULL
);
INSERT INTO "new_Bus" ("id", "name", "seats") SELECT "id", "name", "seats" FROM "Bus";
DROP TABLE "Bus";
ALTER TABLE "new_Bus" RENAME TO "Bus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
