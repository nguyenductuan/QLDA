import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-delete',
  templateUrl: './confirmation-dialog-delete.component.html',
  styleUrl: './confirmation-dialog-delete.component.css'
})
export class ConfirmationDialogDeleteComponent {
 constructor(public dialogRef: MatDialogRef<ConfirmationDialogDeleteComponent>) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
