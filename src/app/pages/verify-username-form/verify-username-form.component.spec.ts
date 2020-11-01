import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUsernameFormComponent } from './verify-username-form.component';

describe('VerifyUsernameFormComponent', () => {
  let component: VerifyUsernameFormComponent;
  let fixture: ComponentFixture<VerifyUsernameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyUsernameFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyUsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
