/*
  Warnings:

  - You are about to drop the `Fourniture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_fourniture_fkey";

-- DropForeignKey
ALTER TABLE "PublicationFourniture" DROP CONSTRAINT "PublicationFourniture_id_fourniture_fkey";

-- DropTable
DROP TABLE "Fourniture";

-- CreateTable
CREATE TABLE "CategorieFourniture" (
    "id_fourniture" SERIAL NOT NULL,
    "nom_fourniture" TEXT NOT NULL,
    "photo" TEXT[],

    CONSTRAINT "CategorieFourniture_pkey" PRIMARY KEY ("id_fourniture")
);

-- AddForeignKey
ALTER TABLE "PublicationFourniture" ADD CONSTRAINT "PublicationFourniture_id_fourniture_fkey" FOREIGN KEY ("id_fourniture") REFERENCES "CategorieFourniture"("id_fourniture") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_fourniture_fkey" FOREIGN KEY ("id_fourniture") REFERENCES "CategorieFourniture"("id_fourniture") ON DELETE CASCADE ON UPDATE CASCADE;
