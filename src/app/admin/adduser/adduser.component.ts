import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionService } from '../../service/position.service';
import { UserService } from '../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from '../../service/role.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit {

  searchForm: FormGroup;
  public check = false;
  public checkPhoneDuplicate = false;
  positionList:any;
  roleList:any;
  selectedStatus: string;
  selectedGender:any;
  listrole:any;
  selectedrole:any;
  listpositions:any;
  selectedPosition:any;
  userParams:any;
  numberValue: string;

  constructor( private employeeService: UserService,
    private snackBar: MatSnackBar,
    private positionService:PositionService,
    private roleService:RoleService,
    private router:Router,
    public dialog: MatDialog) { }
     
  ngOnInit(){
    this.positionService.listposition().subscribe((data: any) => {
      this.listpositions = data;
   
    })
    this.roleService.listrole().subscribe((data: any) => {
      this.listrole = data;
      console.log(this.listrole)
    }
    )
  this.searchForm = new FormGroup(
    {
        name: new FormControl(''),
        position: new FormControl(''),
        role: new FormControl(''),
        address: new FormControl(''),
        phone: new FormControl(''),
        birthday: new FormControl(''),
        email:new FormControl(''),
        password: new FormControl('')
    }
  )
}
statusOptions: any= [
  { label: 'Hoạt động', value: 1 },
  { label: 'Dừng hoạt động', value: 0 }
];
genderOptions: any[] = [
  { label: 'Nam', value: 1 },
  { label: 'Nữ', value: 0 }
];
clearInput(controlName: string) {
  this.searchForm.get(controlName)?.reset();
}
  create(){
    this.userParams = {
      ...this.searchForm.value,
      role: this.selectedrole,
      position: this.selectedPosition,
      gender: this.selectedGender,
      status: this.selectedStatus
    };
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
        //  if (this.employeeForm.valid) {
           this.employeeService.addUser(this.userParams).subscribe((data: any) => {
            this.snackBar.open("Thành công", 'Đóng', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
             this.router.navigate(['/admin']);
          }, error => {
            this.snackBar.open(error.error.message, 'Đóng', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          });
       }
     });
    }
  onInput(event:any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    // Chỉ giữ lại các ký tự số trong input, loại bỏ ký tự khác
    input.value = value.replace(/\D/g, ''); // \D là ký tự không phải số
  }
  }
