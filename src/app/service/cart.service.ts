import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

const api='http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart :any[] =[];
  constructor(  private http: HttpClient, public router:Router) { }

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  updateCartCount(count: number) {
    this.cartCount.next(count);
  }
updateQuantity(product_id: any, quantity:any,employee_id: any){
  const body= {
    productId:product_id,
    quantity:quantity,
    employeeId:employee_id
  }
  return this.http.post<any>(api + '/cart/update', body);
}
//Thêm sản phẩm vào giỏ
addTocart(product_id: any, quantity:any,employee_id: any){
const body= {
  productId:product_id,
  quantity:quantity,
  employeeId:employee_id
}
  return this.http.post<any>(api + '/cart/add', body);
}

//Lấy danh sách sản phẩm trong giỏ hàng
listCartUser(id:any) :Observable<any>{
  return this.http.get(api + '/cart/view/' +id)
}

  //lấy danh sách mã giảm giá
  listdiscount() :Observable<any> {
    return this.http.get(api + '/discounts');
  }
  //ÁP dụng mã giảm giá
  applyDiscount(totalprice:any,selectedDiscount:any) :Observable<any>{
    const body = {
      totalAmount: totalprice,
      selectedDiscount: selectedDiscount
    };
    return this.http.post(api+'/discounts/apply', body);
  }
  deleteproduct(id:any):Observable<any>{
    return this.http.delete(api+ '/delete-producttoCart/' +id);
  }
listproductIds(productids:any ):Observable<any>{
return this.http.get(api+ '/products/by-ids/' +productids);
}

createorder(data:any) : Observable<any>{
  return this.http.post(api+'/order', data)
}
}