-- DropForeignKey
ALTER TABLE "SignalementAvis" DROP CONSTRAINT "SignalementAvis_id_avis_fkey";

-- DropForeignKey
ALTER TABLE "SignalementAvis" DROP CONSTRAINT "SignalementAvis_id_client_fkey";

-- DropForeignKey
ALTER TABLE "SignalementOeuvre" DROP CONSTRAINT "SignalementOeuvre_id_client_fkey";

-- DropForeignKey
ALTER TABLE "SignalementOeuvre" DROP CONSTRAINT "SignalementOeuvre_id_oeuvre_fkey";

-- DropForeignKey
ALTER TABLE "SignalementProfil" DROP CONSTRAINT "SignalementProfil_id_signale_fkey";

-- AlterTable
ALTER TABLE "SignalementAvis" ALTER COLUMN "id_avis" DROP NOT NULL,
ALTER COLUMN "id_client" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SignalementOeuvre" ALTER COLUMN "id_oeuvre" DROP NOT NULL,
ALTER COLUMN "id_client" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_signale_fkey" FOREIGN KEY ("id_signale") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementOeuvre" ADD CONSTRAINT "SignalementOeuvre_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementOeuvre" ADD CONSTRAINT "SignalementOeuvre_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementAvis" ADD CONSTRAINT "SignalementAvis_id_avis_fkey" FOREIGN KEY ("id_avis") REFERENCES "Avis"("id_avis") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementAvis" ADD CONSTRAINT "SignalementAvis_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE SET NULL ON UPDATE CASCADE;
