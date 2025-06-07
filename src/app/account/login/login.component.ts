import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../service/user.service';
import { UserinfoService } from '../../service/userinfo.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  errorMessage: String;

  constructor(
    private router: Router,
    private authservice:AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(): void {
    if (this.formLogin.invalid) return;
    this.authservice.login(this.formLogin.value).subscribe({
      next: response => {
        const { employee, message } = response;
        this.showSnackbar(message);
        // Điều hướng trang
        switch (employee.role.name) {
          case 'User':
            this.router.navigate(['/home']);
            break;
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
        }
      },
      error: err => {
        if (err.status === 401) {
          const message = err.error?.message || 'Tài khoản hoặc mật khẩu không đúng';
          this.showSnackbar(message);
        } else {
          this.showSnackbar("Đã xảy ra lỗi không xác định");
        }
      }
    })
  }
  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
