import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifCategComponent } from './modif-categ.component';

describe('ModifCategComponent', () => {
  let component: ModifCategComponent;
  let fixture: ComponentFixture<ModifCategComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifCategComponent]
    });
    fixture = TestBed.createComponent(ModifCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
