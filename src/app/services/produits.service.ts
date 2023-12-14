import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../model/protuit';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  // Url du service web de gestion de produits
  // commune pour toutes les méthodes
  urlHote = "http://localhost:3333/produits/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.urlHote);
  }

  getProduitsByCategorie(categorieId: number): Observable<Produit[]> {
    const url = `${this.urlHote}/produits?categorieId=${categorieId}`; // Assurez-vous d'adapter l'URL selon votre API
    return this.http.get<Produit[]>(url);
  }


  deleteProduit(productId: number): Observable<any> {
    const url = `${this.urlHote}${productId}`;

    // Make the DELETE request
    return this.http.delete(url);
  }

  addProduit(nouveau: Produit) {
    return this.http.post<Array<Produit>>(this.urlHote, nouveau);
  }

  findProduit(id: number): Observable<any> {
    return this.http.get(this.urlHote + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  
  updateProduit(idP: number | undefined, nouveau: Produit) {
    return this.http.put(this.urlHote + idP, nouveau);
  }

  private produitModifieSubject = new Subject<void>();

  produitModifie$ = this.produitModifieSubject.asObservable();

  notifierModificationProduit() {
    this.produitModifieSubject.next();
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  


  


}
