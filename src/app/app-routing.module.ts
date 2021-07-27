import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProgrammeComponent } from './back-office/programme/programme.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthGuard } from './service/auth.guard';
import { MesParisComponent } from './mes-paris/mes-paris.component';

const routes: Routes = [

{path:'',component:AccueilComponent},
{path:'accueil',component:AccueilComponent,canActivate:[AuthGuard]},
{path:'programme',component:ProgrammeComponent,canActivate:[AuthGuard]},
{path:'mes-paris',component:MesParisComponent,canActivate:[AuthGuard]},
{path:'inscription',component: InscriptionComponent},
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
