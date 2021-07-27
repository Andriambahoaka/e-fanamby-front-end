import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametreEntite } from '../model/parametre-entite.model';
import { TypeEntite } from '../model/type-entite.model';
import { Entite } from '../model/entite.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  prefix="http://localhost:8010/api";
  uri =this.prefix+"/parametres-entites";
  uriTypeEntite=this.prefix+"/types-entites";
  uriEntite=this.prefix+"/entites";

 // listTypeEntite:TypeEntite[];
  constructor(private http:HttpClient) { }

  ngInit(){
    /*this.listTypeEntite=[{id:1,type:"Equipe"},
    {id:2,type:"Hippie"},{id:3,type:"Combattant"},
    {id:4,type:"Coq"}];*/

  }

  generatedId(){
    return Math.round(Math.random()*100000);
  }

 /* findListTypeEntite():TypeEntite[]{
    return this.listTypeEntite;

  }*/

  postParametreEntite(parametre: ParametreEntite):Observable<any>{
    parametre.id=this.generatedId();
    console.log("Parametre entite", parametre);
    return this.http.post(this.uri,parametre);

  }

  getParametreEntites():Observable<any>{
    return this.http.get<ParametreEntite[]>(this.uri);
  }


  postTypeEntite(typeEntite: TypeEntite):Observable<any>{
    typeEntite.id=this.generatedId();
    console.log("Type entite",typeEntite);
    return this.http.post(this.uriTypeEntite,typeEntite);
  }

  getTypeEntites():Observable<any>{
    return this.http.get<TypeEntite[]>(this.uriTypeEntite);
  }


  postEntite(entite: Entite):Observable<any>{
    entite.id=this.generatedId();
    console.log("SERVICE Entite",entite);
    console.log("uri",this.uriEntite);
    return this.http.post(this.uriEntite,entite);
  }

  getEntites():Observable<any>{
    return this.http.get<Entite[]>(this.uriEntite);
  }


}
