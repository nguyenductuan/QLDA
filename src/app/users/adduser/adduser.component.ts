import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PositionService } from '../../service/position.service';
import { RoleService } from '../../service/role.service';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit {

  employeeForm: FormGroup;
  public check = false;
  public checkPhoneDuplicate = false;
  positionList:any;
  roleList:any;

  constructor(private positionService: PositionService,
    private employeeService: UserService,
    private roleService: RoleService, public dialog: MatDialog,
     private router: Router) { }
  ngOnInit(): void {
    this.positionService.listposition().subscribe((data: any) => {
      this.positionList = data;
      console.log(this.positionList);
    });

    this.roleService.listrole().subscribe((data: any) => {
      this.roleList = data;
      console.log(this.roleList);
    });

  this.employeeForm = new FormGroup(
    {

      name: new FormControl(''),
      birthday: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      position: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl(''),
      status: new FormControl(''),
      gender: new FormControl('')


    }
  )
}

  create(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.employeeForm.valid) {
          this.employeeService.addUser(this.employeeForm.value).subscribe((data: any) => {
            console.log('User added successfully', data);
            this.router.navigate(['/users']);
          }, error => {
            console.error('Error adding user', error);
          });
        }
      }
    });
  }

  }
