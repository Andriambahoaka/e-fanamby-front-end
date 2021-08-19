import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cote } from '../model/cote.model';
import { Pari } from '../model/pari.model';
import { Programme } from '../model/programme.model';

@Injectable({
  providedIn: 'root'
})
export class PariService {

  constructor(private http:HttpClient) { }


  prefix="http://localhost:8010/api";
  uri=this.prefix+"/paris";

  postPari(p:Pari):Observable<any>{
    return this.http.post(this.uri,p);
  }

  getParis():Observable<any>{
    return this.http.get<Pari[]>(this.uri);
  }

  getParisByProgramme(id:Number):Observable<any>{
    return this.http.get<Pari[]>(this.uri+"/programme/"+id);
  }

  getParisByCote(cote:Cote):Observable<any>{
    return this.http.get<Pari[]>(this.uri+"/cote/"+cote._id);
  }

  getParisByJoueur(id:Number):Observable<any>{
    return this.http.get<Pari[]>(this.uri+"/joueur/"+id);
  }

  updatePari(p:Pari):Observable<any>{
    return this.http.put(this.uri,p);
  }

  deletePari(p:Pari):Observable<any>{
    return this.http.delete(this.uri+"/"+p._id);
  }

  statutText(statut:number){
    switch(statut) {
      case 0:
         return ["En attente de résultat","info"];
         break;
      case 1:
        return ["Gagné","success"];
         break;
      case 2:
        return ["Perdu","error"];
         break;
      default:
        return ["En attente de résultat","info"];
        break;
   }

  }

}
