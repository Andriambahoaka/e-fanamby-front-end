import { Component, OnInit } from '@angular/core';
import { Pari } from '../model/pari.model';
import { PariService } from '../service/pari.service';

@Component({
  selector: 'app-mes-paris',
  templateUrl: './mes-paris.component.html',
  styleUrls: ['./mes-paris.component.css']
})
export class MesParisComponent implements OnInit {

  constructor(private pariservice:PariService) { }

  listPari:Pari[];

  ngOnInit(): void {
    this.pariservice.getParis().subscribe(data=>{
        this.listPari=data;
    });
  }
}
