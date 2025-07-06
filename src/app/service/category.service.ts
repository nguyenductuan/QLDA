import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


const api='http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  constructor( private http: HttpClient, public router:Router) {}
  listcategorys(pageNo:any,pageSize:any): Observable<any> {
    const params = { pageNo: pageNo, pageSize: pageSize };
    return this.http.get(api + '/categories', { params });
  }
    delete(id:any): Observable<any> {
      return this.http.delete(api + '/delete-category/'+id);
    }
}
