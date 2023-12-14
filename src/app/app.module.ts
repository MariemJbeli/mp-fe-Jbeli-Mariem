import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategorieComponent } from './categorie/categorie.component';
import { AjoutCategComponent } from './ajout-categ/ajout-categ.component';
import { ModifCategComponent } from './modif-categ/modif-categ.component';
import { DetailCategComponent } from './detail-categ/detail-categ.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProduitsComponent,
    AjoutProduitComponent,
    CategorieComponent,
    AjoutCategComponent,
    ModifCategComponent,
    DetailCategComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandler }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
