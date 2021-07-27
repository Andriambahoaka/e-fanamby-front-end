import { TypeUtilisateur } from "./type-utilisateur.model";

export class Utilisateur{
   id_utilisateur:number;
   nom:string;
   prenom:string;
   email: string;
   pseudo:string;
   dateNaissance:Date;
   password :string;
   solde:number;
   created_at:Date;
   updated_at:Date;
}
