import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

const api = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, public router: Router) {
  }
  getlistuser(): Observable<any> {
    return this.http.get(api + '/employee')
  }
  searchUsers(name: any): Observable<any> {
    return this.http.get(api + '/employee/search?name=' + name);
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(api + '/employee', user);
  }
  searchadvance(data: any): Observable<any> {
    return this.http.post<any>(api + '/searchadvance', data);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(api + '/employee/' + id);
  }
  updateUser(user: any, id:any): Observable<any> {
    return this.http.put(api + '/employee/'+id, user);
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
