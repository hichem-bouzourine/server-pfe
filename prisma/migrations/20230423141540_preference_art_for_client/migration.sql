/*
  Warnings:

  - Added the required column `preference_art` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "preference_art",
ADD COLUMN     "preference_art" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_preference_art_fkey" FOREIGN KEY ("preference_art") REFERENCES "Categorie"("id_categorie") ON DELETE CASCADE ON UPDATE CASCADE;
