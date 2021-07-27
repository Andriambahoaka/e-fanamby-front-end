import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import {MenubarModule} from 'primeng/menubar';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ListboxModule} from 'primeng/listbox';
import {DropdownModule} from 'primeng/dropdown';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MenuModule} from 'primeng/menu';
import { Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnexionDialog, GuideDialog, NavComponent } from './nav/nav.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AccueilComponent } from './accueil/accueil.component';
import {StepsModule} from 'primeng/steps';
import {InputMaskModule} from 'primeng/inputmask';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {MegaMenuModule} from 'primeng/megamenu';
import {CardModule} from 'primeng/card';
import { InscriptionComponent } from './inscription/inscription.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';
import { MesParisComponent } from './mes-paris/mes-paris.component';
//import { AuthGuard } from './service/auth.guard';


const routes: Routes = [
]


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CategorieComponent,
    AccueilComponent,
    InscriptionComponent,
    ConnexionDialog,
    GuideDialog,
    FooterComponent,
    MesParisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule,MatSidenavModule, MatToolbarModule,MatMenuModule,
    MatDatepickerModule,PanelMenuModule,MenuModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,MatSnackBarModule,ListboxModule,
    DropdownModule,InputTextModule, NgbModule,MatSelectModule,MegaMenuModule,CardModule,ButtonModule,
    ConfirmDialogModule,CalendarModule,MessageModule,MessagesModule,StepsModule,InputMaskModule,CheckboxModule,ToastModule,
    MenubarModule,InputNumberModule,MatDialogModule
  ],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
