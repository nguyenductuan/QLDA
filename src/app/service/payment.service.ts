import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


const api='http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  
  constructor( private http: HttpClient, public router:Router) {}
   // Gửi thông tin thanh toán tới Spring Boot
   processPayment(paymentDetails: any): Observable<any> {
    return this.http.post(api + '/payment', paymentDetails);
  }

}
