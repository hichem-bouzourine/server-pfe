-- DropForeignKey
ALTER TABLE "Achat" DROP CONSTRAINT "Achat_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Achat" DROP CONSTRAINT "Achat_id_oeuvre_fkey";

-- DropForeignKey
ALTER TABLE "Administrateur" DROP CONSTRAINT "Administrateur_id_admin_fkey";

-- DropForeignKey
ALTER TABLE "Artisan" DROP CONSTRAINT "Artisan_id_artisan_fkey";

-- DropForeignKey
ALTER TABLE "Avis" DROP CONSTRAINT "Avis_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Avis" DROP CONSTRAINT "Avis_id_oeuvre_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_artisan_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_fournisseur_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_fourniture_fkey";

-- DropForeignKey
ALTER TABLE "CommandeFourniture" DROP CONSTRAINT "CommandeFourniture_id_commande_fkey";

-- DropForeignKey
ALTER TABLE "CommandeFourniture" DROP CONSTRAINT "CommandeFourniture_id_fourniture_fkey";

-- DropForeignKey
ALTER TABLE "ConsulteCategorie" DROP CONSTRAINT "ConsulteCategorie_id_categorie_fkey";

-- DropForeignKey
ALTER TABLE "ConsulteCategorie" DROP CONSTRAINT "ConsulteCategorie_id_client_fkey";

-- DropForeignKey
ALTER TABLE "ConsulteOeuvre" DROP CONSTRAINT "ConsulteOeuvre_id_client_fkey";

-- DropForeignKey
ALTER TABLE "ConsulteOeuvre" DROP CONSTRAINT "ConsulteOeuvre_id_oeuvre_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_id_artisan_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Fournisseur" DROP CONSTRAINT "Fournisseur_id_fournisseur_fkey";

-- DropForeignKey
ALTER TABLE "Fourniture" DROP CONSTRAINT "Fourniture_id_fournisseur_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_conversation_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_destinateur_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_id_oeuvre_fkey";

-- DropForeignKey
ALTER TABLE "Oeuvre" DROP CONSTRAINT "Oeuvre_id_artisan_fkey";

-- DropForeignKey
ALTER TABLE "Oeuvre" DROP CONSTRAINT "Oeuvre_id_categorie_fkey";

-- DropForeignKey
ALTER TABLE "Reponse" DROP CONSTRAINT "Reponse_id_artisan_fkey";

-- DropForeignKey
ALTER TABLE "Reponse" DROP CONSTRAINT "Reponse_id_avis_fkey";

-- DropForeignKey
ALTER TABLE "Sauvegarde" DROP CONSTRAINT "Sauvegarde_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Sauvegarde" DROP CONSTRAINT "Sauvegarde_id_oeuvre_fkey";

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

-- AddForeignKey
ALTER TABLE "Administrateur" ADD CONSTRAINT "Administrateur_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fournisseur" ADD CONSTRAINT "Fournisseur_id_fournisseur_fkey" FOREIGN KEY ("id_fournisseur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fourniture" ADD CONSTRAINT "Fourniture_id_fournisseur_fkey" FOREIGN KEY ("id_fournisseur") REFERENCES "Fournisseur"("id_fournisseur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_fourniture_fkey" FOREIGN KEY ("id_fourniture") REFERENCES "Fourniture"("id_fourniture") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Artisan"("id_artisan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_fournisseur_fkey" FOREIGN KEY ("id_fournisseur") REFERENCES "Fournisseur"("id_fournisseur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeFourniture" ADD CONSTRAINT "CommandeFourniture_id_commande_fkey" FOREIGN KEY ("id_commande") REFERENCES "Commande"("id_commande") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeFourniture" ADD CONSTRAINT "CommandeFourniture_id_fourniture_fkey" FOREIGN KEY ("id_fourniture") REFERENCES "Fourniture"("id_fourniture") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oeuvre" ADD CONSTRAINT "Oeuvre_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie"("id_categorie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oeuvre" ADD CONSTRAINT "Oeuvre_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Artisan"("id_artisan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Artisan"("id_artisan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_destinateur_fkey" FOREIGN KEY ("id_destinateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_conversation_fkey" FOREIGN KEY ("id_conversation") REFERENCES "Conversation"("id_conversation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_id_artisan_fkey" FOREIGN KEY ("id_artisan") REFERENCES "Artisan"("id_artisan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_id_avis_fkey" FOREIGN KEY ("id_avis") REFERENCES "Avis"("id_avis") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_signale_fkey" FOREIGN KEY ("id_signale") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_rapporteur_fkey" FOREIGN KEY ("id_rapporteur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementProfil" ADD CONSTRAINT "SignalementProfil_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Administrateur"("id_admin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementOeuvre" ADD CONSTRAINT "SignalementOeuvre_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementOeuvre" ADD CONSTRAINT "SignalementOeuvre_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementOeuvre" ADD CONSTRAINT "SignalementOeuvre_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Administrateur"("id_admin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementAvis" ADD CONSTRAINT "SignalementAvis_id_avis_fkey" FOREIGN KEY ("id_avis") REFERENCES "Avis"("id_avis") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementAvis" ADD CONSTRAINT "SignalementAvis_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignalementAvis" ADD CONSTRAINT "SignalementAvis_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Administrateur"("id_admin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsulteCategorie" ADD CONSTRAINT "ConsulteCategorie_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsulteCategorie" ADD CONSTRAINT "ConsulteCategorie_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie"("id_categorie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsulteOeuvre" ADD CONSTRAINT "ConsulteOeuvre_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsulteOeuvre" ADD CONSTRAINT "ConsulteOeuvre_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sauvegarde" ADD CONSTRAINT "Sauvegarde_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sauvegarde" ADD CONSTRAINT "Sauvegarde_id_oeuvre_fkey" FOREIGN KEY ("id_oeuvre") REFERENCES "Oeuvre"("id_oeuvre") ON DELETE CASCADE ON UPDATE CASCADE;
