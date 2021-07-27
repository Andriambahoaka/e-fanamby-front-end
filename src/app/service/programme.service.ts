import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipe } from '../model/equipe.model';
import { Programme } from '../model/programme.model';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

 equipe1:Equipe=new Equipe(1,"Real Madrid", "nom_coach",new Date());
 equipe2:Equipe=new Equipe(2,"FC Barcelone", "nom_coach",new Date());
 equipe3:Equipe=new Equipe(2,"Equipe statique 1", "nom_coach",new Date());
 equipe4:Equipe=new Equipe(2,"Equipe statique 2", "nom_coach",new Date());


  listProgramme:Programme[]=[
    {id_programme:1,libelle:"Champion's League",date_pgm:new Date(),heure_pgm:"03:00",created_at:new Date(),listeCotes:[],listeEquipes:[this.equipe1,this.equipe2]},
    {id_programme:2,libelle:"Classico",date_pgm:new Date(),heure_pgm:"03:00",created_at:new Date(),listeCotes:[],listeEquipes:[this.equipe1,this.equipe2]},
    {id_programme:3,libelle:"Course cheval",date_pgm:new Date(),heure_pgm:"03:00",created_at:new Date(),listeCotes:[],listeEquipes:[this.equipe3,this.equipe4]},
    {id_programme:4,libelle:"Garabola",date_pgm:new Date(),heure_pgm:"03:00",created_at:new Date(),listeCotes:[],listeEquipes:[this.equipe4,this.equipe3]}
  ];

  constructor(private http:HttpClient) { }


  prefix="http://localhost:8010/api";
  uri=this.prefix+"/programmes";

  getProgrammesStatique():Programme[]{
    return this.listProgramme;
  }

  /*
  postProgramme(p:Programme):Observable<any>{
    return this.http.post(this.uri,p);
  }

  getProgrammes():Observable<any>{
    return this.http.get<Programme[]>(this.uri);
  }



  updateProgramme(p:Programme):Observable<any>{
    return this.http.put(this.uri,p);
  }

  deleteProgramme(p:Programme):Observable<any>{
    return this.http.delete(this.uri+"/"+p.id_programme);
  }*/

}
