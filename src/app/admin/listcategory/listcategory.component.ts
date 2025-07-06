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
  constructor(private category: CategoryService, private snackBar: MatSnackBar, public dialog: MatDialog) { }
  categorys: any;
  allChecked: boolean = false;
  countcategory: any;
  data: any[] = [];
  columns: any;

  pageSize = 5;  // Số bản ghi/trang
  currentPage = 1; // Trang hiện tại
  get totalItems(): number {
    return this.countcategory || 0;
  }
  getListCategories() {
    this.category.listcategorys(this.currentPage - 1, this.pageSize).subscribe({
      next: (response) => {
        this.categorys = response;
        this.countcategory = response.pageInfo.totalCount; // Lấy tổng số bản ghi từ response
        this.columns = [
          { title: 'Nhóm sản phẩm', key: 'name' },
          { title: 'Ngày tạo', key: 'createdate' },
          { title: 'Trạng thái', key: 'status' }
        ];
        this.data = this.categorys.data.map((item: any) => {
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
ngOnInit() {
  this.getListCategories();
}
   //---- Phân trang----
  onPageChange(page: number) {
    this.currentPage = page;
   this.getListCategories();
  }
  // -----------Xử lý hành động---------
  onEdit(row: any) {
    console.log('Sửa', row);
  }
  onDelete(row: any) {
    this.deletecategory(row.id);
  }
  onView(row: any) {
    console.log('Xem chi tiết', row);
  }
  // -----------------------------------
  onSelectionChange(selectedRows: any[]) {
    console.log('Các dòng được chọn:', selectedRows);
  }
  //---------------------------------
  openCategoryDialog(event: any) {
  }
  deletecategory(id: any) {
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
  checkIfAllSelected() { }
  toggleAll(event: any) {

  }

}
