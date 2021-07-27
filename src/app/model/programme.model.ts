import { Cote } from "./cote.model";
import { Equipe } from "./equipe.model";

export class Programme{
  public id_programme:number;
  public libelle :string;
  public date_pgm:Date;
  public heure_pgm:string;
  public created_at:Date;
  public listeCotes:Cote[];
  public listeEquipes:Equipe[];
}
