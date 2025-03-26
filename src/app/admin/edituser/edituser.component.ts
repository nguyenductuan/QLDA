import { Component } from '@angular/core';
import { ConfirmationDialogEditComponent } from '../../common/confirmation-dialog-edit/confirmation-dialog-edit.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { PositionService } from '../../service/position.service';
import { RoleService } from '../../service/role.service';
import { MatDialog } from '@angular/material/dialog';

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
  selectedStatus:string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,    
    private positionService: PositionService,
    private roleService: RoleService, public dialog: MatDialog
  ) {
    this.editUserForm = this.fb.group({
      employeeId: this.userId,
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      position: [''],
      role: [''],
      gender:[''],
      password:[''],
      birthday:[''],
      status:['']
    });
  }
  statusOptions: any= [
    { label: 'Hoạt động', value: 1 },
    { label: 'Dừng hoạt động', value: 0 }
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
    // if (this.editUserForm.valid)

    const dialogRef = this.dialog.open(ConfirmationDialogEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editUserForm.valid) {
          this.userService.updateUser(this.editUserForm.value).subscribe((user:any) => {
            console.log('User added successfully');
            this.router.navigate(['/admin']);
          }, error => {
            console.error('Error adding user', error);
          });
        }
      }
    });
}
}


