import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { Router } from '@angular/router';
import { CategorieService } from '../categorie.service';

import { Categorie } from '../model/categorie';
import { Produit } from '../model/protuit';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  enEdition = false;
  produits: Produit[] = [];
  categ: Categorie[] = [];
  produitForm!: FormGroup;

  produitCourant: any;
  nouvelleDesignation: string = '';

  constructor(
    private produitsService: ProduitsService,
    private fb: FormBuilder,
    private router: Router,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    console.log("Initialisation du composant...");
    this.consulterProduits();
    this.categorieService.getAllCategorie().subscribe((data: Categorie[]) => {
      this.categ = data;
    });

    // Initialisez le formulaire avec FormBuilder
    this.produitForm = this.fb.group({
      id: [''],
      code: ['', Validators.required],
      designation: ['', Validators.required],
      prix: ['', Validators.required],
      categorie: ['', Validators.required],
    });
  }

  editerProduit(id: number) {
    this.produitsService.findProduit(id).subscribe((pro: Produit) => {
      this.produitCourant = { ...pro };
      this.enEdition = true;
      this.produitForm.patchValue({
        id: pro.id,
        code: pro.code,
        designation: pro.designation,
        prix: pro.prix,
        categorie: pro.categorie?.id,
      });
    });
  }

  
  supprimerProduit(id: number) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");

    if (!confirmation) {
      return; // Annuler la suppression si l'utilisateur ne confirme pas
    }

    this.produitsService.deleteProduit(id).subscribe({
      next: () => {
        console.log("Succès DELETE");
        // Mettez à jour la liste des produits localement sans le produit supprimé
        this.produits = this.produits.filter(p => p.id !== id);
        console.log("Suppression du produit avec l'id: " + id);
      },
      error: err => {
        console.error("Erreur DELETE", err);
        // Gérez l'erreur ici, par exemple, affichez un message à l'utilisateur
        // Vous pouvez également créer un service de notification pour afficher des messages d'erreur
      }
    });
  }



  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits().subscribe(
      {
        next: data => {
          console.log("Succès GET");
          this.produits = data;
        },
        error: err => {
          console.log("Erreur GET");
        }
      }
    );
  }

  validerFormulaire(form: FormGroup) {
    const formValue = form.value;
    const updatedProduct: Produit = {
      id: formValue.id,
      code: formValue.code,
      designation: formValue.designation,
      prix: formValue.prix,
      categorie_id: formValue.categorie,  // Utilisez la valeur du menu déroulant pour l'ID de la catégorie
      categorie: { id: formValue.categorie, libelle: '', code: '' } // Ajoutez la propriété manquante ici
    };

    this.produitsService.updateProduit(updatedProduct.id, updatedProduct).subscribe({
      next: () => {
        console.log('Succès PUT');
        // Mettez à jour le produit dans votre liste locale si nécessaire
        const index = this.produits.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.produits[index] = { ...updatedProduct };
        }
      },
      error: err => {
        console.log('Erreur PUT', err);
        // Gérez l'erreur selon vos besoins
      }
    });
    location.reload();
  }
  mettreAJourProduit(formValue: any) {
    const updatedProduct: Produit = {
      id: formValue.id,
      code: formValue.code,
      designation: formValue.designation,
      prix: formValue.prix,
      categorie_id: formValue.categorie,
      categorie: { id: formValue.categorie, libelle: '', code: '' }
    };

    this.produitsService.updateProduit(updatedProduct.id, updatedProduct).subscribe({
      next: () => {
        console.log('Succès PUT');
        const index = this.produits.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.produits[index] = { ...updatedProduct };
        }
      },
      error: err => {
        console.log('Erreur PUT', err);
      }
    });
  }

  ajouterNouveauProduit(newProduct: Produit) {
    this.produitsService.addProduit(newProduct).subscribe({
      next: addedProduct => {
        console.log('Succès POST');
        // Assuming addedProduct has the same structure as Produit
       // this.produits.push(addedProduct as Produit);
      },
      error: err => {
        console.log('Erreur POST', err);
        // Handle the error according to your requirements
      }
    });
  }
  effacerSaisie() {
    this.produitCourant = undefined;
    this.enEdition = false;
    this.produitForm.reset();
  }

  ajouterProduit() {
    this.router.navigate(['/ajout-produit']);
  }
}
