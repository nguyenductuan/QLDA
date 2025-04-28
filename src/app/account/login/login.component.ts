import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserinfoService } from '../../service/userinfo.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;
  data: any;
 user:any;
errorMessage: string = '';
constructor(public  app:UserService,public userinfo: UserinfoService, public router: Router, private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.formLogin = new FormGroup({
     email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }
    )
  }
  login(){
    if (this.formLogin.invalid) {
      return;
    }
this.app.login(this.formLogin.value).subscribe(res => {
this.data = res
console.log(this.data)
if(this.data.data == '')
{
  this.snackBar.open(this.data.message, 'Đóng', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  });
}
else
{


    if(this.data.data[0].role.name == 'User')
      {
        this.router.navigate(['/home']);
        
      }
      if(this.data.data[0].role.name == 'Admin')
      {
        this.router.navigate(['/admin']);
        
      }

      this.userinfo.setUserInfo(this.data.data[0]);

}
})
  }
}
  

