import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor() { }
  setUserInfo(user: any) {
    sessionStorage.setItem('userInfo', JSON.stringify(user));
  }
  getUserInfo() {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
