import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['../back-office.css']

})
export class NavMenuComponent implements OnInit {

  constructor() { }
  userConnected: any;


  ngOnInit(): void {
    this.userConnected = JSON.parse(localStorage.getItem('userConnected') || '{}');

  }

}
