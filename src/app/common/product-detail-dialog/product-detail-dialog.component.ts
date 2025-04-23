import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.css'
})
export class ProductDetailDialogComponent {
constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {}

  a:any;
ngOnInit(): void {
 this.a= this.data.p;
 console.log("A",this.data)

}
  onClose(): void {
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }
}