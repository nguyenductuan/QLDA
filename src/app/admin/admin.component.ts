import { Component } from '@angular/core';

import { UserService } from '../service/user.service';
import { UserinfoService } from '../service/userinfo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private userinfo: UserinfoService){}

  user = this.userinfo.getUserInfo().name;
  email = this.userinfo.getUserInfo().email;
  ngOnInit(): void {
  }
}
