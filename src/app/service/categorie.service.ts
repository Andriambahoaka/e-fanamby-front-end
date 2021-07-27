import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  listCategorie:Categorie[]=[

    {id_categorie:1,nom_categ:"Football",created_at:new Date()},
    {id_categorie:2,nom_categ:"Categorie 2",created_at:new Date()},
    {id_categorie:1,nom_categ:"Categorie 3",created_at:new Date()},
    {id_categorie:1,nom_categ:"Categorie 4",created_at:new Date()},
    {id_categorie:1,nom_categ:"Categorie 5",created_at:new Date()},
    {id_categorie:1,nom_categ:"Categorie 6",created_at:new Date()}
  ];

  constructor(private http:HttpClient) {


  }



  prefix="http://localhost:8010/api";
  urlCategorie=this.prefix+"/categories";
 // urlTypeCategorie=this.prefix+"/types-categories";


  /*postTypeCategorie(tc:TypeCategorie):Observable<any>{
     return this.http.post(this.urlTypeCategorie,tc);
  }


  getTypesCategories():Observable<any>{
    return this.http.get<TypeCategorie[]>(this.urlTypeCategorie);
  }*/

  postCategorie(c: Categorie):Observable<any>{
    console.log(c);
    return this.http.post(this.urlCategorie,c);
  }


  getCategories():Observable<any>{
    return this.http.get<Categorie[]>(this.urlCategorie);
  }

  getCategoriesStatique():Categorie[]{
    return this.listCategorie;
  }


  putCategorie(c: Categorie):Observable<any>{
    console.log(c);
    return this.http.put(this.urlCategorie,c);
  }

  deleteCategorie(c: Categorie):Observable<any>{
    console.log(c);
    return this.http.delete(this.urlCategorie+"/"+c.id_categorie);
  }

}
