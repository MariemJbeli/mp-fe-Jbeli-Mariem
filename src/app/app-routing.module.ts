import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AjoutCategComponent } from './ajout-categ/ajout-categ.component';
import { DetailCategComponent } from './detail-categ/detail-categ.component';
import { ModifCategComponent } from './modif-categ/modif-categ.component';

const routes: Routes = [
  { path:"accueil", component: AccueilComponent },
  { path:"produits", component: ProduitsComponent },
  { path:"ajouterProduit", component: AjoutProduitComponent },
  { path:"categories" , component: CategorieComponent},
  { path: "ajoutCateg", component: AjoutCategComponent },
  { path: "categories/:id/detailCateg", component: DetailCategComponent},
  { path: "categories/:id/modifCateg", component: ModifCategComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
