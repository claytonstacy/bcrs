import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecordDialogComponent } from './delete-record-dialog.component';

describe('DeleteRecordDialogComponent', () => {
  let component: DeleteRecordDialogComponent;
  let fixture: ComponentFixture<DeleteRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
