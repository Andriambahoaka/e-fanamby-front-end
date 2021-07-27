import { Component, OnInit } from '@angular/core';
import { ParametreCote } from 'src/app/model/parametre-cote.model';
import { ParametreCoteService } from 'src/app/service/parametre-cote.service';

@Component({
  selector: 'app-parametre-cote',
  templateUrl: './parametre-cote.component.html',
  styleUrls: ['../back-office.css']
})
export class ParametreCoteComponent implements OnInit {

  constructor(private parametreCService: ParametreCoteService) { }
  libelle: string;
  listParametreCote:ParametreCote[]=[];

  ngOnInit(): void {
    this.parametreCService.get().subscribe(data=>{
      console.log("Parametre cote",data);
      this.listParametreCote=data;
    });
  }

  ajouter() {
    var pc = new ParametreCote();
    pc.libelle = this.libelle;
    this.parametreCService.post(pc).subscribe(response => {
      console.log(response);
      //window.location.reload();
    });
    this.listParametreCote.push(pc);
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
