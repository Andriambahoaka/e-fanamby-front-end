import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  updatePari(p:Pari):Observable<any>{
    return this.http.put(this.uri,p);
  }

  deletePari(p:Pari):Observable<any>{
    return this.http.delete(this.uri+"/"+p._id);
  }
}
