import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeOperation } from '../model/type-operation.model';

@Injectable({
  providedIn: 'root'
})
export class TypeOperationService {


  listType:TypeOperation[]=[];

  constructor(private http:HttpClient) {
     this.get().subscribe(t=>{
       this.listType=t;
       console.log("Type service",t);
     });
   }
  prefix="http://localhost:8010/api";
  uri=this.prefix+"/types-operations";

  dynamicArrayJSON = [ 'RED', 'BLUE', 'GREEN' ];


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

  strEnum<T extends string>(o: TypeOperation[]): {[K in T]: K} {
    console.log(o);
    return o.reduce((res, key) => {
      res[key.libelle] = key._id;
      return res;
    }, Object.create(null));
  }

  getTypeEnum(){
    const Colors = this.strEnum(this.listType);
    return Colors;
  }


}
