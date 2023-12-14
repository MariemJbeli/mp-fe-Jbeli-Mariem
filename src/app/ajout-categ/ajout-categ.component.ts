import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-ajout-categ',
  templateUrl: './ajout-categ.component.html',
  styleUrls: ['./ajout-categ.component.css']
})
export class AjoutCategComponent implements OnInit {
  form!: FormGroup;
  constructor(public categorieService: CategorieService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      libelle: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.categorieService.createCategorie(this.form.value).subscribe((res: any) => {
        console.log('Categorie created successfully!');
        this.router.navigateByUrl('/categories');
      });
    }
  }

}