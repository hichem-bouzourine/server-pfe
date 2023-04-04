import { Prisma } from '@prisma/client';

export const utilisateurSelect: Prisma.UtilisateurSelect = {
  id_utilisateur: true,
  nom: true,
  prenom: true,
  date_de_naissance: true,
  sexe: true,
  ville: true,
  adresse: true,
  email: true,
  telephone: true,
  type: true,
  date_inscription: true,
  photo: true,

  password: false, // Exclude the password field
};
