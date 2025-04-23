import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ConfirmationDialogDeleteComponent } from '../../common/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDetailDialogComponent } from '../../common/product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrl: './listproduct.component.css'
})
export class ListproductComponent implements OnInit {

constructor(private products: ProductsService,
  private snackBar: MatSnackBar,
  private product: ProductsService,
  public dialog: MatDialog
){}
productList:any; 
countproduct:any;
allChecked: boolean = false;
showDeleteButton = false;
formatMoney(value: number): string {
  return value.toLocaleString('en-US'); // Dùng 'en-US' để phân cách hàng nghìn bằng dấu phẩy
}
ngOnInit(){
this.products.listproducts().subscribe({
  next: (data) => {
    console.log('Dữ liệu nhận được:', data);
    this.productList = data;
    this.countproduct= data.length;
  },
  error: (err) => {
    console.error('Lỗi khi gọi API:', err);
  },
})
}
// Hàm cập nhật danh sách sản phẩm
updatekistproduct(){

}
  // Biến lưu trữ trạng thái chọn tất cả
  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.productList.forEach((p: any) =>p.selected = isChecked);
    this.allChecked = isChecked;
    this.showDeleteButton = this.productList.some((item: { selected: any; }) => item.selected);

  }

  deleteSelected(){
    const selectedIds = this.productList
    .filter((item: { selected: any; })  => item.selected)
    .map((item: { productId: any; }) => item.productId);

    const dialogRef = this.dialog.open(ConfirmationDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.product.deletepeoducts(selectedIds).subscribe((data: any) => {
          this.snackBar.open('Xóa thành công', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          
          window.location.reload();
        })
      };
    })

  }
  // Hàm kiểm tra xem tất cả người dùng đã được chọn hay chưa
  checkIfAllSelected() {
    this.allChecked = this.productList.every((p: any) => p.selected);
    this.showDeleteButton = this.productList.some((item: { selected: any; }) => item.selected);
 
  }
  openProductDetailDialog(p: any) {
    const dialogRef = this.dialog.open(ProductDetailDialogComponent, {
      width: '70%',
      data: { p}
    });
 console.log(p)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // Hàm xử lý khi người dùng chọn xóa người dùng
  deleteproduct(id:any){
    console.log(id);
    const dialogRef = this.dialog.open(ConfirmationDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.product.delete(id).subscribe((data: any) => {
          this.snackBar.open('Xóa thành công', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.updatekistproduct(); // Gọi lại phương thức để cập nhật danh sách sản phẩm
          window.location.reload(); // Tải lại trang sau khi xóa thành công
        })
      };
    })
  }
}
