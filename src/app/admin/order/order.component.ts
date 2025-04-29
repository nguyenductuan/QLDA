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
searchTerm = '';
selectedStatus = '';
  ngOnInit(): void {
this.fetchOrders();
 }
 // Lấy danh sách order
 private fetchOrders(): void {
  this.order.listorder().subscribe({
    next: (response) => {
      this.listorder = response;
      console.log('Danh sách đơn hàng:', this.listorder);
    },
    error: (error) => {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    }
  });
}

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
