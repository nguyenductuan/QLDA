import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const api='http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart :any[] =[];
  constructor(  private http: HttpClient, public router:Router) { }

updateQuantity(product_id: any, quantity:any,employee_id: any){
  const body= {
    productId:product_id,
    quantity:quantity,
    employeeId:employee_id
  }
  return this.http.post<any>(api + '/cart/updateproduct', body);
}
//Thêm sản phẩm vào giỏ
addTocart(product_id: any, quantity:any,employee_id: any){
const body= {
  productId:product_id,
  quantity:quantity,
  employeeId:employee_id
}
  return this.http.post<any>(api + '/cart/add-product', body);
}

//Lấy danh sách sản phẩm trong giỏ hàng
listCartUser(id:any) :Observable<any>{
  return this.http.get(api + '/cart-view?employeeId=' +id)
}

  //lấy danh sách mã giảm giá
  listdiscount() :Observable<any> {
    return this.http.get(api + '/discount');
  }
  //ÁP dụng mã giảm giá
  applyDiscount(totalprice:any,selectedDiscount:any) :Observable<any>{
    const body = {
      totalAmount: totalprice,
      selectedDiscount: selectedDiscount
    };
    return this.http.post(api+'/applydiscount', body);
  }
  deleteproduct(id:any):Observable<any>{
    return this.http.delete(api+ '/delete-producttoCart/' +id);
  }
listproductIds(productids:any ):Observable<any>{
return this.http.get(api+ '/productIds?ids=' +productids);
}

createorder(data:any) : Observable<any>{
  return this.http.post(api+'/addorder', data)
}
}