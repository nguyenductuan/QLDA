import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-edit',
  templateUrl: './confirmation-dialog-edit.component.html',
  styleUrl: './confirmation-dialog-edit.component.css'
})
export class ConfirmationDialogEditComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogEditComponent>) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
