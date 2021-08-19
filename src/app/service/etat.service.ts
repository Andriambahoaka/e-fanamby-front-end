import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etat } from '../model/etat.model';


@Injectable({
  providedIn: 'root'
})
export class EtatService {

  constructor(private http:HttpClient) { }


  uri=environment.host+"/etats";
  listEtat:Etat[]=[
  {id:1,libelle:"crée",created_at:new Date()},
  {id:2,libelle:"ouvert",created_at:new Date()},
  {id:3,libelle:"fermé",created_at:new Date()},
  {id:4,libelle:"reglé",created_at:new Date()}];

  post(e: Etat):Observable<any>{
    return this.http.post(this.uri,e);
  }

  get():Observable<any>{
    return this.http.get<Etat[]>(this.uri);
  }

  getStatique():Etat[]{
    return this.listEtat;
  }

  update(m: Etat):Observable<any>{
    return this.http.put(this.uri,m);
  }

  delete(m:Etat):Observable<any>{
    return this.http.delete(this.uri+"/"+m.id);
  }
}
