import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

const api = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private currentUserSubject: BehaviorSubject<any>;
  // public currentUser: Observable<any>;
  constructor(private http: HttpClient, public router: Router) {
    // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    // this.currentUser = this.currentUserSubject.asObservable();
  }
  login(data: any): Observable<any> {
    return this.http.post(api + '/login', data);
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
  searchUsers(name: any): Observable<any> {
    return this.http.get(api + '/employee/search?name=' + name);
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(api + '/addemployee', user);
  }
  searchadvance(data: any): Observable<any> {
    return this.http.post<any>(api + '/searchadvance', data);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(api + '/employeebyId?id=' + id);
  }
  updateUser(user: any, id:any): Observable<any> {
    return this.http.put(api + '/updateemployee/'+id, user);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(api + '/delete-employee/' + id);
  }
  deleteUsers(ids: any): Observable<any> {
    return this.http.post(api + '/delete-employees' ,ids);
  }
  export():Observable<Blob>{
return this.http.get(api+ '/employee/export-excel',{ responseType: 'blob' });
  }
}
