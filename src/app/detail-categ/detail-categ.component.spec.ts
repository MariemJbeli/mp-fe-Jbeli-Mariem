import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCategComponent } from './detail-categ.component';

describe('DetailCategComponent', () => {
  let component: DetailCategComponent;
  let fixture: ComponentFixture<DetailCategComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCategComponent]
    });
    fixture = TestBed.createComponent(DetailCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
