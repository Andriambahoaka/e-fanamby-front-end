import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeCote } from '../model/type-cote.model';

@Injectable({
  providedIn: 'root'
})
export class TypeCoteService {

  constructor(private http:HttpClient) { }

  prefix="http://localhost:8010/api";
  uri=this.prefix+"/types-cotes";


  postTypeCote(t:TypeCote):Observable<any>{
    return this.http.post(this.uri,t);
  }

  getTypesCotes():Observable<any>{
    return this.http.get<TypeCote[]>(this.uri);
  }

  updateTypeCote(t:TypeCote):Observable<any>{
    return this.http.put(this.uri,t);
  }

  deleteTypeCote(t:TypeCote):Observable<any>{
    return this.http.delete(this.uri+"/"+t._id);
  }


}
