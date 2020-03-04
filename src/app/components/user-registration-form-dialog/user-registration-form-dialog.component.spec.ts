import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationFormDialogComponent } from './user-registration-form-dialog.component';

describe('UserRegistrationFormDialogComponent', () => {
  let component: UserRegistrationFormDialogComponent;
  let fixture: ComponentFixture<UserRegistrationFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
