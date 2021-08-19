import { Component, OnInit, ViewChild } from '@angular/core';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { Categorie } from '../model/categorie.model';
import { Programme } from '../model/programme.model';
import { CategorieService } from '../service/categorie.service';
import { CoteService } from '../service/cote.service';
import { ProgrammeService } from '../service/programme.service';
import { MenuItem } from 'primeng/api';
import { Cote } from '../model/cote.model';
import { Panier } from '../model/panier.model';
import { Pari } from '../model/pari.model';
import { PariService } from '../service/pari.service';
import { Utilisateur } from '../model/utilisateur.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';




@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: [MessageService]
})
export class AccueilComponent implements OnInit {


  constructor(private messageService: MessageService, private programmeService: ProgrammeService,
    private categorieService: CategorieService, private coteService: CoteService, private pariService: PariService, private snackbar: MatSnackBar, private router: Router) {

  }


  listProgramme: Programme[];
  listCategorie: Categorie[];
  items: MenuItem[] = [];
  status: boolean = false;
  // listpanier:Panier[]=[];
  loadingCategorie:boolean=false;
  loading:boolean=false;
  panier: Panier;
  total: number = 0;
  miseTotal: number = 0;
  selectedProgramme: Programme;
  detail: Boolean = false;
  //gain:number=0;
  //decimalPipe = new DecimalPipe('en-US');
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
    this.panier = new Panier();
    this.panier.listPari = [];


    // this.total=this.panier.reduce((sum, current) => sum + current.gain(), 0);
    //this.listCategorie = this.categorieService.getCategoriesStatique();
    this.loadingCategorie=true;
    this.loading=true;
    this.items=this.categorieService.getMenu();
  /*  this.listCategorie.forEach(cat => {
      this.items.push({ label: cat.nomCateg });
    });*/
    ///this.loadingCategorie=false;
    this.listProgramme = this.programmeService.getProgrammesStatique();

    this.programmeService.getByEtat(2).subscribe(data=>{
        this.listProgramme=data;
        console.log(data);
        this.listProgramme.forEach(p => {
          this.coteService.getCotesByProgramme(p.id).subscribe(data => {
            //console.log("cotes",data);
            p.listeCotes = data;
            console.log("Populate affichage");
            this.programmeService.populateAffiche(p);
            // p.affichageCote=data;

          });
        });
        this.loading=false;
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



  setTotal() {
    /*
    this.listpanier.forEach(panier=>{
        let gain=panier.pari.mise*panier.pari.cote.valeur;
        this.total=this.total+gain;
    });*/

  }
  clickEvent(p: Programme, c: Cote) {
    // this.setTotal();
    c.programme = p;
    c.win = false;
    console.log(c.programme);
    if (c.inCart) {
      this.panier.listPari.forEach((pari, index) => {
        if (pari.cote == c) {
          this.panier.listPari.splice(index, 1);
          this.miseTotal = this.miseTotal - pari.mise;
          console.log(this.panier.gainTotal());
        }
      });
    } else {
      let pari = new Pari();
      pari.cote = c;
      this.panier.listPari.push(pari);;
      //  console.log(this.panier.gainTotal());
    }
    c.inCart = !c.inCart;
  }

  parier() {
    if (localStorage.getItem('isLoggedIn') == "true") {
      console.log("Mise Total", this.panier.miseTotal());
      let user = JSON.parse(localStorage.getItem('userConnected') || '{}') as Utilisateur;
      console.log("solde",user.solde);
      if (user.solde < this.panier.miseTotal()) {
        this.messageService.add({ severity: 'error', summary: 'Solde insuffisant ', detail: "Votre solde n' est pas suffisant pour miser cette somme: "+this.panier.miseTotal()+" Ar !" });
      } else {
        console.log("Pret à parier",this.panier.listPari);

        this.panier.listPari.forEach(pari => {
          //pari.cote.programme=panier.programme;
          pari.utilisateur = user;
          let p = new Programme();
          p.libelle = pari.cote.programme.libelle;
          p.dateHeurePgm = pari.cote.programme.dateHeurePgm;
          p.equipes = pari.cote.programme.equipes;
          pari.cote.programme = p;
          pari.date = new Date();
          pari.gain=pari.getGain();
          console.log("Pari", pari);

          this.pariService.postPari(pari).subscribe(response => {
            console.log(response);
          });
        });

        this.messageService.add({ severity: 'success', summary: 'Vos paris sont enregistrés avec succès !', detail: "En attente de résultat des programmes" });
        this.snackbar.open("Vos paris sont enregistrés avec succès !", "Fermer");
        this.router.navigate(['/mes-paris'])
          .then(() => {
            window.location.reload();
        });

      }

    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Veuillez vous connectez pour parier', detail: "" });
    }
  }


  detailProgramme(p: Programme) {
    this.selectedProgramme = p;
    this.detail = true;
  }
  hideDetail() {
    this.detail = false;
  }
}


