import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Equipe } from 'src/app/model/equipe.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { EquipeService } from 'src/app/service/equipe.service';

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html',
  styleUrls: ['../../back-office.css'],
  providers: [MessageService]
})
export class AddEquipeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private equipeService: EquipeService, private messageService: MessageService) { }

  equipe: Equipe = new Equipe();
  id: number;
  loading = false;
  loadingAjout=false;
  edit:boolean;
  user:Utilisateur=JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  succes:boolean=false;

  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.edit=true;
      this.loading = true;
      this.id = +this.route.snapshot.params.id;
      this.equipeService.getId(this.id).subscribe(res => {
        console.log("EquipeById", res);
        this.equipe = res;
        this.loading = false;

      },error => {
        console.log(error.status); //401 Unauthorized
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: "Erreur pendant l'affichage de l'équipe à modifier" + error.status });
      });
    }else{
      this.edit=false;
    }
  }

  ajouter() {
    this.loadingAjout = true;
    if (this.route.snapshot.params.id) {
      console.log("modifier", this.equipe);
      this.equipeService.update(this.equipe).subscribe(res => {
        console.log("response put", res);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: res['msg']});
        this.succes=true;
        this.loadingAjout = false;
      }, error => {
        console.log(error.status); //401 Unauthorized
        this.loading = false;
        this.loadingAjout = false;
        this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: 'Erreur de modification ' + error.status });
      });
    } else {
      this.equipe.createdAt=new Date();
      this.equipe.createdBy=this.user;
      console.log("ajout", this.equipe);
      this.equipeService.post(this.equipe).subscribe(res => {
        console.log("response post", res);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: res['msg']});
        this.succes=true;
        this.loadingAjout = false;
      }, error => {
        console.log(error.status); //401 Unauthorized
        this.loadingAjout = false;
        this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: "Erreur d'ajout " + error.status });
      });
    }
  }
}
