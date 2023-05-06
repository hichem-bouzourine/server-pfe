/*
  Warnings:

  - The primary key for the `Sauvegarde` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_client` on the `Sauvegarde` table. All the data in the column will be lost.
  - Added the required column `id_utilisateur` to the `Sauvegarde` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sauvegarde" DROP CONSTRAINT "Sauvegarde_id_client_fkey";

-- AlterTable
ALTER TABLE "Sauvegarde" DROP CONSTRAINT "Sauvegarde_pkey",
DROP COLUMN "id_client",
ADD COLUMN     "id_utilisateur" INTEGER NOT NULL,
ADD CONSTRAINT "Sauvegarde_pkey" PRIMARY KEY ("id_utilisateur", "id_oeuvre");

-- AddForeignKey
ALTER TABLE "Sauvegarde" ADD CONSTRAINT "Sauvegarde_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;
