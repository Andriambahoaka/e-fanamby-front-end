import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../back-office.css'],
 // providers:[MessageService]
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, private router: Router, private _snackBar: MatSnackBar,private messageService: MessageService) {
  }

  form: FormGroup;
  private formSubmitAttempt: boolean;
  email = "";
  mdp = "";
  //msgs:Message[]=[];
  loading=false;
  error="";

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      mdp: ['', Validators.required]
    });
  }



  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
   // this.msgs=[];
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
        user.roles=response.body["roles"];
        if(user.roles.includes('ROLE_ADMIN')){
          console.log(user.roles);
                  /////A modifier
        //user.solde=3000;
        this._snackBar.open('Bienvenue '+ user.username+ "!!");
        localStorage.setItem('userConnected', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', "true")
       // window.location.reload();
        this.router.navigate(["/admin/dashboard"]);

        }else{
          this.loading=false;
          console.log(user.roles);
         // this.messageService.add({severity:'error', summary:'Non autorisé', detail:"Vous n'êtes pas administrateur "});
          this.error="Vous n'êtes pas administrateur";

        }
      },error=>{
        console.log(error.status); //401 Unauthorized
        this.loading=false;
       // this.messageService.add({severity:'error', summary:'Réessayez', detail:'Email ou mot de passe érroné'});
        this.error="Email ou mot de passe érroné";
      });
    }
    this.formSubmitAttempt = true;
  }

}
