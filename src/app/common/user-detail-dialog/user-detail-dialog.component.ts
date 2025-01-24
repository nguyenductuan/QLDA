import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.css'
})
export class UserDetailDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {}

  a:any;
ngOnInit(): void {
 this.a= this.data.user;

}
  onClose(): void {
    this.dialogRef.close();
  }
}
