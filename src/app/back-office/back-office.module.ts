import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { OperationComponent } from './operation/operation.component';
import { TypeOperationComponent } from './type-operation/type-operation.component';
import { CoteComponent } from './cote/cote.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ParametreCoteComponent } from './parametre-cote/parametre-cote.component';
import { TypeCoteComponent } from './type-cote/type-cote.component';
import { PariComponent } from './pari/pari.component';
import { ModeleCoteComponent } from './modele-cote/modele-cote.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import { ProgrammeComponent } from './programme/programme.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {ListboxModule} from 'primeng/listbox';
import { ResultatComponent } from './resultat/resultat.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CategorieComponent } from './categorie/categorie.component';
import { EquipeComponent } from './equipe/equipe.component';
import { AfficheComponent } from './affiche/affiche.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './categorie/edit-categorie/edit-categorie.component';
import { EditEquipeComponent } from './equipe/edit-equipe/edit-equipe.component';
import { AddEquipeComponent } from './equipe/add-equipe/add-equipe.component';
import { AddProgrammeComponent } from './programme/add-programme/add-programme.component';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    OperationComponent,
    TypeOperationComponent,
    CoteComponent,
    MenuComponent,
    ParametreCoteComponent,
    TypeCoteComponent,
    PariComponent,
    ModeleCoteComponent,
    ProgrammeComponent,
    NavMenuComponent,
    ResultatComponent,
    LoginComponent,
    DashboardComponent,
    UtilisateurComponent,
    CategorieComponent,
    EquipeComponent,
    AfficheComponent,
    AddCategorieComponent,
    EditCategorieComponent,
    EditEquipeComponent,
    AddEquipeComponent,
    AddProgrammeComponent,




  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    FormsModule,ToastModule,ListboxModule,ReactiveFormsModule,
    RadioButtonModule,MessagesModule,TooltipModule
  ],
  providers: [MessageService]
})
export class BackOfficeModule { }
