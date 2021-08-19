import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private coteService: CoteService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  listP: Programme[] = [];
  // programme:Programme=new Programme();
  idProgramme: number;
  listCote: Cote[] = [];
  valeur: number;
  listTypeCote: TypeCote[] = [];
  idTypeCote: number=0;
  //selectedTypeCote: TypeCote = new TypeCote();
  cotes: Cote[] = [];
  userConnected: any;
  loading:boolean=false;
  // typeCote:TypeCote=new TypeCote();
  newCotes:TypeCote[]=[];

  programme: Programme;
  error: string;

  ngOnInit(): void {
    /*  this.pservice.getProgrammes().subscribe(data=>{
        this.listP=data;
      });*/
    this.getProgrammeById();
    this.listP = this.pservice.getProgrammesStatique();
    this.typeCService.getTypesCotes().subscribe(data => {
      this.listTypeCote = data;
      console.log("list type cote", data);
    });
    this.userConnected = JSON.parse(localStorage.getItem('userConnected') || '{}');

  }

  choisir() {
    this.cotes = [];
    this.listTypeCote.forEach(element => {
      if (element._id == this.idTypeCote) {
        element.modele.forEach(parametre => {
          let c = new Cote();
          c.type = element;
          c.parametre = parametre;
          c.idProgramme = this.programme.id;
          console.log(c);
          this.cotes.push(c);
        });
      }
    });
  }

  //// A modifier avec form control

  attribuer() {
    //console.log(this.selectedTypeCote);
///// A optimiser //////






    //////// A modifier  //////
    console.log("id type cote",this.idTypeCote);
    if(this.idTypeCote==0){
      this.messageService.add({ severity: 'error', summary: 'Choississez le type de cote !!', detail: "" });

    }else{
      let test = this.cotes.every(cote => {
        if (!cote.valeur) {
          this.messageService.add({ severity: 'error', summary: 'Valeur de cote manquante !!', detail: "" });
          return false;
        }
        return true;
      });

      if (test) {
        this.listTypeCote.forEach((element,index) => {
          if (element._id == this.idTypeCote) {
            this.listTypeCote.splice(index,1);
          }
        });
        this.cotes.forEach(cote => {
          this.listCote.push(cote);
        });
        this.cotes=[];
        this.idTypeCote=0;
        this.messageService.add({ severity: 'success', summary: ' Côtes attribués avec succès!', detail: "Vous pouvez valider maintenant" });
      }
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
      this.programme.etat.id=2;
      console.log(this.programme);
      this.pservice.updateProgramme(this.programme).subscribe(res=>{
        console.log("response update",res);
        this.router.navigate(['/admin/programme'])
        .then(() => {
          window.location.reload();
        });
      },error=>{
        console.log(error.status);
        this.messageService.add({severity:'error', summary:'Erreur', detail:'code '+error.status});
      });

    }
  }

  supprimer(cote: Cote,type: TypeCote) {
   /* this.listCote.forEach((c,i)=>{
      if(c.type._id==cote.type._id){
       this.listCote.splice(i,1);
       console.log(i);
      }
    });*/
    for (var i = this.listCote.length - 1; i >= 0; i--) {
      if(this.listCote[i].type._id==cote.type._id){
        this.listCote.splice(i,1);
        console.log(i);
       }
  }
    /*
    var index = this.listCote.indexOf(cote);
    console.log(index);
    this.listCote.splice(index, 1);*/
    this.listTypeCote.push(type);
  }

  getProgrammeById() {
    this.loading=true;
    const id: number = +this.route.snapshot.params.id;
     this.pservice.getProgramme(id).subscribe(data=>{
      this.programme=data;
      this.loading=false;
      console.log(this.programme);
    });


    ///// Attente API //////
    /*     this.pservice.getProgramme(id).subscribe(data=>{
         console.log(this.programme);
         this.programme=data;
    });*/
  }
}
