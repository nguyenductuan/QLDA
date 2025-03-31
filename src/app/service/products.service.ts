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
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('categoryid', data.categoryid);
    formData.append('quantity', data.quantity);
    formData.append('avatarImage', data.image);
    formData.append('status', data.status);
    return this.http.post(api + '/addproduct',formData );
  }
  update(data:any, id:any):Observable<any>{
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('categoryid', data.categoryid);
    formData.append('quantity', data.quantity);
    formData.append('avatarImage', data.image);
    return this.http.put(api + '/updateproduct/' +id,formData );
  }

  delete(id:any): Observable<any> {
    return this.http.delete(api + '/delete-product/'+id);
  }
  productbyid(id:any): Observable<any>{
  return this.http.get(api+ '/productid?productId=' +id );
  }
  
}

