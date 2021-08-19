import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../model/categorie.model';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  items: MenuItem[] = [];
  listCategorie:Categorie[]=[

/*
    {id:1,nomCateg:"Football",createdAt:new Date()},
    {id:2,nomCateg:"Categorie 2",createdAt:new Date()},
    {id:1,nomCateg:"Categorie 3",createdAt:new Date()},*/

  ];

  constructor(private http:HttpClient) {
    this.getCategoriesParent().subscribe(res=>{
      console.log("categorie from oracle",res);
      //this.listCategorie=res;
      this.listCategorie.forEach(cat => {
        this.items.push({ label: cat.nomCateg });
      });
      console.log(this.items);
    });
    this.header.set('observe','response');
  }



  //prefix="http://localhost:8010/api";
  //prefix="https://mbdsp7-back-e-fanamby.herokuapp.com/api/";
  prefix=environment.host;
  urlCategorie=this.prefix+"/categories";
  tokenType  = 'Bearer ';
  user:Utilisateur=JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  header = new HttpHeaders().set('Authorization', this.tokenType + this.user.token); // may be localStorage/sessionStorage
  headers = { headers: this.header };


 // urlTypeCategorie=this.prefix+"/types-categories";


  /*postTypeCategorie(tc:TypeCategorie):Observable<any>{
     return this.http.post(this.urlTypeCategorie,tc);
  }


  getTypesCategories():Observable<any>{
    return this.http.get<TypeCategorie[]>(this.urlTypeCategorie);
  }*/

  postCategorie(c: Categorie):Observable<any>{
    console.log(c);
    return this.http.post(this.urlCategorie,c,this.headers);
  }


  getCategoriesParent():Observable<any>{
   // const header = new HttpHeaders().set('Authorization', this.tokenType + this.user.token); // may be localStorage/sessionStorage
    //const headers = { headers: header };
    return this.http.get<Categorie[]>(this.urlCategorie+"/parent/0",this.headers);
  }


  getCategories():Observable<any>{
    return this.http.get<Categorie[]>(this.urlCategorie,this.headers);
  }

  getCategorieById(id:number):Observable<any>{
    return this.http.get<Categorie[]>(this.urlCategorie+"/"+id,this.headers);
  }


  getCategoriesStatique():Categorie[]{
    return this.listCategorie;
  }


  putCategorie(c: Categorie):Observable<any>{
    console.log(c);
    return this.http.put(this.urlCategorie,c,this.headers);
  }

  deleteCategorie(c: Categorie):Observable<any>{
    console.log(c);
    return this.http.delete(this.urlCategorie+"/"+c.id,this.headers);
  }

  getMenu():MenuItem[]{
    return this.items;
  }

}
