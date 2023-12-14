import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie';
import { CategorieService } from '../categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/protuit';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categ: Categorie[] = [];
  produits:Produit[]=[];
  
  

  constructor(private categoriesService: CategorieService, private router: Router, private produitsService: ProduitsService, private route: ActivatedRoute, ) { }
  
  produit: { [categorieId: number]: Produit[] } = {};
  ngOnInit(): void {
    this.categoriesService.getAllCategorie().subscribe((data: Categorie[]) => {
      this.categ = data;
    });

    this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('id');

      if (categoryId) {
        const categorieId = +categoryId;

        // Utilisation du service avec le proxy
        this.produitsService.getProduitsByCategorie(categorieId).subscribe(
          (data: Produit[]) => {
            this.produits = data;
          },
          (error: any) => {
            console.error("Une erreur s'est produite lors de la récupération de la liste des produits", error);
          }
        );
      } else {
        this.router.navigate(['/page-non-trouvee']);
      }
    });
  }
  afficherProduitsParCategorie(categorieId: number) {
    // Naviguer vers la liste des produits pour la catégorie spécifiée
    this.router.navigate(['/detailCateg', categorieId]);
  }

  chargerProduitsParCategorie(categorieId: number) {
    this.produitsService.getProduitsByCategorie(categorieId).subscribe((data: Produit[]) => {
      this.produit[categorieId] = data;
    });
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits().subscribe({
      next: data => {
        console.log("Succès GET");
        this.produits = data;
      },
      error: err => {
        console.log("Erreur GET", err);
      }
    });
  }


  

  deleteCateg(id: number) {
    this.categoriesService.deleteCategorie(id).subscribe(res => {
      this.categ = this.categ.filter(item => item.id !== id);
      console.log('Categorie deleted successfully!');
    })
  }
  

  modifCateg(id: number) {
    this.router.navigate(['/categ', id, 'modifierCateg']);
  }

  
}