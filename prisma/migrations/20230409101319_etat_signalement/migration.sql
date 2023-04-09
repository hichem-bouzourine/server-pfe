/*
  Warnings:

  - Added the required column `etatSignalement` to the `SignalementAvis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etatSignalement` to the `SignalementOeuvre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etatSignalement` to the `SignalementProfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SignalementAvis" ADD COLUMN     "etatSignalement" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "SignalementOeuvre" ADD COLUMN     "etatSignalement" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "SignalementProfil" ADD COLUMN     "etatSignalement" BOOLEAN NOT NULL;
