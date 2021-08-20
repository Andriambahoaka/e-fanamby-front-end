import { Component, OnInit } from '@angular/core';
import { Pari } from '../model/pari.model';
import { Utilisateur } from '../model/utilisateur.model';
import { PariService } from '../service/pari.service';
import { ProgrammeService } from '../service/programme.service';

@Component({
  selector: 'app-mes-paris',
  templateUrl: './mes-paris.component.html',
  styleUrls: ['./mes-paris.component.css']
})
export class MesParisComponent implements OnInit {

  constructor(private pariservice:PariService,private programmeservice:ProgrammeService) { }

  listPari:Pari[]=[];
  user:Utilisateur=JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;

  ngOnInit(): void {
   /* this.pariservice.getParis().subscribe(data=>{
        this.listPari=data;
        console.log(data);
    });
    */

    this.pariservice.getParisByJoueur(this.user.id).subscribe(pari=>{
          this.listPari=pari;
          console.log(pari);
          this.listPari.forEach(p=>{
            console.log(p.cote);
           // console.log(p.statutText=this.pariservice.statutText(p.cote.statut));
          //  console.log(p.cote.idProgramme);
          //  p.cote.programme=this.programmeservice.getProgrammeByIdStatique(p.cote.idProgramme);
          });
          //console.log(pari);
    });
  }
}
