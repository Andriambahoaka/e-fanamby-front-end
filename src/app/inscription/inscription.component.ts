import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { growAnimation, fadeAnimation } from '../shared/animations/my-animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [MessageService],
  animations: [
    growAnimation,
    fadeAnimation
  ]
})
export class InscriptionComponent implements OnInit {

  constructor(private messageService: MessageService, private _formBuilder: FormBuilder,private nav:NavService) {
    this.nav.hide();
   }
  activeIndex: number = 0;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  activeStepOne: boolean=true;
  activeStepTwo: boolean;
  activeStepThree: boolean;
  activeStepFour: boolean;


  nom: string;
  prenom='';
  email:string='';
  dateNaissance=null;
  adresse='';
  contact='';
  sexe='';
  mdp='';

  items: MenuItem[];

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      contact: ['', Validators.required],
      sexe: ['', Validators.required]
    });


    this.secondFormGroup = this._formBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      mdp: ['',Validators.required],
      confirmMdp: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('mdp', 'confirmMdp')
    });


    console.log(this.secondFormGroup.controls.email.dirty);

    this.items = [{
      label: 'Personnel',
      command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({ severity: 'info', summary: 'Information personelle', detail: event.item.label });
      }
    },
    {
      label: 'Autre',
      command: (event: any) => {
        this.activeIndex = 1;
        this.messageService.add({ severity: 'info', summary: 'Autres Informations', detail: event.item.label });
      }
    },
    {
      label: 'Paiement',
      command: (event: any) => {
        this.activeIndex = 2;
        this.messageService.add({ severity: 'info', summary: 'Information de paiement', detail: event.item.label });
      }
    },
    {
      label: 'Confirmation',
      /* command: (event: any) => {
           this.activeIndex = 3;
           this.messageService.add({severity:'info', summary:'Confirmer tout', detail: event.item.label});
       }*/
    }
    ];
  }


  stepOne() {
    this.activeIndex = 0;
    this.activeStepOne = true;
    this.activeStepTwo = false;


  }


  stepTwo() {
    if (this.firstFormGroup.invalid) {
      Object.keys(this.firstFormGroup.controls).forEach((key) => {
        this.firstFormGroup.controls[key].markAsDirty();
      });
      this.messageService.add({ severity: 'error', summary: 'Veuillez compléter les informations', detail: "" });
    } else {
      this.activeIndex = 1;
      this.activeStepOne = false;
      this.activeStepTwo = true;
      this.activeStepThree = false;
    }
  }


  stepThree() {

    console.log(this.secondFormGroup.controls.email.errors);

    if (this.secondFormGroup.invalid) {
      Object.keys(this.secondFormGroup.controls).forEach((key) => {
        this.secondFormGroup.controls[key].markAsDirty();
      });
/*
      if(this.secondFormGroup.controls.email.errors && (this.secondFormGroup.controls.email.dirty || this.secondFormGroup.controls.email.touched)){
        this.messageService.add({ severity: 'error', summary: 'Adresse email invalide', detail: "" });
      }

      if(this.secondFormGroup.controls.confirmedValidator){
        this.messageService.add({ severity: 'error', summary: 'Les mots de passe doivent correspondre', detail: "" });
      }*/

    }else{
      this.activeIndex = 2;
      this.activeStepTwo = false;
      this.activeStepThree = true;
      this.activeStepFour = false;

    }
  }

  stepFour() {
    this.activeIndex = 3;
    this.activeStepThree = false;
    this.activeStepFour = true;

  }

  valider() {

  }




}
