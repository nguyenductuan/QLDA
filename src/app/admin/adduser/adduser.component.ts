import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  addemployee: FormGroup;
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
  submitted = false;// Biến kiểm tra người dùng đã submit chưa

  constructor( private employeeService: UserService,
    private snackBar: MatSnackBar,
    private positionService:PositionService,
    private roleService:RoleService,
    private router:Router,
    public dialog: MatDialog,private fb: FormBuilder) { }
     
  ngOnInit(){
    this.positionService.listposition().subscribe((data: any) => {
      this.listpositions = data;
   
    })
    this.roleService.listrole().subscribe((data: any) => {
      this.listrole = data;
      console.log(this.listrole)
    }
    )
  this.addemployee =this.fb.group(
    {
        name: ['',[Validators.required]],
        position: ['',[Validators.required]],
        address: ['',[Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        phone:['',[Validators.required, Validators.pattern("^[0-9]{10,11}$")]],
        role:['',Validators.required],
        password: ['',[Validators.required]],
        gender:['',[Validators.required]],
        status: ['',[Validators.required]],
        birthday: ['',[Validators.required]],
      
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
  this.addemployee.get(controlName)?.reset();
}
  create(){
    this.userParams = {
      ...this.addemployee.value,
      role: this.selectedrole,
      position: this.selectedPosition,
      gender: this.selectedGender,
      status: this.selectedStatus
    };
    this.submitted = true;
    if (this.addemployee.valid){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
       if (result) {
           this.employeeService.addUser(this.userParams).subscribe((data: any) => {
            this.snackBar.open(data.message, 'Đóng', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            if(data.status ==200){
              this.router.navigate(['/admin']);
            }
             
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
    else{
      return; // Nếu form không hợp lệ thì không submit
    }
    
    }
  onInput(event:any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    // Chỉ giữ lại các ký tự số trong input, loại bỏ ký tự khác
    input.value = value.replace(/\D/g, ''); // \D là ký tự không phải số
  }
  }
