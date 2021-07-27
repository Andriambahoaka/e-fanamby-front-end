import { Component, OnInit } from '@angular/core';
import { TypeCote } from 'src/app/model/type-cote.model';
import { TypeCoteService } from 'src/app/service/type-cote.service';

@Component({
  selector: 'app-type-cote',
  templateUrl: './type-cote.component.html',
  styleUrls: ['../back-office.css']
})
export class TypeCoteComponent implements OnInit {
  constructor(private typeCoteService: TypeCoteService) { }
  titre: string;
  listTypecote:TypeCote[]=[];

  ngOnInit(): void {
    this.typeCoteService.getTypesCotes().subscribe(data=>{
      console.log("Type cote",data);
      this.listTypecote=data;
    });
  }

  ajouter() {
    var pc = new TypeCote();
    pc.titre = this.titre;
    pc.created_at=new Date();
    console.log(pc);

    this.typeCoteService.postTypeCote(pc).subscribe(response => {
      console.log(response);
      //window.location.reload();
    });

    this.listTypecote.push(pc);
  }

  supprimer(typeC:TypeCote){
    console.log(typeC);
    this.typeCoteService.deleteTypeCote(typeC).subscribe(response => {
      console.log(response);
    });
    var index=this.listTypecote.indexOf(typeC);
    this.listTypecote.splice(index,1);

  }

}
