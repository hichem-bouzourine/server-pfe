/*
  Warnings:

  - You are about to drop the column `adresse` on the `Utilisateur` table. All the data in the column will be lost.
  - You are about to drop the column `ville` on the `Utilisateur` table. All the data in the column will be lost.
  - Changed the type of `adresse_livraison` on the `Commande` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `id_adresse` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commande" DROP COLUMN "adresse_livraison",
ADD COLUMN     "adresse_livraison" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Utilisateur" DROP COLUMN "adresse",
DROP COLUMN "ville",
ADD COLUMN     "id_adresse" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Wilaya" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Wilaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Daira" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Daira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commune" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Commune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adresse" (
    "id" SERIAL NOT NULL,
    "Rue" TEXT NOT NULL,
    "id_Wilaya" INTEGER NOT NULL,
    "id_Daira" INTEGER NOT NULL,
    "id_Commune" INTEGER NOT NULL,

    CONSTRAINT "Adresse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_id_adresse_fkey" FOREIGN KEY ("id_adresse") REFERENCES "Adresse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_id_Wilaya_fkey" FOREIGN KEY ("id_Wilaya") REFERENCES "Wilaya"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_id_Daira_fkey" FOREIGN KEY ("id_Daira") REFERENCES "Daira"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_id_Commune_fkey" FOREIGN KEY ("id_Commune") REFERENCES "Commune"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_adresse_livraison_fkey" FOREIGN KEY ("adresse_livraison") REFERENCES "Adresse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
