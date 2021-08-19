import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['../back-office.css'],
  providers: [MessageService]
})
export class UtilisateurComponent implements OnInit {

  constructor(private uService:UtilisateurService,private messageService: MessageService) { }

  loading=false;
  listeUtilisateur:Utilisateur[];

  ngOnInit(): void {
    this.loading=true;
    this.uService.getAllUtilisateur().subscribe(data => {
      console.log("Response get utilisateurs", data);
      this.listeUtilisateur=data;
      this.loading=false;
    },error=>{
      console.log(error.status); //401 Unauthorized
      this.loading=false;
      this.messageService.add({severity:'error', summary:'Réessayez', detail:"Erreur pendant l'affichage des utilisateurs" +error.status});
    });
  }
}
