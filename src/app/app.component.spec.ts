import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MaterialModule} from './shared/material/material.module';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomDialogComponent} from './components/custom-dialog/custom-dialog.component';
import {UserRegistrationFormDialogComponent} from './components/user-registration-form-dialog/user-registration-form-dialog.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const closeAll = jasmine.createSpy();
  const open = jasmine.createSpy();

  const dialog = {
    closeAll,
    open
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provider: MatDialog,
          useValue: dialog
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.dialog = new MatDialog(null, null, null, null, null, null, null);
    app.dialog.open = open;
    app.dialog.closeAll = closeAll;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('handleCustomResponseCallback', () => {
    const response = [];
    beforeEach(() => {
      app.handleCustomResponseCallback(response);
    });

    it('should set customResponse', () => {
      expect(app.customResponse).toEqual(response);
    });

    it('should call closeAll', () => {
      expect(app.dialog.closeAll).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('should call closeAll', () => {
      app.onCancel();
      expect(app.dialog.closeAll).toHaveBeenCalled();
    });
  });

  describe('openModal', () => {
    it('should open UserRegistrationFormDialogComponent', () => {
      app.openModal();
      expect(app.dialog.open).toHaveBeenCalled();
    });
  });

  describe('openCustomModal', () => {
    it('should open CustomDialogComponent', () => {
      app.openCustomModal();
      expect(app.dialog.open).toHaveBeenCalled();
    });
  });

  describe('cancellationCheck', () => {
    it('should open dialog', () => {
      const form = new FormGroup({});
      form.markAsDirty();
      app.cancellationCheck(form, {}, {});
      expect(app.dialog.open).toHaveBeenCalled();
    });

    it('should open dialog', () => {
      const form = new FormGroup({});
      const dialogRef = { close: jasmine.createSpy() };
      app.cancellationCheck(form, {}, dialogRef);
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('submitUserRegistrationForm', () => {
    const form = new FormGroup( { firstName: new FormControl('John Smith') });
    beforeEach(() => {
      spyOn(form, 'reset');
      app.submitUserRegistrationForm(form);
    });

    it('should set formPayload', () => {
      expect(app.formPayload).toEqual(form.value);
    });

    it('should call closeAll', () => {
      expect(form.reset).toHaveBeenCalled();
    });

    it('should call closeAll', () => {
      expect(app.dialog.closeAll).toHaveBeenCalled();
    });
  });
});
