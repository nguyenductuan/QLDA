import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor() { }
  getUserInfo() {
    const userInfo = sessionStorage.getItem('login');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
