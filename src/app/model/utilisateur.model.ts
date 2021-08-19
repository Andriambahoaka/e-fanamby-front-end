import { TypeUtilisateur } from "./type-utilisateur.model";

export class Utilisateur{
   id:number;
   username:string;
   idParrain:number;
   email: string;
   password :string;
   dateNaissance:Date;
   roles:String[];
   token:String;
  // nom:string;
   //prenom:string;


  // pseudo:string;
   solde:number;
   codeParrain:string;
   createdAt:Date;
   //updated_at:Date;
}
