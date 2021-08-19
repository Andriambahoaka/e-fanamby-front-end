import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/model/operation.model';
import { NavService } from 'src/app/service/nav.service';
import { OperationService } from 'src/app/service/operation.service';
import { BooleanLiteral } from 'typescript';


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
  loading:Boolean=false;


  ngOnInit(): void {
    this.loading=true;
    this.userConnected = JSON.parse(localStorage.getItem('userConnected') || '{}');
    this.operaService.get().subscribe(data=>{
      console.log(data);
      this.listOperation=data;
      this.loading=false;
    });
  }



}
