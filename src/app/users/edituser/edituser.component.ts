import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { PositionService } from '../../service/position.service';
import { RoleService } from '../../service/role.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent  implements OnInit{
  editUserForm: FormGroup;
  userId: any;
  positionList:any;
  roleList:any;
  empoloyee:any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private positionService: PositionService,
    private roleService: RoleService
  ) {
    this.editUserForm = this.fb.group({
      employee_id: this.userId,
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
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);


    this.positionService.listposition().subscribe((data: any) => {
      this.positionList = data;
      console.log(this.positionList);
    });

    this.roleService.listrole().subscribe((data: any) => {
      this.roleList = data;
      console.log(this.roleList);
    });

    this.userService.getUserById(this.userId).subscribe((user:any) => {
      this.empoloyee = user;
      console.log(user);
      this.editUserForm.patchValue(user);

    });
  }

  editUser(){
    // if (this.editUserForm.valid)
    console.log(this.editUserForm.value);
    this.userService.updateUser(this.editUserForm.value).subscribe((user:any) => {
        console.log("User:", user);
      });
  }

}
