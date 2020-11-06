import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesByServiceGraphComponent } from './purchases-by-service-graph.component';

describe('PurchasesByServiceGraphComponent', () => {
  let component: PurchasesByServiceGraphComponent;
  let fixture: ComponentFixture<PurchasesByServiceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesByServiceGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesByServiceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
