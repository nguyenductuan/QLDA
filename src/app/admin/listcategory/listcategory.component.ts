import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogDeleteComponent } from '../../common/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrl: './listcategory.component.css'
})
export class ListcategoryComponent implements OnInit {
constructor(private category:CategoryService,   private snackBar: MatSnackBar,  public dialog: MatDialog){}
categorys:any;
allChecked: boolean = false;
countcategory: any;
  ngOnInit() {
    this.category.listcategorys().subscribe({
      next:(data)=>{
       this.categorys = data;
this.countcategory = data.length;
console.log("A",this.categorys)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
  openCategoryDialog(event:any){

  }
  deletecategory(id:any){
   console.log(id);
    const dialogRef = this.dialog.open(ConfirmationDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.category.delete(id).subscribe((data: any) => {
          this.snackBar.open('Xóa thành công', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          
          window.location.reload(); // Tải lại trang sau khi xóa thành công
        })
      };
    })
  }
  checkIfAllSelected(){}
  toggleAll(event:any){

  }

}
