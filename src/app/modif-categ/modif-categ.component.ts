import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../categorie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modif-categ',
  templateUrl: './modif-categ.component.html',
  styleUrls: ['./modif-categ.component.css']
})
export class ModifCategComponent implements OnInit {
  id!: number;
  categ!: Categorie;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.categorieService.findCategorie(id).subscribe(categ => {
          this.categ = categ;
          this.initForm();
        });
      }
    });
  }

  initForm() {
    this.form = new FormGroup({
      code: new FormControl(this.categ.code, Validators.required),
      libelle: new FormControl(this.categ.libelle, Validators.required)
      // Ajoutez d'autres champs si nécessaire
    });
  }

  modifierCategorie() {
  if (this.categ && this.categ.id) {
    this.categorieService.updateCategorie(this.categ.id, this.form.value).subscribe(
      (res: any) => {
        console.log('Catégorie mise à jour avec succès!');
        // Rediriger vers la page de détail ou une autre page après la modification
        this.router.navigate([`/categories/${this.categ.id}/detailCateg`]);
      },
      (error) => {
        console.error('Erreur lors de la modification de la catégorie:', error);
      }
    );
  }
}

}
