/*
  Warnings:

  - Changed the type of `specialite` on the `Artisan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Artisan" DROP COLUMN "specialite",
ADD COLUMN     "specialite" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_specialite_fkey" FOREIGN KEY ("specialite") REFERENCES "Categorie"("id_categorie") ON DELETE CASCADE ON UPDATE CASCADE;
