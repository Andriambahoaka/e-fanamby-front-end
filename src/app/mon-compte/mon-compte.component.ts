import { Component, OnInit } from '@angular/core';
import {MegaMenuItem,MenuItem, MessageService} from 'primeng/api';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { Utilisateur } from '../model/utilisateur.model';
import { fadeAnimation, growAnimation } from '../shared/animations/my-animations';
import { UtilisateurService } from '../service/utilisateur.service';
import { TransientIdentifier } from 'typescript';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css'],
  animations: [growAnimation, fadeAnimation]
})
export class MonCompteComponent implements OnInit {

  constructor( private utilisateurService:UtilisateurService, private messageService: MessageService, private _fb: FormBuilder) {

   }

  breadItems: MenuItem[];
  userForm: FormGroup;
  display = false;
  load: boolean = false;
  user: Utilisateur;
  stateAnim = 'in';


  username:string;
  //dateNaissance:Date;
  email:string;




  ngOnInit() {

      this.initForm();
      this.initUser();
      this.initFormEdit(this.user);
  }



  initUser(){
    this.user=JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  }

  initForm() {
    this.userForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
    //  dateNaissance: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  initFormEdit(user:Utilisateur){
    console.log(user);
    this.userForm.setValue({
      username: user.username,
      email: user.email,
      //dateNaissance: user.dateNaissance,
      password: ''
    });
  }


  displayUpdate() {
    this.display = !this.display;
  }

  onValidEditUser(){
    console.log(this.userForm.controls["password"].value);
    if(this.userForm.controls["password"].value!=this.user.password){
      console.log(this.user.password);
      this.messageService.add({ severity: 'error', summary: 'Réessayer', detail: "Mot de passe incorrect'" });
    }else{
      let u = new Utilisateur();
      u.username=this.userForm.controls["password"].value;
      u.email=this.userForm.controls["email"].value;
    //  u.dateNaissance=this.userForm.controls["dateNaissance"].value;
      console.log(u);

      this.utilisateurService.updateUtilisateur(u).subscribe(res=>{
             console.log(res);
      });
    }

  }


}
