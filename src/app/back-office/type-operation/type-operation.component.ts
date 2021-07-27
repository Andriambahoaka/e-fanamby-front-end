import { Component, OnInit } from '@angular/core';
import { TypeOperation } from 'src/app/model/type-operation.model';
import { TypeOperationService } from 'src/app/service/type-operation.service';

@Component({
  selector: 'app-type-operation',
  templateUrl: './type-operation.component.html',
  styleUrls: ['../back-office.css']
})
export class TypeOperationComponent implements OnInit {

  constructor(private typeOpService: TypeOperationService) { }
  libelle: string;
  listTypeOperation:TypeOperation[]=[];

  ngOnInit(): void {
    this.typeOpService.get().subscribe(data=>{
      console.log("Type operation",data);
      this.listTypeOperation=data;
    });
  }

  ajouter() {
    var typeOp = new TypeOperation();
    typeOp.libelle = this.libelle;
    this.typeOpService.post(typeOp).subscribe(response => {
      console.log(response);
    });
    this.listTypeOperation.push(typeOp);
  }

  supprimer(typeOp:TypeOperation){
    console.log(typeOp);
    this.typeOpService.delete(typeOp).subscribe(response => {
      console.log(response);
    });
    var index=this.listTypeOperation.indexOf(typeOp);
    this.listTypeOperation.splice(index,1);

  }

}
