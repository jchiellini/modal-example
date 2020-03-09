import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHeaderComponent } from './modal-header.component';
import {MaterialModule} from '../material/material.module';

describe('ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;
  let fixture: ComponentFixture<ModalHeaderComponent>;
  const closeCallback = jasmine.createSpy();
  const close = jasmine.createSpy();

  const config = {
    header: {
      title: 'TEST',
      closeCallback
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ ModalHeaderComponent,  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHeaderComponent);
    component = fixture.componentInstance;
    component.config = config;
    component.dialogRef = { close };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set configuration variable with specified settings', () => {
      component.ngOnInit();
      expect(component.configuration.title).toEqual('TEST');
    });
  });

  describe('onClose', () => {
    it('should set configuration variable with specified settings', () => {
      component.onClose();
      expect(closeCallback).toHaveBeenCalledWith(config);
      expect(close).toHaveBeenCalled();
    });
  });
});
