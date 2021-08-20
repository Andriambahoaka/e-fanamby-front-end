import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Categorie } from 'src/app/model/categorie.model';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['../back-office.css'],
  providers: [MessageService]
})
export class CategorieComponent implements OnInit {

  constructor(private categorieS:CategorieService,private router: Router,private messageService: MessageService) { }

  categories:Categorie[];
  loading=false;
  loadingDelete=false;

  ngOnInit(): void {
    this.loading=true;
    this.categorieS.getCategories().subscribe(res=>{
      console.log("Response get categories", res);
      this.categories=res;
      this.loading=false;
    },error=>{
      console.log(error.status); //401 Unauthorized
      this.loading=false;
      this.messageService.add({severity:'error', summary:'Réessayez', detail:"Erreur pendant l'affichage des catégories" +error.status});
    });
  }




  delete(e:Categorie){
    this.loadingDelete=true;
    this.categorieS.deleteCategorie(e).subscribe(data => {
      console.log("Response delete categorie", data);
      this.messageService.add({severity:'success', summary:'Succès', detail:'Elément supprimé'});
      this.categories.splice(this.categories.indexOf(e),1);
      this.loadingDelete=false;
      /*
        this.router.navigate(['/admin/categorie'])
        .then(() => {
          window.location.reload();
        });*/
    },error=>{
      console.log(error.status); //401 Unauthorized
      if(error.status==409){ // Conflict
        console.log("Ato");
        this.messageService.add({severity:'error', summary:'Echec de suprression', detail:'Cette catégorie comporte déjà des programmes'});
      }else{
        this.messageService.add({severity:'error', summary:'Réessayez', detail:'Erreur de suprression '+error.status});
      }
      this.loadingDelete=false;
    });
  }

  edit(id:number){
    this.router.navigate(['/admin/edit/categorie',id]);

  }

}
