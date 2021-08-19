import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ParametreCote } from 'src/app/model/parametre-cote.model';
import { TypeCote } from 'src/app/model/type-cote.model';

import { ParametreCoteService } from 'src/app/service/parametre-cote.service';
import { TypeCoteService } from 'src/app/service/type-cote.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-type-cote',
  templateUrl: './type-cote.component.html',
  styleUrls: ['../back-office.css'],
  providers: [MessageService]
})
export class TypeCoteComponent implements OnInit {
  constructor(private typeCoteService: TypeCoteService
    , private pcService: ParametreCoteService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder) { }
  titre: string;
  listTypecote: TypeCote[] = [];
  listParametreCote: ParametreCote[] = [];
  selectedParametres: ParametreCote[];
  formGroup: FormGroup;





  ngOnInit(): void {
    this.typeCoteService.getTypesCotes().subscribe(data => {
      console.log("Type cote", data);
      this.listTypecote = data;
    });

    this.pcService.get().subscribe(data => {
      this.listParametreCote = data;
    });
    this.formGroup = this._formBuilder.group({
      titre: ['', Validators.required],
      selectedParametres: ['', Validators.required]
    });
  }

  ajouter() {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach((key) => {
        this.formGroup.controls[key].markAsDirty();
      });
      this.messageService.add({ severity: 'error', summary: 'Veuillez compléter les informations', detail: "" });
    } else {
      var pc = new TypeCote();
      pc.titre = this.titre;
      pc.created_at = new Date();
      pc.modele = this.selectedParametres;
      console.log(pc.modele);
      this.typeCoteService.postTypeCote(pc).subscribe(response => {
        console.log(response);
        //window.location.reload();
      });
      this.listTypecote.push(pc);
    }
  }

  supprimer(typeC: TypeCote) {
    console.log(typeC);
    this.typeCoteService.deleteTypeCote(typeC).subscribe(response => {
      console.log(response);
    });
    var index = this.listTypecote.indexOf(typeC);
    this.listTypecote.splice(index, 1);

  }

}
