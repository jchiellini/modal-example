import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationFormDialogComponent } from './user-registration-form-dialog.component';
import {MaterialModule} from '../../shared/material/material.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import testMocks from '../../../../utilities/test-mocks';
import {noop} from 'rxjs';
import {FormGroup, Validators} from '@angular/forms';

describe('UserRegistrationFormDialogComponent', () => {
  let component: UserRegistrationFormDialogComponent;
  let fixture: ComponentFixture<UserRegistrationFormDialogComponent>;
  const config = [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'First Name',
      required: true,
      validators: [Validators.required],
      width: 50
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      declarations: [ UserRegistrationFormDialogComponent, testMocks.MockModalComponent ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => { }
          }
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationFormDialogComponent);
    component = fixture.componentInstance;
    component.config = config;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('userRegistrationForm', () => {
      const form = new FormGroup({});
      spyOn(component, 'initializeForm').and.returnValue(form);
      component.ngOnInit();
      expect(component.userRegistrationForm).toEqual(form);
    });
  });

  describe('initializeForm', () => {
    it('should return an initialized form with the proper initial values', () => {
      const values = { firstName: 'Joe' };
      const result = component.initializeForm(config, values);
      expect(result.value).toEqual({ firstName: 'Joe' });
    });

    it('should disable a field based on the config', () => {
      const configuration = [
        {
          id: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'First Name',
          required: true,
          validators: [Validators.required],
          width: 50,
          disabled: true,
        }
      ];
      const values = { firstName: 'Joe' };
      const result = component.initializeForm(configuration, values);
      expect(result.get('firstName').disabled).toBeTruthy();
    });
  });
});
