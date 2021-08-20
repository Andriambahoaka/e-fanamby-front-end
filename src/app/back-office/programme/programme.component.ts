import { Component, OnInit } from '@angular/core';
import { Programme } from '../../model/programme.model';
import { ProgrammeService } from '../../service/programme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoteService } from 'src/app/service/cote.service';


@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['../back-office.css']
})
export class ProgrammeComponent implements OnInit {

  constructor(private programmeService: ProgrammeService, private coteService: CoteService, private confirmationService: ConfirmationService, private messageService: MessageService, private route: ActivatedRoute,
    private router: Router) { }

  listProgramme: Programme[];
  loading: boolean = false;
  loadingClose:boolean=false;
  loadingDelete:boolean=false;

  page: number = 1;
  size: number = 5;
  totalPages:number;
  first:boolean=true;
  last:boolean=false;
  search:string;




  ngOnInit(): void {
     this.paginate(this.page,this.size);
    /*
    this.programmeService.getPaginated(this.page,this.size).subscribe(res => {
      console.log("programme from oracle", res);
      this.listProgramme = res["content"];
      this.totalPages=res["totalPages"];
      console.log(this.listProgramme);
      this.listProgramme.forEach(p => {
        this.coteService.getCotesByProgramme(p.id).subscribe(data => {
          console.log("cotes", data);
          p.listeCotes = data;
        });
      });
      this.loading = false;
    });
    /*
    this.listProgramme=this.programmeService.getProgrammesStatique();
    this.listProgramme.forEach(p=>{
      this.coteService.getCotesByProgramme(p.id).subscribe(data=>{
        console.log("cotes",data);
         p.listeCotes=data;
      });
    });*/

  }



  counter(i: number) {
    return new Array(i);
}
  paginate(page:number,size:number){
    this.page=page;
    this.loading=true;
    this.programmeService.getPaginated(page,size).subscribe(res=>{
        this.listProgramme=res["content"];
        this.totalPages=res["totalPages"];
        console.log(res["totalPages"]);
        console.log(res["last"]);
        console.log(res["first"]);
        this.first=res["first"];
        this.last=res["last"];
        this.listProgramme.forEach(p => {
          this.coteService.getCotesByProgramme(p.id).subscribe(data => {
            console.log("cotes", data);
            p.listeCotes = data;
          });
        });

        this.loading=false;
    },error=>{
      console.log(error);
      this.messageService.add({severity:"error",summary:"Erreur",detail:"Impossible d'afficher la liste des programmes"});
      this.loading=false;
    });
  }

  active(i:number):string{
    if(this.page==i){
       return "active";
    }else{
      return " ";
    }
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

  edit(id: number) {
    this.router.navigate(['/admin/cote', id]);
  }

  goToResultat(id: number) {
    console.log(id);
    this.router.navigate(['/admin/resultat', id]);
  }

  close(p:Programme) {
    this.loadingClose=true;
    console.log(close,p);
    p.etat.id=3;
    this.programmeService.updateProgramme(p).subscribe(res=>{
      console.log("response update",res);
      this.loadingClose=false;
    },error=>{
      console.log(error.status);
      this.messageService.add({severity:'error', summary:'Erreur', detail:'code in delete '+error.status});
    });
  }

  delete(p: Programme) {
    this.loadingDelete=true;
    this.programmeService.deleteProgramme(p).subscribe(res => {
      this.messageService.add({severity:"success",summary:"Succès",detail:p.libelle+" a été supprimé"});
      console.log("delete", res);
      this.loadingDelete=false;
    },error=>{
      console.log(error.status);
      this.messageService.add({severity:"error",summary:"Echec de Suppression",detail:"Impossible de supprimé "+error.status});
      this.loadingDelete=false;
    });
  }
}
