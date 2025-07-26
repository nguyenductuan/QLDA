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
selectedCategoryIds:any;
countproduct:any;
columns: any;
data: any[] = [];
allChecked: boolean = false;
pageSize = 5;  // Số bản ghi/trang
currentPage = 1; // Trang hiện tại
showDeleteButton = false;
formatMoney(value: number): string {
  return value.toLocaleString('en-US'); // Dùng 'en-US' để phân cách hàng nghìn bằng dấu phẩy
}
get totalItems(): number {
return this.countproduct || 0;
  }
getlistProducts(){
  this.products.listproducts(this.currentPage - 1,this.pageSize).subscribe({
    next: (response) => {
      this.productList = response.data;
      console.log("A",this.productList);
      //this.countproduct = response.pageInfo.totalCount; // Lấy tổng số bản ghi từ response
      this.columns = [
        { title: 'Tên sản phẩm', key: 'name' },
        { title: 'Nhóm sản phẩm', key: 'categoryName' }, // Sửa key thành 'categoryName'
        { title: 'Giá', key: 'price' },
        { title: 'Số lượng', key: 'quantity' },
        { title: 'Ngày tạo', key: 'createdate' },
        { title: 'Trạng thái', key: 'status' },
      ];
      this.data = this.productList.map((item: any) => {
        const formatDate = (dateStr: string | null) => {
          if (!dateStr) return dateStr;
          const [year, month, day] = dateStr.split("-");
          return `${day}/${month}/${year}`;
        };

        const convertStatus = (status: string | number) => {
          if (status === "0" || status === 0) return "Dừng hoạt động";
          if (status === "1" || status === 1) return "Hoạt động";
          return status;
        };
        return {
          ...item,
           categoryName: item.category?.name || '', // lấy tên nhóm sản phẩm
          createdate: formatDate(item.createdate),
          status: convertStatus(item.status),
        };
      });
    },
    error: (err) => {
      console.log(err)
    }
  });
}
ngOnInit(){
  this.getlistProducts();
}

onPageChange(page: number) {
    this.currentPage = page;
   this.getlistProducts();
  }
  // -----------Xử lý hành động---------
onEdit(row: any) {
    console.log('Sửa', row);
  }
onDelete(row: any) {
    this.deleteproduct(row.id);
  }
onView(row: any) {
    console.log('Xem chi tiết', row);
  }
openCategoryDialog(event: any) {
  }

 onSelectionChange(selectedRows: any[]) {
   // console.log('Các dòng được chọn:', selectedRows);
    this.selectedCategoryIds = selectedRows.map((row: any) => row.categoryId);
     console.log('Danh sách category id:', this.selectedCategoryIds);
  
    if (this.selectedCategoryIds.length === 0) {
      this.showDeleteButton = false;
    }else{
      this.showDeleteButton = true;
    }
  }
// Hàm cập nhật danh sách sản phẩm
updatekistproduct(){
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
