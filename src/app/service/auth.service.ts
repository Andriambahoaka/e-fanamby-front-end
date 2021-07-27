import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../model/utilisateur.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = false;


  uri = "http://localhost:8010/api";

  public headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });

  constructor(private http: HttpClient, private router: Router) { }

  logIn(user: Utilisateur){
    localStorage.setItem('isLoggedIn', "true");
    localStorage.setItem('userConnected', JSON.stringify(user));
    //this.loggedIn = true;
    window.location.reload();
  }


  register(user: Utilisateur): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + '/register', user).subscribe(res => {
        resolve(res);
      });
    });
  }


  logOut() {
    localStorage.clear();
    window.location.reload();
  }


  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }
}
