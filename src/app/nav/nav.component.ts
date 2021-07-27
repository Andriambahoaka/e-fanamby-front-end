import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { growAnimation, fadeAnimation } from '../shared/animations/my-animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Utilisateur } from '../model/utilisateur.model';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavService } from '../service/nav.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    growAnimation,
    fadeAnimation
  ]
})

export class NavComponent {

  @Output() seDeconnecterEvent = new EventEmitter<string>();

  notification = [];
  items: MenuItem[];
  stateAnim = 'in';
  userConnected:any;


  constructor(
    public dialog: MatDialog, private authService: AuthService,private router:Router,public nav: NavService
  ) { }

  ngOnInit() {
    //this.userConnected=JSON.parse(localStorage.getItem('userConnected'));
    this.userConnected=JSON.parse(localStorage.getItem('userConnected') || '{}')
  }

  isConnected():boolean{
    if (localStorage.getItem('isLoggedIn') == "true") {
      return true;
    }
    else {
      return false;
    }

    ///return this.authService.loggedIn;
  }

  logOut(){
    this.authService.logOut();
  }

 /* seDeconnecter() {
    this.seDeconnecterEvent.emit('true');
  }*/


  GuideDialog(){
    const dialogRef = this.dialog.open(GuideDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


  connexionDialog(): void {
    const dialogRef = this.dialog.open(ConnexionDialog,{
      height: '400px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'connexion',
  templateUrl: 'connexion.html'
})
export class ConnexionDialog {

  constructor(
    public dialogRef: MatDialogRef<ConnexionDialog>,
    private fb: FormBuilder,
    private authService: AuthService,private router:Router) {
  }

  form: FormGroup;
  private formSubmitAttempt: boolean;
  email="";
  mdp="";


  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      mdp: ['', Validators.required]
    });
  }

  annuler (): void {
    this.dialogRef.close();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].markAsDirty();
      });
    }else  {
      var u =new Utilisateur();
      u.email=this.email;
      u.password=this.mdp;
      u.nom="Andriam";
      u.prenom="Joe";
      //console.log(u);
      this.authService.logIn(u);
      this.dialogRef.close();
    }
    this.formSubmitAttempt = true;
  }

}

@Component({
  selector: 'guide',
  templateUrl: 'guide.html',
})
export class GuideDialog {

  constructor(
    public dialogRef: MatDialogRef<ConnexionDialog>) {
  }

}
