import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { PositionService } from '../../service/position.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailDialogComponent } from '../../common/user-detail-dialog/user-detail-dialog.component';
import { ConfirmationDialogDeleteComponent } from '../../common/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  totalRecords: number;
  startIndex: number = 1;
  endIndex: number = 1;
  showAdvancedSearch: boolean = false;
  selectedDate: Date | null = null;  // Lưu trữ giá trị ngày đã chọn
  showReload: boolean = true;
  listusers: any;
  displayedUsers: any;
  totalPages:any;
  countries: any[];
  selectedCountry: string;
  currentPage: number = 1;
  pageSizes: number[] = [2,4,6];// Mảng chứa các giá trị số lượng phân trang
  pageSize: number = 2;  // Giá trị mặc định là 10
  allChecked: boolean = false; // Track the state of the master checkbox
  searchForm:FormGroup;

  constructor(
    private  userService: UserService,
    private snackBar: MatSnackBar,
    private positionService:PositionService,
    public dialog: MatDialog){}
  //Hàm nhập giá trị tìm kiếm
  onInputChanges(){}
// Hàm xử lý khi người dùng nhập giá trị vào ô input
onSearch(event:any){
  if (event.target.value.trim() === '') {
  this.updateDisplayedUsers();
} else {
  this.userService.searchUsers(event.target.value).subscribe((data: any) => {
    this.listusers = data;
    console.log(this.listusers);
    this.totalRecords = this.listusers.length;
    this.updateDisplayedUsers();
  });
}
}
search(){
console.log(this.searchForm.value);
this.userService.searchadvance(this.searchForm.value).subscribe((data: any) => {
this.listusers =  data;
console.log(this.listusers);
    this.totalRecords = this.listusers.length;
    this.updateDisplayedUsers();
});
}
searchName: string = '';
searchEmail: string = '';
searchPosition: any;
searchBirthday: string = '';
searchStatus: string = '';
searchGender: any;
searchPhone:any;
searchAddress:any;
statusOptions: any= [
  { label: 'Hoạt động', value: 1 },
  { label: 'Dừng hoạt động', value: 0 }
];
genderOptions: any[] = [
  { label: 'Nam', value: 1 },
  { label: 'Nữ', value: 0 }
];

resetSearch(){
    this.searchName = '';
    this.searchEmail = '';
    this.searchAddress ='';
    this.searchPosition = null;
    this.search();

}
clearSearch() {
}
  onInputChange(event: any) {
     const inputPage = parseInt(event.target.value, 10);
    if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= this.totalPages) {
      this.currentPage = inputPage;
      this.updateDisplayedUsers();
    } else {
      event.target.value = this.currentPage; // Reset to current page if input is invalid
    }}
// Hàm xử lý khi người dùng chọn số lượng phân trang
  onPageSizeChange(event: any) {
    console.log('Số phân trang mới:', event.value);
    this.pageSize = event.value;
    this.updateDisplayedUsers();
  }

  //Hàm cập nhật danh sách nhân viên hiển thị
    updateDisplayedUsers()
  {
     this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
    this.endIndex = this.endIndex > this.totalRecords ? this.totalRecords : this.endIndex;
    this.displayedUsers = this.listusers.slice(this.startIndex, this.endIndex);
    this.totalPages= Math.ceil(this.totalRecords / this.pageSize);
  }
  // Biến lưu trữ trạng thái chọn tất cả
  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.displayedUsers.forEach((user: any) => user.selected = isChecked);
    this.allChecked = isChecked;
  }

  checkIfAllSelected() {
    this.allChecked = this.displayedUsers.every((user: any) => user.selected);
  }
  listpositions : any;
  ngOnInit() {
    this.userService.getlistuser().subscribe((data: any) => {
      this.listusers = data;
      this.totalRecords = this.listusers.length;
      this.updateDisplayedUsers();
    })
    this.positionService.listposition().subscribe((data: any) => {
      this.listpositions = data;
    }
  )
    this.selectedDate = new Date();
    // search for phải truyền vào tên chức vụ, tên quyền hạn, tên giới tính
    this.searchForm = new FormGroup(
      {
        name: new FormControl(''),
        email: new FormControl(''),

      }
    )
  }
  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  // Hàm để nhận giá trị ngày mới khi người dùng chọn
  onDateChanged(date: Date) {
    this.selectedDate = date;
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.updateDisplayedUsers();
  }
  goToPreviousPage()
  {

 if (this.currentPage > 1) {
      this.currentPage--;

      this.updateDisplayedUsers();
    }
  }
    goToNextPage() {

    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }
  goToLastPage() {
    this.currentPage = this.totalPages;
    this.updateDisplayedUsers();
  }

  openUserDetailDialog(user: any): void {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      width: '70%',
      data: { user }
    });
console.log(user);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  deleteuser(id:any){
    console.log(id);
 const dialogRef = this.dialog.open(ConfirmationDialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe((data: any) => {
          this.snackBar.open('Xóa thành công', 'Đóng', {
            duration: 3000,
             horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.updateDisplayedUsers(); // Gọi lại phương thức để cập nhật danh sách người dùng
          window.location.reload(); // Tải lại trang sau khi xóa thành công
      })
    };
  })
  }
}
