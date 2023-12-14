// produit.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/categorie';  // Assurez-vous d'importer la classe Categorie
import { CategorieService } from '../categorie.service';
import { Produit } from '../model/protuit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-produit',  // Assurez-vous que le sélecteur est correct
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  produitCourant: Produit = {
    id: 0,
    code: '',
    designation: '',
    prix: 0,
    categorie_id: 0 ,
    categorie:new Categorie()    
  };

  categ: Categorie[] = [];  // Ajout d'une liste de catégories

  constructor(private produitsService: ProduitsService, 
    private categorieService: CategorieService, 
    private router: Router) { }

    redirectToProduitPage() {
    this.router.navigate(['/produits']);
  }

  ngOnInit(): void {
    this.consulterProduits();
    this.categorieService.getAllCategorie().subscribe((data: Categorie[]) => {
      this.categ = data;
      console.log(this.categ);
    })
  }

  



  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits()
      .subscribe({
        next: data => {
          console.log("Succès GET produits", data);
          // Traitement des produits
        },
        error: err => {
          console.log("Erreur GET produits", err);
        }
      });
  }

  validerFormulaire(form: NgForm) {
    if (form.value.id !== undefined) {
      alert("Identificateur de produit déjà existant.");
    } else {
      // Définissez la valeur de categorieId en fonction de la catégorie sélectionnée
     
      this.produitCourant.categorie = form.value.categorie;

      this.ajouterProduit();
      form.resetForm();
    }
  }

  ajouterProduit() {
    this.produitsService.addProduit(this.produitCourant)
      .subscribe({
        next: addedProduct => {
          console.log("Nouveau produit ajouté:", addedProduct);
          this.router.navigate(['/produits']);
          // Gérer le produit ajouté selon les besoins
        },
        error: err => {
          console.error("Erreur lors de l'ajout du nouveau produit:", err);
        }
      });
  }

  effacerSaisie() {
    this.produitCourant = {
      id: 0,
      code: '',
      designation: '',
      prix: 0,
      categorie_id: 0,
      categorie: new Categorie()
    };
  }
}
