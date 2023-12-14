import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-detail-categ',
  templateUrl: './detail-categ.component.html',
  styleUrls: ['./detail-categ.component.css']
})
export class DetailCategComponent implements OnInit {
  id!: number;
  categ!: Categorie;

  constructor(public categorieServive: CategorieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Utilisez categoryId pour récupérer l'ID de la route
    const categoryId = this.route.snapshot.paramMap.get('id');

    // Assurez-vous que categoryId n'est pas undefined avant de l'utiliser
    if (categoryId) {
      // Convertissez categoryId en nombre, car les IDs sont généralement de type number
      this.id = +categoryId;

      // Utilisez this.id pour obtenir les détails de la catégorie du service
      this.categorieServive.findCategorie(this.id).subscribe((data: Categorie) => {
        this.categ = data;
      });
    }
  }
}