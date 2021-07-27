import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../model/operation.model';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http:HttpClient) { }
  prefix="http://localhost:8010/api";
  uri=this.prefix+"/operations";

  post(m: Operation):Observable<any>{
    return this.http.post(this.uri,m);
  }

  get():Observable<any>{
    return this.http.get<Operation[]>(this.uri);
  }

  update(m: Operation):Observable<any>{
    return this.http.put(this.uri,m);
  }

  delete(m:Operation):Observable<any>{
    return this.http.delete(this.uri+"/"+m._id);
  }
}
