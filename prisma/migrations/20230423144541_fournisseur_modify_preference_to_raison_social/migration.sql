/*
  Warnings:

  - You are about to drop the column `specialite` on the `Fournisseur` table. All the data in the column will be lost.
  - Added the required column `raison_social` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fournisseur" DROP COLUMN "specialite",
ADD COLUMN     "raison_social" TEXT NOT NULL;
