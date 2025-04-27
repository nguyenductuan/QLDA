import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../service/payment.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  constructor(private order:PaymentService){}

listorder:any;
  ngOnInit(): void {
//Lấy danh sách order
    this.order.listorder().subscribe (
    {
      next:(response) => {
        this.listorder = response;
        console.log(this.listorder);
      },
      error:(err)=>{
        console.log("Lỗi API");
      }
    }
  )

 }
searchTerm = '';
selectedStatus = '';
get filteredOrders() {
  return this.listorder.filter((listorder:any) =>
    (listorder.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    listorder.orderId.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
    (this.selectedStatus === '' || listorder.payment_status === this.selectedStatus)
  );
}

deleteOrder(orderId: string) {
 // this.orders = this.orders.filter(order => order.id !== id);
}
}
