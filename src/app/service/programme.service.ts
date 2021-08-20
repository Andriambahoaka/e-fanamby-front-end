import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AfficheCote } from '../model/affiche-cote.model';
import { Equipe } from '../model/equipe.model';
import { Etat } from '../model/etat.model';
import { Programme } from '../model/programme.model';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {
  /*
   equipe1:Equipe=new Equipe(1,"Real Madrid", "nom_coach",new Date());
   equipe2:Equipe=new Equipe(2,"FC Barcelone", "nom_coach",new Date());
   equipe3:Equipe=new Equipe(2,"Equipe statique 1", "nom_coach",new Date());
   equipe4:Equipe=new Equipe(2,"Equipe statique 2", "nom_coach",new Date());*/

  etat = new Etat(1);
  etat2 = new Etat(2);

  tokenType = 'Bearer ';
  //prefix="http://localhost:8010/api";
  prefix = environment.host;
  uri = this.prefix + "/programmes";
  user: Utilisateur = JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  header = new HttpHeaders().set('Authorization', this.tokenType + this.user.token); // may be localStorage/sessionStorage


  headers = { headers: this.header };


  listProgramme: Programme[] = [
    /*
    {id:1,libelle:"Champion's League",dateHeurePgm:new Date(),heure_pgm:"03:00",createdAt:new Date(),listeCotes:[],affichageCote:[],listeEquipes:[this.equipe1,this.equipe2],etat:this.etat2},
    {id:2,libelle:"Classico",dateHeurePgm:new Date(),heure_pgm:"03:00",createdAt:new Date(),listeCotes:[],affichageCote:[],listeEquipes:[this.equipe1,this.equipe2],etat:this.etat2},
    {id:3,libelle:"Course cheval",dateHeurePgm:new Date(),heure_pgm:"03:00",createdAt:new Date(),listeCotes:[],affichageCote:[],listeEquipes:[this.equipe3,this.equipe4],etat:this.etat},
    {id:4,libelle:"Garabola",dateHeurePgm:new Date(),heure_pgm:"03:00",createdAt:new Date(),listeCotes:[],affichageCote:[],listeEquipes:[this.equipe4,this.equipe3],etat:this.etat}*/
  ];

  constructor(private http: HttpClient) {
    this.header.set('observe', 'response');

  }






  getProgramme(id: number): Observable<any> {

    return this.http.get<Programme[]>(this.uri + "/" + id, this.headers);
  }

  getProgrammeById(id: number): Observable<any> {
    console.log(this.uri + "/" + id + "?all=true");
    return this.http.get<any>(this.uri + "/" + id + "?all=true", this.headers);
  }

  /////A modifier ////
  populateAffiche(p: Programme) {
    // console.log("populate",p);
   // console.log("cotes", p.listeCotes);
    p.affichageCote = [];
    p.listeCotes.forEach((cote, index) => {
      let afficheCote = new AfficheCote();
      afficheCote.typeCote = cote.type;
      afficheCote.cotes = p.listeCotes.filter((cf) => (cf.type._id == cote.type._id));
      console.log(afficheCote);
      p.affichageCote.push(afficheCote);
      console.log(afficheCote.cotes)
    });
    p.affichageCote = p.affichageCote.filter((a, i) => p.affichageCote.findIndex(item => item.typeCote._id == a.typeCote._id) === i);
    console.log(p.affichageCote);
  }


  postProgramme(p: any): Observable<any> {
    return this.http.post(this.uri, p, this.headers);
  }

  getProgrammes(): Observable<any> {
    return this.http.get<Programme[]>(this.uri, this.headers);
  }

  getPaginated(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.uri + "?page=" + page + "&size=" + size, this.headers);
  }

  getByEtat(etat: number): Observable<any> {
    return this.http.get<Programme[]>(this.uri + "?idEtat=" + etat, this.headers);
  }

  updateProgramme(p: Programme): Observable<any> {
    return this.http.put(this.uri, p, this.headers);
  }

  deleteProgramme(p: Programme): Observable<any> {
    return this.http.delete(this.uri + "/" + p.id, this.headers);
  }


  getProgrammesStatique(): Programme[] {
    return this.listProgramme;
  }
  /*
    getProgrammeByIdStatique(id:number):Programme{
      console.log("getProgrammeByIdStatique",id);
      let prog=new Programme();
      this.listProgramme.forEach(p=>{
        if(p.id=id){
            prog=p;
        }
      });
      console.log("programme getProgrammeByIdStatique",prog);
      return prog;
    }*/

}
