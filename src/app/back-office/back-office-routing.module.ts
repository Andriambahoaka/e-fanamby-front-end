import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CoteComponent } from './cote/cote.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEquipeComponent } from './equipe/add-equipe/add-equipe.component';
import { EquipeComponent } from './equipe/equipe.component';
import { LoginComponent } from './login/login.component';
import { ModeleCoteComponent } from './modele-cote/modele-cote.component';
import { OperationComponent } from './operation/operation.component';
import { ParametreCoteComponent } from './parametre-cote/parametre-cote.component';
import { PariComponent } from './pari/pari.component';
import { AddProgrammeComponent } from './programme/add-programme/add-programme.component';
import { ProgrammeComponent } from './programme/programme.component';
import { ResultatComponent } from './resultat/resultat.component';
import { TypeCoteComponent } from './type-cote/type-cote.component';
import { TypeOperationComponent } from './type-operation/type-operation.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [
  { path:'pari', component: PariComponent},
  { path:'login', component: LoginComponent},
  { path:'operation', component: OperationComponent},
  { path:'programme', component: ProgrammeComponent},
  { path:'add/programme', component: AddProgrammeComponent},
  { path:'operation', component: OperationComponent},
  { path:'type-operation', component: TypeOperationComponent},
  { path:'modele-cote', component: ModeleCoteComponent},
  { path:'cote/:id', component: CoteComponent},
  { path:'resultat/:id', component: ResultatComponent},
  { path:'type-cote', component: TypeCoteComponent},
  { path:'parametre-cote', component: ParametreCoteComponent},
  { path:'dashboard', component: DashboardComponent},
  { path:'categorie', component: CategorieComponent},
  { path:'add/categorie', component:AddCategorieComponent},
  { path:'edit/categorie/:id', component:AddCategorieComponent},
  { path:'utilisateur', component: UtilisateurComponent},
  { path:'equipe', component: EquipeComponent},
  { path:'add/equipe', component: AddEquipeComponent},
  { path:'add/equipe/:id', component:AddEquipeComponent},
  { path:'utilisateur', component: EquipeComponent},
  { path:'add/utilisateur', component: AddEquipeComponent},
  { path:'edit/utilisateur/:id', component:AddEquipeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
