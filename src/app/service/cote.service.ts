import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cote } from '../model/cote.model';

@Injectable({
  providedIn: 'root'
})
export class CoteService {

  constructor(private http:HttpClient) { }
  prefix="http://localhost:8010/api";
  uri=this.prefix+"/cotes";

  post(m: Cote):Observable<any>{
    return this.http.post(this.uri,m);
  }

  get():Observable<any>{
    return this.http.get<Cote[]>(this.uri);
  }

  update(m: Cote):Observable<any>{
    return this.http.put(this.uri,m);
  }

  delete(m:Cote):Observable<any>{
    return this.http.delete(this.uri+"/"+m._id);
  }

  getCotesByProgramme(id:number){
    return this.http.get<Cote[]>(this.uri+"/programme/"+id);
  }
}
