-- CreateEnum
CREATE TYPE "Type_User" AS ENUM ('ADMIN', 'ARTISAN', 'CLIENT', 'FOURNISSEUR');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "date_de_naissance" TIMESTAMP(3) NOT NULL,
    "sexe" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "type" "Type_User" NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photo" TEXT,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "Administrateur" (
    "id_admin" INTEGER NOT NULL,

    CONSTRAINT "Administrateur_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Artisan" (
    "id_artisan" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "annee_experience" INTEGER NOT NULL,
    "specialite" TEXT NOT NULL,
    "statutCompte" BOOLEAN NOT NULL,

    CONSTRAINT "Artisan_pkey" PRIMARY KEY ("id_artisan")
);

-- CreateTable
CREATE TABLE "Client" (
    "id_client" INTEGER NOT NULL,
    "preference_art" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id_client")
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id_fournisseur" INTEGER NOT NULL,
    "specialite" TEXT NOT NULL,
    "statutCompte" BOOLEAN NOT NULL,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id_fournisseur")
);

-- CreateTable
CREATE TABLE "Fourniture" (
    "id_fourniture" SERIAL NOT NULL,
    "nom_fourniture" TEXT NOT NULL,
    "prix_fourniture" DOUBLE PRECISION NOT NULL,
    "photo" TEXT[],
    "stock_disponible" INTEGER NOT NULL,
    "id_fournisseur" INTEGER NOT NULL,

    CONSTRAINT "Fourniture_pkey" PRIMARY KEY ("id_fourniture")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id_commande" SERIAL NOT NULL,
    "etat_commande" BOOLEAN NOT NULL,
    "date_commande" TIMESTAMP(3) NOT NULL,
    "quantite" INTEGER NOT NULL,
    "adresse_livraison" TEXT NOT NULL,
    "id_fourniture" INTEGER NOT NULL,
    "id_artisan" INTEGER NOT NULL,
    "id_fournisseur" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id_commande")
);

-- CreateTable
CREATE TABLE "CommandeFourniture" (
    "id_commande" INTEGER NOT NULL,
    "id_fourniture" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "CommandeFourniture_pkey" PRIMARY KEY ("id_commande","id_fourniture")
);

-- CreateTable
CREATE TABLE "Oeuvre" (
    "id_oeuvre" SERIAL NOT NULL,
    "titre_oeuvre" TEXT NOT NULL,
    "date_realisation" TIMESTAMP(3) NOT NULL,
    "contexte_realisation" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "techniques_et_materiaux" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "date_publication" TIMESTAMP(3) NOT NULL,
    "images_oeuvre" TEXT[],
    "id_categorie" INTEGER NOT NULL,
    "id_artisan" INTEGER NOT NULL,

    CONSTRAINT "Oeuvre_pkey" PRIMARY KEY ("id_oeuvre")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id_categorie" SERIAL NOT NULL,
    "nom_categorie" TEXT NOT NULL,
    "image_categorie" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id_categorie")
);

-- CreateTable
CREATE TABLE "Achat" (
    "id_achat" SERIAL NOT NULL,
    "etat_achat" TEXT NOT NULL,
    "date_achat" TIMESTAMP(3) NOT NULL,
    "id_oeuvre" INTEGER NOT NULL,
    "id_client" INTEGER NOT NULL,

    CONSTRAINT "Achat_pkey" PRIMARY KEY ("id_achat")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id_conversation" SERIAL NOT NULL,
    "id_client" INTEGER NOT NULL,
    "id_artisan" INTEGER NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id_conversation")
);

-- CreateTable
CREATE TABLE "Message" (
    "id_message" SERIAL NOT NULL,
    "date_message" TIMESTAMP(3) NOT NULL,
    "contenu" TEXT NOT NULL,
    "id_destinateur" INTEGER NOT NULL,
    "id_conversation" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id_message")
);

-- CreateTable
CREATE TABLE "Note" (
    "id_client" INTEGER NOT NULL,
    "id_oeuvre" INTEGER NOT NULL,
    "note" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id_client","id_oeuvre")
);

-- CreateTable
CREATE TABLE "Avis" (
    "id_avis" SERIAL NOT NULL,
    "id_client" INTEGER NOT NULL,
    "id_oeuvre" INTEGER NOT NULL,
    "contenu" TEXT NOT NULL,
    "date_avis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id_avis")
);

