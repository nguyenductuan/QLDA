import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleService } from '../../service/role.service';
import { PositionService } from '../../service/position.service';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailDialogComponent } from '../../common/user-detail-dialog/user-detail-dialog.component';
import { ConfirmationDialogDeleteComponent } from '../../common/confirmation-dialog-delete/confirmation-dialog-delete.component';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent implements OnInit {
   totalRecords: number;
  startIndex: number = 1;
  endIndex: number = 1;
  showAdvancedSearch: boolean = false;
  selectedDates: Date[];  // Lưu trữ giá trị ngày đã chọn
  showReload: boolean = true;
  listusers: any;
  displayedUsers: any[] = [];
  totalPages:any;
  countries: any[];
  selectedCountry: string;
  currentPage: number = 1;
  pageSizes: number[] = [5,10,15];// Mảng chứa các giá trị số lượng phân trang
  pageSize: number = 5;  // Giá trị mặc định là 10
  allChecked: boolean = false; // Track the state of the master checkbox
  searchForm:FormGroup;
  selectedPosition: any;
  selectedGender: any;
  selectedStatus: any;
  selectedrole: any;
  listpositions : any;
  searchTerm: string = '';
  checkclick:number = 0;
  startDate:any;
  endDate:any;
  searchParams:any;
  listrole: any;
  params:any;

  constructor(
    private  userService: UserService,
    private snackBar: MatSnackBar,
    private positionService:PositionService,
    private role:RoleService,
    public dialog: MatDialog){
     
    }
    statusOptions: any= [
      { label: 'Hoạt động', value: 1 },
      { label: 'Dừng hoạt động', value: 0 }
    ];
    genderOptions: any[] = [
      { label: 'Nam', value: 1 },
      { label: 'Nữ', value: 0 }
    ];
  //Hàm nhập giá trị tìm kiếm
  onInputChanges(){}
// Hàm xử lý khi người dùng nhập giá trị vào ô input
onSearch(searchValue:string){
  this.searchTerm = searchValue.trim();
  console.log(this.searchTerm);
  if (!this.searchTerm) {
    this.userService.getlistuser().subscribe((data: any) => {
      this.listusers = data;
      this.totalRecords = this.listusers.length;
      this.updateDisplayedUsers();
    });
  } else {
    this.userService.searchUsers(this.searchTerm).subscribe((data: any) => {
      this.listusers = data;
      console.log(this.listusers);
      this.totalRecords = this.listusers.length;
      this.updateDisplayedUsers();
    });
  }
}
dateRange: Date[] = [];
startDates:any;
endDates:any;
onDateSelect(event:any) {
  console.log("d",event);
  if(event.value.length ==2){
this.startDates = event.value[0];
this.endDates = event.value[1];
this.startDate= this.formatDate(this.startDates);
this.endDate = this.formatDate(this.endDates)
  }
  else{
  
    this.checkclick ++;
    if(this.checkclick == 1){
        this.startDates = event.value[0];
    }
    if(this.checkclick == 2){
      this.endDates = event.value[0];
      this.checkclick =0;
    }
     this.startDate= this.formatDate(this.startDates);
    this.endDate = this.formatDate(this.endDates)
  }
 
} 
// Hàm định dạng ngày
private formatDate(date:any) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}
clearInput(controlName: string) {
  this.searchForm.get(controlName)?.reset();
}
searchadvance(){
  this.searchParams = {
    ...this.searchForm.value,
    startDate: this.startDate,
    endDate: this.endDate,
    role: this.selectedrole,
    position: this.selectedPosition,
    gender: this.selectedGender,
    status: this.selectedStatus
  };
  console.log("Du lieu:",this.searchParams);
  this.userService.searchadvance(this.searchParams).subscribe((data: any) => {
  this.listusers =  data;
  console.log(this.listusers);
      this.totalRecords = this.listusers.length;
      this.updateDisplayedUsers();
  });
  }
