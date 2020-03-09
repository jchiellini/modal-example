import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import {MaterialModule} from '../material/material.module';
import testMocks from '../../../../utilities/test-mocks';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  const config = { content: { message: 'Hello' } };
  const payload = { first_name: 'Joe' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ ModalComponent, testMocks.MockModalFooterComponent, testMocks.MockModalHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.config = config;
    component.payload = payload;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('context', () => {
    it('should return the current context', () => {
      expect(component.context).toEqual({ $implicit: config, payload });
    });
  });
});
