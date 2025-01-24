import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;
  data: any;
constructor(public  app:UserService, public router: Router){}
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    }
    )
  }
  login(){
console.log(this.formLogin.value)
this.app.login(this.formLogin.value).subscribe(res => {
this.data = res
  let jsonData = JSON.stringify(res);
    console.log(jsonData)
    console.log(res.role)
    if(this.data.role.name= "Admin")
      {
        this.router.navigate(["/users"]);
      }
      else
      {
        this.router.navigate(["/home"]);
      }

    sessionStorage.setItem('login', jsonData);

})

  }
}
