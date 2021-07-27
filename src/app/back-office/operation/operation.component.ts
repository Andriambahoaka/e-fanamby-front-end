import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/model/operation.model';
import { NavService } from 'src/app/service/nav.service';
import { OperationService } from 'src/app/service/operation.service';


@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['../back-office.css']
})
export class OperationComponent implements OnInit {

  constructor(private nav: NavService,private operaService:OperationService) {
    this.nav.hide();
  }

  userConnected: any;
  listOperation:Operation[]=[];


  ngOnInit(): void {
    this.userConnected = JSON.parse(localStorage.getItem('userConnected') || '{}');
    this.operaService.get().subscribe(data=>{
      this.listOperation=data;
    });
  }



}
