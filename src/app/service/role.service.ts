import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const api='http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor( private http: HttpClient, public router:Router) {}

  listrole(): Observable<any> {
    return this.http.get(api + '/role');
  }

}
