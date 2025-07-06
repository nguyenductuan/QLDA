import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const api = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

   login(data: any): Observable<any> {
      return this.http.post(api + '/login', data).pipe(tap(response => {
        // Lưu thông tin người dùng vào sessionStorage
        sessionStorage.setItem('login', JSON.stringify(response));
      }
      ));
    }

}
