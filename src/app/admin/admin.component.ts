import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../service/userinfo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private userinfo: UserinfoService) { }
  user: string='';
  email: string='';
  ngOnInit(): void {
    const userInfo = this.userinfo.getUserInfo().employee
    this.user = userInfo.name;
    this.email = userInfo.email;
  }
}
