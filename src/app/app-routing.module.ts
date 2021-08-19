import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProgrammeComponent } from './back-office/programme/programme.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthGuard } from './service/auth.guard';
import { MesParisComponent } from './mes-paris/mes-paris.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { MesOperationsComponent } from './mon-compte/mes-operations/mes-operations.component';
import { DepotComponent } from './mon-compte/depot/depot.component';

const routes: Routes = [

{path:'',component:AccueilComponent},
{path:'accueil',component:AccueilComponent,canActivate:[AuthGuard]},
{path:'programme',component:ProgrammeComponent,canActivate:[AuthGuard]},
{path:'mes-paris',component:MesParisComponent,canActivate:[AuthGuard]},
{path:'mon-compte',component:MonCompteComponent,canActivate:[AuthGuard]},
{path:'mes-operations',component:MesOperationsComponent,canActivate:[AuthGuard]},
{path:'inscription',component: InscriptionComponent},
{path:'depot',component: DepotComponent},
{
  path: 'admin',
  loadChildren: () => import('./back-office/back-office.module').then(m => m.BackOfficeModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
