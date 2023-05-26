/*
  Warnings:

  - You are about to drop the column `id_client` on the `Avis` table. All the data in the column will be lost.
  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_client` on the `Note` table. All the data in the column will be lost.
  - Added the required column `id_utilisateur` to the `Avis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_utilisateur` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Avis" DROP CONSTRAINT "Avis_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_id_client_fkey";

-- AlterTable
ALTER TABLE "Avis" DROP COLUMN "id_client",
ADD COLUMN     "id_utilisateur" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
DROP COLUMN "id_client",
ADD COLUMN     "id_utilisateur" INTEGER NOT NULL,
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("id_utilisateur", "id_oeuvre");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;
