import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Categorie } from 'src/app/model/categorie.model';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['../../back-office.css'],
  providers: [MessageService]
})
export class AddCategorieComponent implements OnInit {

  constructor(private route: ActivatedRoute,private categorieS:CategorieService,private messageService: MessageService) { }

  categorie:Categorie=new Categorie();
  id:number;
  listCategorie:Categorie[];
  parent:Categorie;

  loading = false;
  loadingAjout=false;
  edit:boolean;
  //user:Utilisateur=JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
  succes:boolean=false;

  ngOnInit(): void {
    this.categorieS.getCategories().subscribe(res=>{
      console.log("liste catégorie",res);
      this.listCategorie=res;
},error => {
  console.log(error.status); //401 Unauthorized
  this.loading = false;
  this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: "Erreur pendant l'affichage des parents" + error.status });
});

    if(this.route.snapshot.params.id){
      this.edit=true;
      this.loading = true;
      this.id = +this.route.snapshot.params.id;
      this.categorieS.getCategorieById(this.id).subscribe(res=>{
            console.log("categorieById",res);
            this.categorie=res;
            this.loading = false;
      },error => {
        console.log(error.status); //401 Unauthorized
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: "Erreur pendant l'affichage de la catégorie à modifier" + error.status });
      });
    }else{
      this.edit=false;
    }
  }

  ajouter(){
    console.log(this.parent);
    this.loadingAjout = true;
    this.categorie.parent=this.parent;
    if(!this.categorie){
      this.messageService.add({ severity: 'error', summary: 'Réessayez',detail: "Compléter les informations"});
      this.loadingAjout = false;

    }else{
      if(this.route.snapshot.params.id){
        console.log("modifier",this.categorie);
        this.categorieS.putCategorie(this.categorie).subscribe(res=>{
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: res['msg']});
          this.succes=true;
          this.loadingAjout = false;
        }, error => {
          console.log(error.status); //401 Unauthorized
          this.loading = false;
          this.loadingAjout = false;
          this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: 'Erreur de modification ' + error.status });
        });
      }else{
        console.log("ajout",this.categorie);
        this.categorie.createdAt=new Date();
        this.categorieS.postCategorie(this.categorie).subscribe(res=>{
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: res['msg']});
          this.succes=true;
          this.loadingAjout = false;
        }, error => {
          console.log(error.status); //401 Unauthorized
          this.loadingAjout = false;
          this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: "Erreur d'ajout " + error.status });
        });
      }
    }

  }
/*
  modifier(){
    console.log("modifier",this.categorie);
    this.categorieS.putCategorie(this.categorie).subscribe(res=>{
      console.log("response put",res);
});

  }*/

}
