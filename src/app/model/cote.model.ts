import { flattenDiagnosticMessageText } from "typescript";
import { ParametreCote } from "./parametre-cote.model";
import { Programme } from "./programme.model";
import { TypeCote } from "./type-cote.model";

export class Cote {
  _id?:Number;
  idCote:number;
  idProgramme:number;
  valeur:number;
  //statut:number;
  win:boolean;
  created_at:Date;
  type:TypeCote;
  programme:Programme;
  parametre:ParametreCote;
  inCart:boolean=false;
}
