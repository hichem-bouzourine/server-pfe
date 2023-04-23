-- CreateTable
CREATE TABLE "Materiau" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Materiau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technique" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Technique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtiliseMateriau" (
    "id_oeuvre" INTEGER NOT NULL,
    "id_materiau" INTEGER NOT NULL,

    CONSTRAINT "UtiliseMateriau_pkey" PRIMARY KEY ("id_materiau","id_oeuvre")
);

-- CreateTable
CREATE TABLE "UtiliseTechnique" (
    "id_oeuvre" INTEGER NOT NULL,
    "id_technique" INTEGER NOT NULL,

    CONSTRAINT "UtiliseTechnique_pkey" PRIMARY KEY ("id_technique","id_oeuvre")
);

-- AddForeignKey
ALTER TABLE "UtiliseMateriau" ADD CONSTRAINT "UtiliseMateriau_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtiliseMateriau" ADD CONSTRAINT "UtiliseMateriau_id_materiau_fkey" FOREIGN KEY ("id_materiau") REFERENCES "Materiau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtiliseTechnique" ADD CONSTRAINT "UtiliseTechnique_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtiliseTechnique" ADD CONSTRAINT "UtiliseTechnique_id_technique_fkey" FOREIGN KEY ("id_technique") REFERENCES "Technique"("id") ON DELETE CASCADE ON UPDATE CASCADE;
