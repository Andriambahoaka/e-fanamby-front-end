import { Component, OnInit } from '@angular/core';
import { ParametreCote } from 'src/app/model/parametre-cote.model';
import { ParametreCoteService } from 'src/app/service/parametre-cote.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-parametre-cote',
  templateUrl: './parametre-cote.component.html',
  providers:[MessageService],
  styleUrls: ['../back-office.css']
})
export class ParametreCoteComponent implements OnInit {

  constructor(private parametreCService: ParametreCoteService,private messageService:MessageService) { }
  libelle: string;
  listParametreCote:ParametreCote[]=[];

  ngOnInit(): void {
    this.parametreCService.get().subscribe(data=>{
      console.log("Parametre cote",data);
      this.listParametreCote=data;
    });
  }

  ajouter() {
    if(!this.libelle){
      this.messageService.add({ severity: 'error', summary: 'Veuillez insérez un libélle', detail: "" });
    }else{
      var pc = new ParametreCote();
      pc.libelle = this.libelle;
      this.parametreCService.post(pc).subscribe(response => {
        console.log(response);
        //window.location.reload();
        this.messageService.add({ severity: 'success', summary: 'Ajout parametre avec succès !!', detail: "" });

      });
      this.listParametreCote.push(pc);
    }
  }

  supprimer(typeOp:ParametreCote){
    console.log(typeOp);
    this.parametreCService.delete(typeOp).subscribe(response => {
      console.log(response);
    });
    var index=this.listParametreCote.indexOf(typeOp);
    console.log("index",index);
    this.listParametreCote.splice(index,1);

  }

}
