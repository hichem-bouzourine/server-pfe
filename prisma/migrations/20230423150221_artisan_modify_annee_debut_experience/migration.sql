/*
  Warnings:

  - You are about to drop the column `annee_experience` on the `Artisan` table. All the data in the column will be lost.
  - Added the required column `annee_debut_experience` to the `Artisan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artisan" DROP COLUMN "annee_experience",
ADD COLUMN     "annee_debut_experience" INTEGER NOT NULL;
