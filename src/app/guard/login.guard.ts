import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable ({
  providedIn:'root'
})
export class LoginGuard implements CanActivate{
  isLogin:any;
  constructor(private router: Router,public app: UserService){}
  canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot):Observable <boolean>{

      this.isLogin= this.app.checklogin();

     let user = this.isLogin.name;
      if(!user)
      {
      this.router.navigate(['/account/login'])
        return of(false)
      }
         return of(true)

 
    
  }
}
