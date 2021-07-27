import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoteComponent } from './cote/cote.component';
import { ModeleCoteComponent } from './modele-cote/modele-cote.component';
import { OperationComponent } from './operation/operation.component';
import { ParametreCoteComponent } from './parametre-cote/parametre-cote.component';
import { PariComponent } from './pari/pari.component';
import { ProgrammeComponent } from './programme/programme.component';
import { TypeCoteComponent } from './type-cote/type-cote.component';
import { TypeOperationComponent } from './type-operation/type-operation.component';

const routes: Routes = [
  { path:'pari', component: PariComponent},
  { path:'operation', component: OperationComponent},
  { path:'programme', component: ProgrammeComponent},
  { path:'type-operation', component: TypeOperationComponent},
  { path:'modele-cote', component: ModeleCoteComponent},
  { path:'cote', component: CoteComponent},
  { path:'type-cote', component: TypeCoteComponent},
  { path:'parametre-cote', component: ParametreCoteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
