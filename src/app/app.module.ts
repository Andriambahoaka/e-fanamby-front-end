import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



/////Badge /////
//import {BadgeModule} from 'primeng/badge';
import {MatBadgeModule } from '@angular/material/badge';


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
import { MenubarModule} from 'primeng/menubar';
import { InputNumberModule} from 'primeng/inputnumber';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
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

//import { MessagingService } from './service/messaging.service';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MessagingService } from './service/messaging.service';
import { AsyncPipe } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
//import { NgxPayPalModule } from 'ngx-paypal';
import { NgxPayPalModule } from '../../projects/ngx-paypal-lib/src/public_api';

import {FlexLayoutModule} from "@angular/flex-layout";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { MesOperationsComponent } from './mon-compte/mes-operations/mes-operations.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MenuCompteComponent } from './mon-compte/menu-compte/menu-compte.component';
import { DepotComponent } from './mon-compte/depot/depot.component';
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
    MesParisComponent,
    MonCompteComponent,
    MesOperationsComponent,
    MenuCompteComponent,
    DepotComponent
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
    MenubarModule,InputNumberModule,MatDialogModule,MatBadgeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    FlexLayoutModule,BreadcrumbModule,
    MatProgressBarModule,NgxPayPalModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [MessagingService,ConfirmationService,MessageService,AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
