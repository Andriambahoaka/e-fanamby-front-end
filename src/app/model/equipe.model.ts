export class Equipe {
  id_equipe:number;
  nom_equipe:string;
  coach:string;
  created_at:Date;

  public constructor(id_equipe:number,nom_equipe:string,coach:string,created_at:Date){
    this.id_equipe=id_equipe;
     this.nom_equipe=nom_equipe;
     this.coach=coach;
     this.created_at=created_at;
  }

}
