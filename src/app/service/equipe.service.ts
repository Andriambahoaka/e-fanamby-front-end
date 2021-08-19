import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipe } from '../model/equipe.model';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  prefix = environment.host;
  uri = this.prefix + "/equipes";
  tokenType = 'Bearer ';
  user: Utilisateur = JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  header = new HttpHeaders().set('Authorization', this.tokenType + this.user.token); // may be localStorage/sessionStorage
  headers = { headers: this.header };
  constructor(private http: HttpClient) {   this.header.set('observe','response'); }

  post(m: Equipe): Observable<any> {
    return this.http.post(this.uri, m,this.headers);
  }

  get(): Observable<any> {
    return this.http.get<Equipe[]>(this.uri, this.headers);
  }

  getId(id: number): Observable<any> {
    return this.http.get<Equipe[]>(this.uri + "/" + id, this.headers);
  }

  update(m: Equipe): Observable<any> {
    return this.http.put(this.uri, m, this.headers);
  }

  delete(m: Equipe): Observable<any> {
    return this.http.delete(this.uri + "/" + m.id, this.headers);
  }
}
