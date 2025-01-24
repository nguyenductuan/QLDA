import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const api='http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient, public router:Router) {}

  login(data: any): Observable<any> {
    return this.http.post(api + '/login', data)
  }
  checklogin() {
    let jsonData = sessionStorage.getItem('login');

    if (jsonData) {
      return JSON.parse(jsonData);
    }
    return false;
  }

    getlistuser(): Observable<any> {
    return this.http.get(api + '/employee')
  }

  searchUsers(name:any): Observable<any> {
    return this.http.get(api + '/employee/search?name=' + name);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(api + '/addemployee', user);
  }

  searchadvance(data:any): Observable<any> {
    return this.http.post(api + '/searchadvance', data);
  }
  getUserById(id:any): Observable<any> {
    return this.http.get(api + '/employeebyId?id=' +id);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(api + '/updateemployee', user);
  }

  deleteUser(id:any) :Observable<any>{
    return this.http.delete(api + '/deleteemployee/' + id);
  }

}
