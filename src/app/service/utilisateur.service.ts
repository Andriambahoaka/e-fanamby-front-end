import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  uri = environment.host + "/users";
  tokenType = 'Bearer ';
  user: Utilisateur = JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  header = new HttpHeaders().set('Authorization', this.tokenType + this.user.token); // may be localStorage/sessionStorage
  headers = { headers: this.header };

  constructor(private http: HttpClient) {
    this.header.set('observe', 'response');
  }
  //afficher tous les utilisateurs
  getAllUtilisateur(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.uri, this.headers);
  }

  //récupère un utilisateur
  getUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.uri + "/" + id, this.headers);
  }
  //ajouter
  saveUtilisateur(Utilisateur: any): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.uri, Utilisateur, this.headers)
  }
  //supprimer
  deleteUtilisateur(id: number): Observable<any> {
    return this.http.delete<any>(this.uri + "/" + id, this.headers);
  }
  //modifier

  updateUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.put(this.uri, utilisateur, this.headers);
  }

}
