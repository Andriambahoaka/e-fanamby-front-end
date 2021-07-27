import { Component, OnInit, ViewChild } from '@angular/core';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { Categorie } from '../model/categorie.model';
import { Programme } from '../model/programme.model';
import { CategorieService } from '../service/categorie.service';
import { CoteService } from '../service/cote.service';
import { ProgrammeService } from '../service/programme.service';
import {MenuItem} from 'primeng/api';
import { Cote } from '../model/cote.model';
import { Panier } from '../model/panier.model';
import { Equipe } from '../model/equipe.model';
import { Pari } from '../model/pari.model';
import { TypeCote } from '../model/type-cote.model';
import { PariService } from '../service/pari.service';




@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: [MessageService]
})
export class AccueilComponent implements OnInit {


  constructor(private messageService: MessageService,private programmeService: ProgrammeService,
    private categorieService:CategorieService,private coteService: CoteService,private pariService: PariService) {

  }


  listProgramme: Programme[];
  listCategorie: Categorie[];
  items: MenuItem[]=[];
  status: boolean = false;
  listpanier:Panier[]=[];
  total:number=0;
  /*
  listPari:Pari[];
  value19: number = 200;
  equipe3:Equipe=new Equipe(2,"Equipe statique 1", "nom_coach",new Date());
  equipe4:Equipe=new Equipe(2,"Equipe statique 2", "nom_coach",new Date());

  listEquipe:Equipe[]=[this.equipe3,this.equipe4];*/

  ngOnInit(): void {
    /*this.programmeService.getProgrammes().subscribe(data => {
      this.listProgramme = data;
    });*/

  /*
    this.categorieService.getCategories().subscribe(data=>{
      this.listCategorie=data;
    });
  */


    this.listCategorie=this.categorieService.getCategoriesStatique();
    this.listCategorie.forEach(cat=>{
         this.items.push({label: cat.nom_categ});
    });
    this.listProgramme=this.programmeService.getProgrammesStatique();
    this.listProgramme.forEach(p=>{
     this.coteService.getCotesByProgramme(p.id_programme).subscribe(data=>{
       console.log("cotes",data);
         p.listeCotes=data;
     });
 });
 /*
 let prog=new Programme();
 prog.libelle="Champ me";
 prog.listeEquipes=this.listEquipe;
 let pari=new Pari();
 pari.mise=200;
 let typeC=new TypeCote();
 typeC.titre="X23";
 pari.cote=new Cote();
 pari.cote.valeur=3;
 pari.cote.type=typeC;


 let panier=new Panier();
 panier.pari=pari;
 panier.programme=prog;


 this.listpanier.push(panier);
 */
  }



  setTotal(){
    /*
    this.listpanier.forEach(panier=>{
        let gain=panier.pari.mise*panier.pari.cote.valeur;
        this.total=this.total+gain;
    });*/

  }
  clickEvent(p:Programme,c:Cote) {
   // this.setTotal();
    if (c.inCart){
      this.total=0;
        this.listpanier.forEach((pan,index)=>{
          if(pan.pari.cote==c){
            this.listpanier.splice(index,1);
          }
          let gain=pan.pari.mise*pan.pari.cote.valeur;
          this.total=this.total-gain;
        });
    }else{
      let pn=new Panier();
      let pari=new Pari();
      pari.cote=c;
      pari.gain=pari.mise*pari.cote.valeur;
      pn.programme=p;
      pn.pari=pari;
      this.listpanier.push(pn);
      let gain=pn.pari.mise*pn.pari.cote.valeur;
      this.total=this.total-gain;
    }
    c.inCart=!c.inCart;
  }

  parier(){
    if (localStorage.getItem('isLoggedIn') == "true") {
      this.listpanier.forEach(panier=>{
        panier.pari.cote.programme=panier.programme;
        panier.pari.joueur=JSON.parse(localStorage.getItem('userConnected') || '{}');
        console.log("Pari",panier.pari);
       // this.pariService.postPari(panier.pari);
   });
    this.messageService.add({ severity: 'error', summary: 'Vos paris sont enregistrés avec succès !', detail: "En attente de résultat des programmes" });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Veuillez vous connectez pour parier', detail: "" });
    }
  }
}


