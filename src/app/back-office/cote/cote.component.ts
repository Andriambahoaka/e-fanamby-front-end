import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cote } from 'src/app/model/cote.model';
import { Programme } from 'src/app/model/programme.model';
import { TypeCote } from 'src/app/model/type-cote.model';
import { CoteService } from 'src/app/service/cote.service';
import { ProgrammeService } from 'src/app/service/programme.service';
import { TypeCoteService } from 'src/app/service/type-cote.service';

@Component({
  selector: 'app-cote',
  templateUrl: './cote.component.html',
  providers: [MessageService],
  styleUrls: ['../back-office.css']
})
export class CoteComponent implements OnInit {

  constructor(private pservice: ProgrammeService,
    private typeCService: TypeCoteService,
    private coteService: CoteService, private messageService: MessageService,private router: Router) { }

  listP: Programme[] = [];
  // programme:Programme=new Programme();
  idProgramme: number;
  listCote: Cote[] = [];
  valeur: number;
  listTypeCote: TypeCote[] = [];
  idTypeCote: number;
  userConnected: any;
  // typeCote:TypeCote=new TypeCote();

  error: string;

  ngOnInit(): void {
    /*  this.pservice.getProgrammes().subscribe(data=>{
        this.listP=data;
      });*/

    this.listP = this.pservice.getProgrammesStatique();
    this.typeCService.getTypesCotes().subscribe(data => {
      this.listTypeCote = data;
    });
    this.userConnected = JSON.parse(localStorage.getItem('userConnected') || '{}');
  }

  //// A modifier avec form control

  attribuer() {
   if (this.idProgramme == null || this.valeur == null || this.idTypeCote == null) {
      console.log(this.idProgramme);
      console.log(this.valeur);
      console.log(this.idTypeCote);
      this.messageService.add({ severity: 'error', summary: 'Veuillez compléter les informations', detail: "" });
    } else {
      var c = new Cote();
      //ar t= new TypeCote();
      // var p=new Programme();
      this.listTypeCote.forEach(element => {
        if (element._id == this.idTypeCote) {
          c.type = element;
        }
      });

      this.listP.forEach(element => {
        if (element.id_programme == this.idProgramme) {
          c.programme = element;
        }
      });
      c.valeur = this.valeur;
      console.log(c);
      this.listCote.push(c);
   }

  }
  valider() {
    this.error = '';
    if (this.listTypeCote.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Choisir au moins une cote', detail: "" });
    } else {


      console.log(this.listCote);


     this.listCote.forEach(c => {
        this.coteService.post(c).subscribe(res => {
          console.log(res);
        });
      });


      this.messageService.add({ severity: 'success', summary: 'Attribution cotes', detail: "Avec succès" });
     this.router.navigate(['/admin/programme']);
    }
  }

  supprimer(cote: Cote) {
    var index = this.listCote.indexOf(cote);
    console.log(index);
    this.listCote.splice(index, 1);
  }
}
