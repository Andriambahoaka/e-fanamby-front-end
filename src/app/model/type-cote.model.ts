import { Cote } from "./cote.model";
import { ParametreCote } from "./parametre-cote.model";

export class TypeCote {
  _id?:Number;
  idTypeCote:number;
  titre:string;
  created_at:Date;
  modele:ParametreCote[];
}
