import { AfficheCote } from "./affiche-cote.model";
import { Cote } from "./cote.model";
import { Equipe } from "./equipe.model";
import { Etat } from "./etat.model";
import { TypeCote } from "./type-cote.model";

export class Programme{
  public id:number;
  public libelle :string;
  public dateHeurePgm:Date;
  public heure_pgm:string;
  public createdAt:Date;
  public listeCotes:Cote[];
  public equipes:Equipe[]=[];
  public affichageCote:AfficheCote[];
  public etat:Etat;
}