//
datePickerKey =0 ;
resetSearch(){
  this.searchForm.reset();
    // Reset selected values
    this.selectedPosition = null;
    this.selectedGender = null;
    this.selectedStatus = null;
    this.selectedrole = null;
    this.searchParams = {};
    // Fix không hiển thị giá trị thời gian sau khi reset
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.dateRange = [thirtyDaysAgo, today];
    this.datePickerKey++;
    console.log("key",this.datePickerKey);
    this.onDateSelect({
      value: this.dateRange
    });
    // Load lại dữ liệu ban đầu
    this.userService.getlistuser().subscribe((data: any) => {
      this.listusers = data;
      this.totalRecords = this.listusers.length;
      this.updateDisplayedUsers();
    })
}
// Hàm xử lý khi người dùng chọn trang
  onInputChange(event: any) {
    const inputPage = parseInt(event.target.value, 10);
    if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= this.totalPages) {
      this.currentPage = inputPage;
      this.updateDisplayedUsers();
    } else {
      event.target.value = this.currentPage; // Reset to current page if input is invalid
    }
  }
// Hàm xử lý khi người dùng chọn số lượng phân trang
  onPageSizeChange(event: any) {
    console.log('Số phân trang mới:', event.value);
    this.pageSize = event.value;
    this.updateDisplayedUsers();
  }
  //Hàm cập nhật danh sách nhân viên hiển thị
    updateDisplayedUsers()
  {
    // Đảm bảo currentPage không âm hoặc bằng 0
  if (this.currentPage < 1) {
    this.currentPage = 1;
  }
  // Tính toán các chỉ số
  this.startIndex = (this.currentPage - 1) * this.pageSize;
  this.endIndex = Math.min(this.startIndex + this.pageSize, this.totalRecords);
  // Kiểm tra listusers có tồn tại và có phải array không
  if (Array.isArray(this.listusers)) {
    this.displayedUsers = this.listusers.slice(this.startIndex, this.endIndex);
  } else {
    this.displayedUsers = [];
  }
  // Tính tổng số trang
  this.totalPages = Math.max(Math.ceil(this.totalRecords / this.pageSize), 1);
  }
  // Biến lưu trữ trạng thái chọn tất cả
  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.displayedUsers.forEach((user: any) => user.selected = isChecked);
    this.allChecked = isChecked;
  }
// Hàm kiểm tra xem tất cả người dùng đã được chọn hay chưa
  checkIfAllSelected() {
    this.allChecked = this.displayedUsers.every((user: any) => user.selected);
  }
  // Hàm khởi tạo
  ngOnInit() {
    this.userService.getlistuser().subscribe((data: any) => {
      this.listusers = data;
      console.log(this.listusers)
      this.totalRecords = this.listusers.length;
      this.updateDisplayedUsers();
    })
    this.positionService.listposition().subscribe((data: any) => {
      this.listpositions = data;
    })
    this.role.listrole().subscribe((data: any) => {
      this.listrole = data;
    }
    )
    this.searchForm = new FormGroup(
      {
        name: new FormControl(''),
        position: new FormControl(''),
        role: new FormControl(''),
        address: new FormControl(''),
        phone: new FormControl(''),
      }
    )
    this.updateDateRange();
  }
  updateDateRange(){
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.dateRange = [thirtyDaysAgo, today];
  }
  // Hàm xử lý khi người dùng chọn tìm kiếm nâng cao
  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }
  // Hàm xử lý khi người dùng chọn trang trước
  goToFirstPage() {
    this.currentPage = 1;
    this.updateDisplayedUsers();
  }
  // Hàm xử lý khi người dùng chọn trang trước
  goToPreviousPage()
  {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }
  // Hàm xử lý khi người dùng chọn trang tiếp theo
    goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }
  // Hàm xử lý khi người dùng chọn trang cuối
  goToLastPage() {
    this.currentPage = this.totalPages;
    this.updateDisplayedUsers();
  }
  // Hàm xử lý khi người dùng chọn xem chi tiết người dùng
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
  // Hàm xử lý khi người dùng chọn xóa người dùng
  deleteuser(id:any){
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