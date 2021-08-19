import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/model/operation.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { OperationService } from 'src/app/service/operation.service';

@Component({
  selector: 'app-mes-operations',
  templateUrl: './mes-operations.component.html',
  styleUrls: ['./mes-operations.component.css']
})
export class MesOperationsComponent implements OnInit {

  constructor(private operationService: OperationService) { }
  listeOperation: Operation[];
  user: Utilisateur = JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  ngOnInit(): void {
    this.operationService.getByJoueur(this.user.id).subscribe(res => {
      console.log("Operation by joueur", res);
    });
  }
}
