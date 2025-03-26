import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogEditComponent } from './confirmation-dialog-edit.component';

describe('ConfirmationDialogEditComponent', () => {
  let component: ConfirmationDialogEditComponent;
  let fixture: ComponentFixture<ConfirmationDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
