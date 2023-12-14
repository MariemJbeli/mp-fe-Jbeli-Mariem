import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCategComponent } from './ajout-categ.component';

describe('AjoutCategComponent', () => {
  let component: AjoutCategComponent;
  let fixture: ComponentFixture<AjoutCategComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutCategComponent]
    });
    fixture = TestBed.createComponent(AjoutCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
