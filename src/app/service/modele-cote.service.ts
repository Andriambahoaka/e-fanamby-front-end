import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeleCote } from '../model/modele-cote.model';

@Injectable({
  providedIn: 'root'
})
export class ModeleCoteService {

  constructor(private http:HttpClient) { }
  prefix="http://localhost:8010/api";
  uri=this.prefix+"/modelescotes";

  post(m: ModeleCote):Observable<any>{
    return this.http.post(this.uri,m);
  }

  get():Observable<any>{
    return this.http.get<ModeleCote[]>(this.uri);
  }

  update(m: ModeleCote):Observable<any>{
    return this.http.put(this.uri,m);
  }

  delete(m:ModeleCote):Observable<any>{
    return this.http.delete(this.uri+"/"+m._id);
  }
}
