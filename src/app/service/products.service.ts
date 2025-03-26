import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

const api='http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient, public router:Router) {}


  listproducts(): Observable<any> {
    return this.http.get(api + '/product');
  }

  addproduct(data:any):Observable<any>{
    return this.http.post(api + '/addproduct', data );
  }
  delete(id:any): Observable<any> {
    return this.http.delete(api + '/delete-product/'+id);
  }
  productbyid(id:any): Observable<any>{
  return this.http.get(api+ '/productid?product_id=' +id );
  }
  
}

