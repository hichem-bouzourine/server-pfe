/*
  Warnings:

  - You are about to drop the column `id_artisan` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `id_client` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `id_user1` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user2` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_id_artisan_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_id_client_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "id_artisan",
DROP COLUMN "id_client",
ADD COLUMN     "id_user1" INTEGER NOT NULL,
ADD COLUMN     "id_user2" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_id_user1_fkey" FOREIGN KEY ("id_user1") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_id_user2_fkey" FOREIGN KEY ("id_user2") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;
