import { TypeOperation } from "./type-operation.model";
import { Utilisateur } from "./utilisateur.model";

export class Operation {
  _id?:Number;
  idOperation:number;
  montant:number;
  solde: number;
  created_at : Date;
  utilisateur:Utilisateur;
  typeOperation:TypeOperation;
}
