import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { growAnimation, fadeAnimation } from '../shared/animations/my-animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Utilisateur } from '../model/utilisateur.model';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavService } from '../service/nav.service';
import { MessagingService } from '../service/messaging.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  notification: string[] = [];
  items: MenuItem[];
  stateAnim = 'in';
  userConnected: any;
  opened=false;




  constructor(private messagingService: MessagingService,
    public dialog: MatDialog, private authService: AuthService, private router: Router, public nav: NavService
  ) { }

  ngOnInit() {
    //this.userConnected=JSON.parse(localStorage.getItem('userConnected'));
    this.userConnected = JSON.parse(localStorage.getItem('userConnected') || '{}');
    this.notification = this.messagingService.getNotification();
  }



  isConnected(): boolean {
    if (localStorage.getItem('isLoggedIn') == "true") {
      return true;
    }
    else {
      return false;
    }

    ///return this.authService.loggedIn;
  }

  logOut() {
    this.authService.logOut();
  }

  /* seDeconnecter() {
     this.seDeconnecterEvent.emit('true');
   }*/


  GuideDialog() {
    const dialogRef = this.dialog.open(GuideDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  showSide(){
    this.opened=true;
  }


  connexionDialog(): void {
    const dialogRef = this.dialog.open(ConnexionDialog, {
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
  templateUrl: 'connexion.html',
  styleUrls: ['./nav.component.scss'],
  providers: [MessageService]
})
export class ConnexionDialog {

  constructor(
    public dialogRef: MatDialogRef<ConnexionDialog>,
    private fb: FormBuilder,
    private authService: AuthService, private router: Router, private _snackBar: MatSnackBar,private messageService: MessageService) {
  }

  form: FormGroup;
  private formSubmitAttempt: boolean;
  email = "";
  mdp = "";
  msgs:Message[]=[];
  loading=false;

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      mdp: ['', Validators.required]
    });
  }

  annuler(): void {
    this.dialogRef.close();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.msgs=[];
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].markAsDirty();
      });
    } else {
      this.loading=true;
      var u = new Utilisateur();
      u.username = this.email;
      u.password = this.mdp;
      /*
        if(this.authService.signIn(u)){
          this.errone="";
          this._snackBar.open('Bienvenue '+ u.username+ "!!");
          this.dialogRef.close();
          this.router.navigate([" "]);

        }else{
          this.errone="Email ou mot de passe érroné !!"
        }*/

      this.authService.signIn(u).subscribe(response => {
        console.log(response.status); // 200 OK
        console.log(response);
        let user=new Utilisateur();
        user.id=response.body["id"];
        user.username=response.body["username"];
        user.email=response.body["email"];
        user.dateNaissance=response.body["dateNaissance"];
        user.password=response.body["password"];
        user.token=response.body["accessToken"];
        /////A modifier
        user.solde=3000;

        this._snackBar.open('Bienvenue '+ user.username+ "!!");
        this.dialogRef.close();
        localStorage.setItem('userConnected', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', "true")
        window.location.reload();
        //this.router.navigate([" "]);
/*
        if (response==response.status) {
          console.log(response["accessToken"]);

          console.log("Connected");
        } else {
          console.log(response.status);
          console.log(response["status"]);
          console.log("Email ou mot de passe");
        }*/
      },error=>{
        console.log(error.status); //401 Unauthorized
        this.loading=false;
        this.messageService.add({severity:'error', summary:'Réessayez', detail:'Email ou mot de passe érroné'});
      });
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
