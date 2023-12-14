import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categorie } from './model/categorie';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  urlHote = "http://localhost:3333/categories/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  

  getAllCategorie(): Observable<any> {
    return this.httpClient.get(this.urlHote )
      .pipe(
        catchError(this.errorHandler))
  }

  createCategorie(categ: Categorie): Observable<any> {
    return this.httpClient.post(this.urlHote , JSON.stringify(categ), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findCategorie(id: number): Observable<any> {
    return this.httpClient.get(this.urlHote  + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateCategorie(id: number, categ: Categorie): Observable<any> {
    return this.httpClient.put(this.urlHote  + id, JSON.stringify(categ), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteCategorie(id: number) {
    return this.httpClient.delete(this.urlHote  + id, this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
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
