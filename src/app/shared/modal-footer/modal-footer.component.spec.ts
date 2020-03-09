import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFooterComponent } from './modal-footer.component';
import {MaterialModule} from '../material/material.module';

describe('ModalFooterComponent', () => {
  let component: ModalFooterComponent;
  let fixture: ComponentFixture<ModalFooterComponent>;
  const secondaryButtonCallback = jasmine.createSpy();
  const primaryButtonCallback = jasmine.createSpy();
  const close = jasmine.createSpy();

  const config = {
    footer: {
      secondaryButtonCallback,
      primaryButtonCallback
    }
  };

  const payload = { message: 'Hello' };
  const dialogRef = { close };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ ModalFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFooterComponent);
    component = fixture.componentInstance;
    component.config = config;
    component.payload = payload;
    component.dialogRef = dialogRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set configuration variable with specified settings', () => {
      component.ngOnInit();
      expect(component.configuration.primaryButtonCallback).toEqual(primaryButtonCallback);
    });
  });

  describe('onSecondaryButtonClick', () => {
    it('should close the dialog', () => {
      component.onSecondaryButtonClick();
      expect(close).toHaveBeenCalled();
    });

    it('should call specified secondaryButtonCallback', () => {
      component.onSecondaryButtonClick();
      expect(secondaryButtonCallback).toHaveBeenCalledWith(payload, config, dialogRef);
    });
  });

  describe('onPrimaryButtonClick', () => {
    it('should call specified primaryButtonCallback', () => {
      component.onPrimaryButtonClick();
      expect(primaryButtonCallback).toHaveBeenCalledWith(payload, config, dialogRef);
    });
  });
});
