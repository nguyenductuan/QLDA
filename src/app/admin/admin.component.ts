import { Component } from '@angular/core';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(public app: UserService){}
  isLogin= this.app.checklogin();
   user = this.isLogin.name;
   email = this.isLogin.email;
  ngOnInit(): void {
  }
}
