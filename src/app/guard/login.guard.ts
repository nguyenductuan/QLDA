import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { UserinfoService } from '../service/userinfo.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLogin: any;
  constructor(private router: Router, public app: UserinfoService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const userInfo = this.app.getUserInfo().employee.name;
    if (!userInfo) {
      this.router.navigate(['/account/login'])
      return of(false)
    }
    return of(true)
  }
}
