import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryDialogComponent } from './invoice-summary-dialog.component';

describe('InvoiceSummaryDialogComponent', () => {
  let component: InvoiceSummaryDialogComponent;
  let fixture: ComponentFixture<InvoiceSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceSummaryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
