import { Component, OnInit } from '@angular/core';
import { Programme } from '../../model/programme.model';
import { ProgrammeService } from '../../service/programme.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {Message} from 'primeng//api';
import { CoteService } from 'src/app/service/cote.service';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['../back-office.css']
})
export class ProgrammeComponent implements OnInit {

  constructor(private programmeService:ProgrammeService,private coteService:CoteService,private confirmationService: ConfirmationService, private messageService: MessageService,    private route: ActivatedRoute,
    private router: Router) { }

  listProgramme:Programme[];

  ngOnInit(): void {
   /* this.programmeService.getProgrammes().subscribe(data=>{
      this.listProgramme=data;
      this.listProgramme.forEach(p=>{
          this.coteService.getCotesByProgramme(p.id_programme).subscribe(data=>{
              p.listeCotes=data;
          });
      });
   });*/

   this.listProgramme=this.programmeService.getProgrammesStatique();
   this.listProgramme.forEach(p=>{
    this.coteService.getCotesByProgramme(p.id_programme).subscribe(data=>{
      console.log("cotes",data);
        p.listeCotes=data;
    });
});

  }

/*

  openConfirmation(event: Programme){
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment supprimer ce programme?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Programme supprimé avec succès !'});
          this.programmeService.deleteProgramme(event).subscribe(response=>{
            console.log(response);
          });
      },
      reject: (type: any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'Rejeté'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'Vous avez annulé'});
              break;
          }
      }
  });


  }*/

  edit(e:Programme){
      this.router.navigate(['/edit-programme',e.id_programme]);
  }
}
