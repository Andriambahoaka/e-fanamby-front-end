import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Equipe } from 'src/app/model/equipe.model';
import { EquipeService } from 'src/app/service/equipe.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['../back-office.css'],
  providers: [MessageService]
})
export class EquipeComponent implements OnInit {

  constructor(private equipeService:EquipeService,private messageService: MessageService,private router: Router) { }

    loading=false;
    loadingDelete=false;
    listeEquipe:Equipe[];

  ngOnInit(): void {
    this.loading=true;
    this.equipeService.get().subscribe(data => {
      console.log("Response get equipes", data);
      this.listeEquipe=data;
      this.loading=false;
    },error=>{
      console.log(error.status); //401 Unauthorized
      this.loading=false;
      this.messageService.add({severity:'error', summary:'Réessayez', detail:"Erreur pendant l'affichage des équipes" +error.status});
    });
  }

  delete(e:Equipe){
    this.loadingDelete=true;
    this.equipeService.delete(e).subscribe(data => {
      console.log("Response delete equipe", data);
      this.messageService.add({severity:'success', summary:'Succès', detail:'Elément supprimé'});
    },error=>{
      console.log(error.status); //401 Unauthorized
      if(error.status==409){
        console.log("Ato");
        this.messageService.add({severity:'error', summary:'Echec de suprression', detail:'Cette équipe appratient déjà à un programme'});
      }else{
        this.messageService.add({severity:'error', summary:'Réessayez', detail:'Erreur de suprression '+error.status});
      }
      this.loadingDelete=false;
    });
  }

  edit(id:Number){
    this.router.navigate(['/admin/add/equipe',id]);
  }
}
