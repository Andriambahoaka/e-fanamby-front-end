import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { OperationComponent } from './operation/operation.component';
import { TypeOperationComponent } from './type-operation/type-operation.component';
import { CoteComponent } from './cote/cote.component';

import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ParametreCoteComponent } from './parametre-cote/parametre-cote.component';
import { TypeCoteComponent } from './type-cote/type-cote.component';
import { PariComponent } from './pari/pari.component';
import { ModeleCoteComponent } from './modele-cote/modele-cote.component';


import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgrammeComponent } from './programme/programme.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
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
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    FormsModule,ToastModule
  ],
  providers: [MessageService]
})
export class BackOfficeModule { }
