-- DropForeignKey
ALTER TABLE "SignalementProfil" DROP CONSTRAINT "SignalementProfil_id_rapporteur_fkey";

-- DropForeignKey
ALTER TABLE "SignalementProfil" DROP CONSTRAINT "SignalementProfil_id_signale_fkey";

-- AlterTable
ALTER TABLE "SignalementProfil" ALTER COLUMN "id_signale" DROP NOT NULL,
ALTER COLUMN "id_rapporteur" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_signale_fkey" FOREIGN KEY ("id_signale") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_rapporteur_fkey" FOREIGN KEY ("id_rapporteur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;
