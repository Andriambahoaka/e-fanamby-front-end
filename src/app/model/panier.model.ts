import { Pari } from "./pari.model";
import { Programme } from "./programme.model";

export class Panier {
  listPari:Pari[];
  gainTotal():number{
    return this.listPari.reduce((sum, current) => sum + current.getGain(), 0);
  }
  miseTotal():number{
    return this.listPari.reduce((sum,current)=> sum+current.mise,0);
  }
}
