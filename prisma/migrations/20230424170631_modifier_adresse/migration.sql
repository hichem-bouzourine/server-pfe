/*
  Warnings:

  - You are about to drop the column `id_Daira` on the `Adresse` table. All the data in the column will be lost.
  - You are about to drop the column `id_Wilaya` on the `Adresse` table. All the data in the column will be lost.
  - Added the required column `id_daira` to the `Commune` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_wilaya` to the `Daira` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adresse" DROP CONSTRAINT "Adresse_id_Daira_fkey";

-- DropForeignKey
ALTER TABLE "Adresse" DROP CONSTRAINT "Adresse_id_Wilaya_fkey";

-- AlterTable
ALTER TABLE "Adresse" DROP COLUMN "id_Daira",
DROP COLUMN "id_Wilaya";

-- AlterTable
ALTER TABLE "Commune" ADD COLUMN     "code_postal" INTEGER,
ADD COLUMN     "id_daira" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Daira" ADD COLUMN     "id_wilaya" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Daira" ADD CONSTRAINT "Daira_id_wilaya_fkey" FOREIGN KEY ("id_wilaya") REFERENCES "Wilaya"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commune" ADD CONSTRAINT "Commune_id_daira_fkey" FOREIGN KEY ("id_daira") REFERENCES "Daira"("id") ON DELETE CASCADE ON UPDATE CASCADE;
