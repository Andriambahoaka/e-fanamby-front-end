import { Cote } from "./cote.model";
import { Utilisateur } from "./utilisateur.model";

export class Pari{
  _id?:Number;
  date:Date;
  mise:number=200;
  cote:Cote;
  gain:number;
  joueur:Utilisateur;

}
