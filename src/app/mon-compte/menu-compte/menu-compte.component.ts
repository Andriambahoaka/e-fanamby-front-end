import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-compte',
  templateUrl: './menu-compte.component.html',
  styleUrls: ['./menu-compte.component.css']
})
export class MenuCompteComponent implements OnInit {

  constructor() {

  }
  items: MegaMenuItem[];

  ngOnInit() {
    this.initMenu();

  }


  initMenu() {
    this.items = [
      {
        label: 'Informations', icon: 'pi pi-fw pi-info', routerLink: ['/mon-compte']
      },
      {
        label: 'Mes operations', routerLink: ['/mes-operations'], icon: 'pi pi-fw pi-credit-card'
      },
      {
        label: 'Faire un depôt', routerLink: ['/depot'], icon: 'pi pi-fw pi-paypal',
      }
    ]

  }

}
