-- AlterTable
ALTER TABLE "SignalementAvis" ADD COLUMN     "date_resultat" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SignalementOeuvre" ADD COLUMN     "date_resultat" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SignalementProfil" ADD COLUMN     "date_resultat" TIMESTAMP(3);

-- DropEnum
DROP TYPE "Resultat_signalement";
