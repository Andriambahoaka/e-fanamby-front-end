import { ParametreEntite } from "./parametre-entite.model";

export class TypeEntite{
  _id?:string;
  id:number;
  type:string;
  listParametre:ParametreEntite[];
}
