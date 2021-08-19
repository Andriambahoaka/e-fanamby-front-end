import { Component, OnInit } from '@angular/core';
import { Pari } from 'src/app/model/pari.model';
import { PariService } from 'src/app/service/pari.service';
import { ProgrammeService } from 'src/app/service/programme.service';

@Component({
  selector: 'app-pari',
  templateUrl: './pari.component.html',
  styleUrls: ['../back-office.css']
})
export class PariComponent implements OnInit {

  constructor(private pariService:PariService,private programmeservice:ProgrammeService) { }

  listPari:Pari[]=[];

  ngOnInit(): void {

     this.pariService.getParis().subscribe(data=>{
      console.log(data);
      this.listPari=data;
      this.listPari.forEach(p=>{
        // console.log(p.cote);
       //  console.log(p.cote.idProgramme);
         p.cote.programme=this.programmeservice.getProgrammeByIdStatique(p.cote.idProgramme);
       });
     });
  }

}
