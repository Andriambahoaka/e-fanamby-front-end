import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Equipe } from 'src/app/model/equipe.model';
import { Programme } from 'src/app/model/programme.model';
import { CoteService } from 'src/app/service/cote.service';
import { EquipeService } from 'src/app/service/equipe.service';
import { ProgrammeService } from 'src/app/service/programme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/service/categorie.service';
import { Categorie } from 'src/app/model/categorie.model';

@Component({
  selector: 'app-add-programme',
  templateUrl: './add-programme.component.html',
  providers: [MessageService],
  styleUrls: ['../../back-office.css'],
})
export class AddProgrammeComponent implements OnInit {

  constructor(private programmeService: ProgrammeService,private categorieS:CategorieService, private _formBuilder: FormBuilder, private equipeService: EquipeService, private messageService: MessageService, private route: ActivatedRoute,
    private router: Router) { }

  listEquipe: Equipe[];
  categories:Categorie[];
  loading: Boolean = false;
  libelle: string;
  date: Date;
  heure:String;
  formGroup: FormGroup;
  selectedEquipes:Equipe[];
  selectedCategorie:Categorie;
  loadingAjout=false;
  succes:boolean=false;

  send:any={};

  ngOnInit(): void {
    this.loading = true;
    this.equipeService.get().subscribe(response => {
      console.log("Equipe from oracle", response);
      this.listEquipe = response;
      this.loading=false;
    },error => {
      console.log(error.status); //401 Unauthorized
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: "Erreur pendant l'affichage des équipes" + error.status });
    });



    this.categorieS.getCategories().subscribe(res=>{
      console.log("Response get categories", res);
      this.categories=res;
      this.loading=false;
    },error=>{
      console.log(error.status); //401 Unauthorized
      this.loading=false;
      this.messageService.add({severity:'error', summary:'Réessayez', detail:"Erreur pendant l'affichage des catégories" +error.status});
    });


    this.formGroup = this._formBuilder.group({
      libelle: ['', Validators.required],
      date: ['', Validators.required],
      selectedEquipes: ['', Validators.required],
      selectedCategorie :['', Validators.required],
      heure:['', Validators.required]
    });
  }



  ajouter() {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach((key) => {
        this.formGroup.controls[key].markAsDirty();
      });
      this.messageService.add({ severity: 'error', summary: 'Veuillez compléter les informations', detail: "" });
    } else {
      console.log(this.date);

      this.loadingAjout = true;
      let d = new Date();
      console.log(d);
      let g1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      let g2=new Date(this.date);
      if (g1.getTime() > g2.getTime()) {
        this.messageService.add({ severity: 'error', summary: 'Date déjà passée', detail: "Veuillez changer la date !!" });
        this.loadingAjout = false;
      } else {
        var pc = new Programme();
        pc.libelle = this.libelle;
        pc.createdAt = new Date();
        pc.dateHeurePgm = this.date;
        pc.equipes = this.selectedEquipes;
        ///// A Modifier //////////
        this.send["dateHeurePgm"]=this.date+"T"+this.heure+":00";
        console.log(this.send["dateHeurePgm"]);
        this.send["etat"]={id:1};
        this.send["equipes"]=[];
        this.selectedEquipes.forEach((e,i)=>{
          this.send["equipes"][i]={id:{idProgramme: null,
          idEquipe: e.id},rang:i};
        });

        this.send["categories"]=[
          { id:this.selectedCategorie.id }
      ];




        console.log("Alefa",this.send);
        this.programmeService.postProgramme(this.send).subscribe(response => {
            console.log("Response from ajout programme",response);
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: response['msg']});
            this.succes=true;
            this.loadingAjout = false;
        },error => {
          console.log(error.status); //401 Unauthorized
          this.loadingAjout = false;
          this.messageService.add({ severity: 'error', summary: 'Réessayez', detail: "Erreur d'ajout " + error.status });
        });
      }}
    }
  }
