/*
  Warnings:

  - You are about to drop the column `id_fournisseur` on the `Fourniture` table. All the data in the column will be lost.
  - You are about to drop the column `prix_fourniture` on the `Fourniture` table. All the data in the column will be lost.
  - You are about to drop the column `stock_disponible` on the `Fourniture` table. All the data in the column will be lost.
  - You are about to drop the `CommandeFourniture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommandeFourniture" DROP CONSTRAINT "CommandeFourniture_id_commande_fkey";

-- DropForeignKey
ALTER TABLE "CommandeFourniture" DROP CONSTRAINT "CommandeFourniture_id_fourniture_fkey";

-- DropForeignKey
ALTER TABLE "Fourniture" DROP CONSTRAINT "Fourniture_id_fournisseur_fkey";

-- AlterTable
ALTER TABLE "Fourniture" DROP COLUMN "id_fournisseur",
DROP COLUMN "prix_fourniture",
DROP COLUMN "stock_disponible";

-- DropTable
DROP TABLE "CommandeFourniture";

-- CreateTable
CREATE TABLE "PublicationFourniture" (
    "id_fournisseur" INTEGER NOT NULL,
    "id_fourniture" INTEGER NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "PublicationFourniture_pkey" PRIMARY KEY ("id_fournisseur","id_fourniture")
);

-- AddForeignKey
ALTER TABLE "PublicationFourniture" ADD CONSTRAINT "PublicationFourniture_id_fournisseur_fkey" FOREIGN KEY ("id_fournisseur") REFERENCES "Fournisseur"("id_fournisseur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationFourniture" ADD CONSTRAINT "PublicationFourniture_id_fourniture_fkey" FOREIGN KEY ("id_fourniture") REFERENCES "Fourniture"("id_fourniture") ON DELETE CASCADE ON UPDATE CASCADE;
