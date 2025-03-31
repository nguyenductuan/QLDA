import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { PositionService } from '../../service/position.service';
import { RoleService } from '../../service/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {
  editUserForm: FormGroup;
  userId: any;
  positionList:any;
  roleList:any;
  employee:any;
  selectedStatus:any;
  selectedPosition:any;
  selectedGender:any;

  submitted = false;// Biến kiểm tra người dùng đã submit chưa

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
     private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,    
    private positionService: PositionService,
    private roleService: RoleService, public dialog: MatDialog
  ) {

    this.editUserForm =this.fb.group(
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
  statusOptions: any[] = [
    { label: 'Hoạt động', value: 1 },
    { label: 'Dừng hoạt động', value: 2 }
  ];
  genderOptions: any[] = [
    { label: 'Nam', value: 1 },
    { label: 'Nữ', value: 2 }
  ];
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
    this.userService.getUserById(this.userId).subscribe((user:any) => {
      this.employee = user;
      console.log(user);
      this.editUserForm.patchValue({
        ...user,
        position:user.positionId,
        role: user.roleId
      });
    });
    
    this.positionService.listposition().subscribe((data: any) => {
      this.positionList = data;
      
    });

    this.roleService.listrole().subscribe((data: any) => {
      this.roleList = data;
    });
  }
  
  editUser(){
    this.submitted = true;
    if (this.editUserForm.valid){
      console.log("Dữ liệu hợp lệ");
          const dialogRef = this.dialog.open(ConfirmationDialogComponent);
          dialogRef.afterClosed().subscribe(result => {
           if (result) {
            this.userService.updateUser(this.editUserForm.value,this.userId).subscribe((data: any) => {
                this.snackBar.open(data.message, 'Đóng', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top'
                });
                if(data.status == 200){
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
      console.log(this.editUserForm.errors); 
      return; // Nếu form không hợp lệ thì không submit
    }
  }
 
  
   
}



