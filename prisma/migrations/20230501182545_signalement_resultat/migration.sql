-- CreateEnum
CREATE TYPE "Resultat_signalement" AS ENUM ('ACCEPTE', 'REFUSE', 'NON_TRAITE');

-- DropForeignKey
ALTER TABLE "SignalementAvis" DROP CONSTRAINT "SignalementAvis_id_admin_fkey";

-- DropForeignKey
ALTER TABLE "SignalementAvis" DROP CONSTRAINT "SignalementAvis_id_avis_fkey";

-- DropForeignKey
ALTER TABLE "SignalementAvis" DROP CONSTRAINT "SignalementAvis_id_client_fkey";

-- DropForeignKey
ALTER TABLE "SignalementOeuvre" DROP CONSTRAINT "SignalementOeuvre_id_admin_fkey";

-- DropForeignKey
ALTER TABLE "SignalementOeuvre" DROP CONSTRAINT "SignalementOeuvre_id_client_fkey";

-- DropForeignKey
ALTER TABLE "SignalementOeuvre" DROP CONSTRAINT "SignalementOeuvre_id_oeuvre_fkey";

-- DropForeignKey
ALTER TABLE "SignalementProfil" DROP CONSTRAINT "SignalementProfil_id_admin_fkey";

-- DropForeignKey
ALTER TABLE "SignalementProfil" DROP CONSTRAINT "SignalementProfil_id_rapporteur_fkey";

-- DropForeignKey
ALTER TABLE "SignalementProfil" DROP CONSTRAINT "SignalementProfil_id_signale_fkey";

-- AlterTable
ALTER TABLE "SignalementAvis" ADD COLUMN     "resultat" BOOLEAN;

-- AlterTable
ALTER TABLE "SignalementOeuvre" ADD COLUMN     "resultat" BOOLEAN;

-- AlterTable
ALTER TABLE "SignalementProfil" ADD COLUMN     "resultat" BOOLEAN;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_signale_fkey" FOREIGN KEY ("id_signale") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_rapporteur_fkey" FOREIGN KEY ("id_rapporteur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Administrateur"("id_admin") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementOeuvre" ADD CONSTRAINT "SignalementOeuvre_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementOeuvre" ADD CONSTRAINT "SignalementOeuvre_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementOeuvre" ADD CONSTRAINT "SignalementOeuvre_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Administrateur"("id_admin") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementAvis" ADD CONSTRAINT "SignalementAvis_id_avis_fkey" FOREIGN KEY ("id_avis") REFERENCES "Avis"("id_avis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementAvis" ADD CONSTRAINT "SignalementAvis_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementAvis" ADD CONSTRAINT "SignalementAvis_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Administrateur"("id_admin") ON DELETE SET NULL ON UPDATE CASCADE;
