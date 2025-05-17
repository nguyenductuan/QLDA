import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../service/user.service';
import { UserinfoService } from '../../service/userinfo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  errorMessage:String;

  constructor(
    private userService: UserService,
    private userinfoService: UserinfoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(): void {
    if (this.formLogin.invalid) return;

    this.userService.login(this.formLogin.value).subscribe(response => {
      const { data, message } = response;

      if (!data || data.length === 0) {
        this.showSnackbar(message);
        return;
      }

      const user = data[0];
      this.userinfoService.setUserInfo(user);

      switch (user.role?.name) {
        case 'User':
          this.router.navigate(['/home']);
          break;
        case 'Admin':
          this.router.navigate(['/admin']);
          break;
        default:
          this.showSnackbar('Không xác định được vai trò người dùng.');
      }
    });
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