-- CreateTable
CREATE TABLE "Reponse" (
    "id_artisan" INTEGER NOT NULL,
    "id_avis" INTEGER NOT NULL,
    "contenu" TEXT NOT NULL,
    "date_reponse" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reponse_pkey" PRIMARY KEY ("id_artisan","id_avis")
);

-- CreateTable
CREATE TABLE "SignalementProfil" (
    "id_signalement" SERIAL NOT NULL,
    "raison" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_signale" INTEGER NOT NULL,
    "id_rapporteur" INTEGER NOT NULL,
    "id_admin" INTEGER,

    CONSTRAINT "SignalementProfil_pkey" PRIMARY KEY ("id_signalement")
);

-- CreateTable
CREATE TABLE "SignalementOeuvre" (
    "id_signalement" SERIAL NOT NULL,
    "raison" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_oeuvre" INTEGER NOT NULL,
    "id_client" INTEGER NOT NULL,
    "id_admin" INTEGER,

    CONSTRAINT "SignalementOeuvre_pkey" PRIMARY KEY ("id_signalement")
);

-- CreateTable
CREATE TABLE "SignalementAvis" (
    "id_signalement" SERIAL NOT NULL,
    "raison" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "id_avis" INTEGER NOT NULL,
    "id_client" INTEGER NOT NULL,
    "id_admin" INTEGER,

    CONSTRAINT "SignalementAvis_pkey" PRIMARY KEY ("id_signalement")
);

-- CreateTable
CREATE TABLE "ConsulteCategorie" (
    "id_client" INTEGER NOT NULL,
    "id_categorie" INTEGER NOT NULL,

    CONSTRAINT "ConsulteCategorie_pkey" PRIMARY KEY ("id_client","id_categorie")
);

-- CreateTable
CREATE TABLE "ConsulteOeuvre" (
    "id_client" INTEGER NOT NULL,
    "id_oeuvre" INTEGER NOT NULL,

    CONSTRAINT "ConsulteOeuvre_pkey" PRIMARY KEY ("id_client","id_oeuvre")
);

-- CreateTable
CREATE TABLE "Sauvegarde" (
    "id_client" INTEGER NOT NULL,
    "id_oeuvre" INTEGER NOT NULL,

    CONSTRAINT "Sauvegarde_pkey" PRIMARY KEY ("id_client","id_oeuvre")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CommandeFourniture_id_commande_key" ON "CommandeFourniture"("id_commande");

-- AddForeignKey
ALTER TABLE "Administrateur" ADD CONSTRAINT "Administrateur_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fournisseur" ADD CONSTRAINT "Fournisseur_id_fournisseur_fkey" FOREIGN KEY ("id_fournisseur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fourniture" ADD CONSTRAINT "Fourniture_id_fournisseur_fkey" FOREIGN KEY ("id_fournisseur") REFERENCES "Fournisseur"("id_fournisseur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_fourniture_fkey" FOREIGN KEY ("id_fourniture") REFERENCES "Fourniture"("id_fourniture") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Artisan"("id_artisan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_fournisseur_fkey" FOREIGN KEY ("id_fournisseur") REFERENCES "Fournisseur"("id_fournisseur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeFourniture" ADD CONSTRAINT "CommandeFourniture_id_commande_fkey" FOREIGN KEY ("id_commande") REFERENCES "Commande"("id_commande") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeFourniture" ADD CONSTRAINT "CommandeFourniture_id_fourniture_fkey" FOREIGN KEY ("id_fourniture") REFERENCES "Fourniture"("id_fourniture") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oeuvre" ADD CONSTRAINT "Oeuvre_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie"("id_categorie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oeuvre" ADD CONSTRAINT "Oeuvre_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Artisan"("id_artisan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Artisan"("id_artisan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_destinateur_fkey" FOREIGN KEY ("id_destinateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_conversation_fkey" FOREIGN KEY ("id_conversation") REFERENCES "Conversation"("id_conversation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Artisan"("id_artisan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_id_avis_fkey" FOREIGN KEY ("id_avis") REFERENCES "Avis"("id_avis") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "ConsulteCategorie" ADD CONSTRAINT "ConsulteCategorie_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsulteCategorie" ADD CONSTRAINT "ConsulteCategorie_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie"("id_categorie") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsulteOeuvre" ADD CONSTRAINT "ConsulteOeuvre_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsulteOeuvre" ADD CONSTRAINT "ConsulteOeuvre_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sauvegarde" ADD CONSTRAINT "Sauvegarde_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sauvegarde" ADD CONSTRAINT "Sauvegarde_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE RESTRICT ON UPDATE CASCADE;
