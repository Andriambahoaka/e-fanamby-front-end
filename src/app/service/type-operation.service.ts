import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeOperation } from '../model/type-operation.model';

@Injectable({
  providedIn: 'root'
})
export class TypeOperationService {

  constructor(private http:HttpClient) { }
  prefix="http://localhost:8010/api";
  uri=this.prefix+"/types-operations";

  post(m: TypeOperation):Observable<any>{
    return this.http.post(this.uri,m);
  }

  get():Observable<any>{
    return this.http.get<TypeOperation[]>(this.uri);
  }

  update(m: TypeOperation):Observable<any>{
    return this.http.put(this.uri,m);
  }

  delete(m:TypeOperation):Observable<any>{
    return this.http.delete(this.uri+"/"+m._id);
  }
}
