-- DropForeignKey
ALTER TABLE "SignalementProfil" DROP CONSTRAINT "SignalementProfil_id_signale_fkey";

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_signale_fkey" FOREIGN KEY ("id_signale") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE NO ACTION ON UPDATE CASCADE;
