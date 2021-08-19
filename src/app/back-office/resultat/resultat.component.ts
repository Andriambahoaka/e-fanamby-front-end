import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cote } from 'src/app/model/cote.model';
import { Operation } from 'src/app/model/operation.model';
import { Programme } from 'src/app/model/programme.model';
import { CoteService } from 'src/app/service/cote.service';
import { OperationService } from 'src/app/service/operation.service';
import { PariService } from 'src/app/service/pari.service';
import { ProgrammeService } from 'src/app/service/programme.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pari } from 'src/app/model/pari.model';
import { TypeOperationService } from 'src/app/service/type-operation.service';
import { TypeOperation } from 'src/app/model/type-operation.model';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['../back-office.css'],
  providers: [MessageService]
})
export class ResultatComponent implements OnInit {

  constructor(private pservice: ProgrammeService, private coteService: CoteService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService, private typeOperationService: TypeOperationService, private pariService: PariService, private _formBuilder: FormBuilder) { }

  programme: Programme;
  selectedCotes: Cote[] = [];
  coteSelected: Cote;
  formGroup: FormGroup;
  typeOperation: any;
  loading:boolean=false;

  ngOnInit(): void {
    console.log("route",this.route.snapshot.params.id);
    this.loading=true;
    this.getProgrammeById();
    this.formGroup = this._formBuilder.group({
      selectedCotes: ['', Validators.required]
    });

    this.typeOperationService.get().subscribe(t => {
      this.typeOperation = this.typeOperationService.strEnum(t);
    });
    this.loading=false;
  }



  getProgrammeById() {
    const id: number = this.route.snapshot.params.id;

    //this.programme = this.pservice.getProgrammeByIdStatique(id);
    this.pservice.getProgrammeWithEquipe(id).subscribe(res=>{
       console.log(res);
      this.programme=res;
      console.log(res["equipes"]);
      let pr=new Programme();
      console.log("getProgrammeById",id);
      console.log("programme",this.programme);

      this.coteService.getCotesByProgramme(id).subscribe(data => {
        this.programme.listeCotes = data;
        this.pservice.populateAffiche(this.programme);
      });

    });

    // console.log(this.programme);

    ///// Attente API //////
    /*     this.pservice.getProgramme(id).subscribe(data=>{
         console.log(this.programme);
         this.programme=data;
    });*/
  }

  publier() {
    // console.log(this.selectedCotes[0]);
    if (this.selectedCotes.length != this.programme.affichageCote.length) {
      //console.log("sur");
      this.messageService.add({ severity: 'error', summary: 'Selectionnez tous les gagnants!!', detail: "Par type de cote" });
    } else {
      //console.log("cote gagnant", this.selectedCotes);
      this.selectedCotes.forEach(cote => {
        this.operationParCote(cote);
        /*
        let index = this.programme.listeCotes.map(x => x._id).indexOf(cote._id);
        this.programme.listeCotes.splice(index, 1);*/
        this.setStatutCote(cote);
      });
      //console.log("cote perdant", this.programme.listeCotes);
     /* this.programme.listeCotes.forEach(perdant => {
        this.setStatutCote(perdant, 2);
      });*/
    }
  }


  addOperation(p: Pari) {
    //console.log("Operation  " + type);
    let operation = new Operation();
    operation.typeOperation = new TypeOperation();
    operation.typeOperation._id = this.typeOperation.Gain;
    operation.montant = p.gain;
    operation.solde = p.utilisateur.solde + p.gain;
    operation.created_at = new Date();
    console.log("operation", operation);

    this.operationService.post(operation).subscribe(res => {
      console.log(res);
    });


  }

  operationParCote(cote: Cote) {
    this.pariService.getParisByCote(cote).subscribe(pari => {
      let listepari: Pari[] = [];
      listepari = pari;
      if (listepari.length != 0) {
        console.log("Liste pari", listepari);
        listepari.forEach(p => {
          this.addOperation(p);
        });
      }
    });
  }

  setStatutCote(cote: Cote) {
    cote.win = true;
    console.log("cote à modifier", cote);
    this.coteService.update(cote).subscribe(res => {
      console.log(res);
    });
  }
}
