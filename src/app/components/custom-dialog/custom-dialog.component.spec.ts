import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDialogComponent } from './custom-dialog.component';
import {MaterialModule} from '../../shared/material/material.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import testMocks from '../../../../utilities/test-mocks';

describe('CustomDialogComponent', () => {
  let component: CustomDialogComponent;
  let fixture: ComponentFixture<CustomDialogComponent>;
  const responseCallback = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      declarations: [ CustomDialogComponent, testMocks.MockModalComponent ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            footer: {
              responseCallback
            }
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => { }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onActionButtonClick', () => {
    it('should call the specified resultCallback', () => {
      const response = {};
      component.onActionButtonClick(response);
      expect(responseCallback).toHaveBeenCalledWith(response);
    });
  });
});
