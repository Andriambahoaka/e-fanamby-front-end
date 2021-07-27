import { ParametreCote } from "./parametre-cote.model";
import { TypeCote } from "./type-cote.model";

export class ModeleCote {
  _id?:Number;
  typeCote:TypeCote;
  paremetreCote:ParametreCote;
  created_at:Date;
}
