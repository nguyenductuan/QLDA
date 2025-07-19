import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogDeleteComponent } from '../../common/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MESSAGES } from '../../constants/message';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrl: './listcategory.component.css'
})
export class ListcategoryComponent implements OnInit {
constructor(private category: CategoryService, private snackBar: MatSnackBar, public dialog: MatDialog) { }
  categorys: any;
  allChecked: boolean = false;
  showDeleteButton = false;
  countcategory: any;
  data: any[] = [];
  columns: any;
  selectedCategoryIds:any;
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
openCategoryDialog(event: any) {
  }
deletecategory(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(ConfirmationDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.category.delete(id).subscribe((data: any) => {
          this.snackBar.open(MESSAGES.CATEGORY.DELETE_SUCCESS, 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          window.location.reload(); // Tải lại trang sau khi xóa thành công
        })
      };
    })
  }
deleteSelected(){
        console.log('selectedIds:', this.selectedCategoryIds);
    const dialogRef = this.dialog.open(ConfirmationDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.category.deleteSelectedCategories(this.selectedCategoryIds).subscribe((data: any) => {
          this.snackBar.open('Xóa thành công', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.getListCategories(); // Tải lại danh sách sau khi xóa thành công
        })
      };
    })
  }
// -----------------------------------
onSelectionChange(selectedRows: any[]) {
   // console.log('Các dòng được chọn:', selectedRows);
    this.selectedCategoryIds = selectedRows.map((row: any) => row.categoryId);
     console.log('Danh sách category id:', this.selectedCategoryIds);
  //   console.log('selectedRows:', selectedRows);
  //   console.log('selectedRows.map(s => s.selected):', selectedRows.map(s => s.categoryId));
  //  // this.showDeleteButton = selectedRows.map(s => s.categoryId);
  //   //console.log('Có dòng nào được chọn không:', this.showDeleteButton);
  //   this.showDeleteButton = this.productList.some((item: { selected: any; }) => item.selected);
    if (this.selectedCategoryIds.length === 0) {
      this.showDeleteButton = false;
    }else{
      this.showDeleteButton = true;
    }
  }
}
