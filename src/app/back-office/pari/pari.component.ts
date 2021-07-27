import { Component, OnInit } from '@angular/core';
import { Pari } from 'src/app/model/pari.model';
import { PariService } from 'src/app/service/pari.service';

@Component({
  selector: 'app-pari',
  templateUrl: './pari.component.html',
  styleUrls: ['../back-office.css']
})
export class PariComponent implements OnInit {

  constructor(private pariService:PariService) { }

  listPari:Pari[]=[];

  ngOnInit(): void {

     this.pariService.getParis().subscribe(data=>{
      this.listPari=data;
     });

  }

}
