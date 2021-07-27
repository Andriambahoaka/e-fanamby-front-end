import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametreCote } from '../model/parametre-cote.model';

@Injectable({
  providedIn: 'root'
})
export class ParametreCoteService {

  constructor(private http:HttpClient) { }
  prefix="http://localhost:8010/api";
  uri=this.prefix+"/parametres-cotes";

  post(m: ParametreCote):Observable<any>{
    return this.http.post(this.uri,m);
  }

  get():Observable<any>{
    return this.http.get<ParametreCote[]>(this.uri);
  }

  update(m: ParametreCote):Observable<any>{
    return this.http.put(this.uri,m);
  }

  delete(m:ParametreCote):Observable<any>{
    console.log("parametre cote",m);
    return this.http.delete(this.uri+"/"+m._id);
  }
}
