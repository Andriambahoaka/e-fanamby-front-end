import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../model/utilisateur.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = false;


 // uri = "http://localhost:8010/api";
  //uri="localhost:8080/api/auth";
  uri="https://pari-rest.herokuapp.com/api/auth";
  //uri=environment+"/api/auth";

  utilisateurs?:Utilisateur[];
  public userConnected?:Utilisateur;
  //public isLoggedIn:Boolean = false;

  public headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });



  constructor(private http: HttpClient, private router: Router,private utilisateurService:UtilisateurService) {
        //this.onGetAllUtilisateur();
   }



  signIn(user: Utilisateur):Observable<any>{
    return this.http.post(this.uri + '/signin', user,{observe: 'response'});
   // return this.http.post<any>(this.uri + '/signin', user,{observe: 'response'});
  }

  signUp(user: Utilisateur): Promise<any> {
    //const httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
    //const options = {headers: httpHeaders};
    //const body=JSON.stringify(user);
    //console.log(body);
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + '/signup',user).subscribe(res => {
        resolve(res);
      });
    });
  }


  logOut() {
    localStorage.clear();
    this.router.navigate(['/accueil'])
    .then(() => {
      window.location.reload();
    });
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }


 /* isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }*/






    /*
  onGetAllUtilisateur() {
    console.log('------- ')
    this.utilisateurService.getAllUtilisateur().subscribe(data=>{
      console.log('------- ', data)
      this.utilisateurs=data;
    },err=>{
      console.log(err);
    })
  }/

  signIn(utilisateurs:Utilisateur):Boolean{
    let validUser: Boolean=false;
    console.log(this.utilisateurs);
    this.utilisateurs?.forEach((curUser) => {
      if (utilisateurs?.username === curUser.username && utilisateurs.password === curUser.password) {
        validUser = true;
        this.isLoggedIn = true;
        localStorage.setItem('userConnected', JSON.stringify(curUser));
        localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
      }
    });
    return validUser;
  }


signIn(user: Utilisateur):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + '/signin', user).subscribe(res => {
        resolve(res);
      });
    });
  }


  isAdmin():Boolean{
    if(!this.role || this.role === '')
    return false;
    return (this.role.indexOf('Admin') >-1);
  }*/
}
