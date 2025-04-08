import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

// ngOnInit(): void {
  

// }
// checkIfAllSelected(){}
// openOderDetailDialog(event:any){}

// deleteorder(id:any){}
searchTerm = '';
selectedStatus = '';
orders = [
  {
    id: 'DH001',
    customer: 'Nguyễn Văn A',
    date: '2025-04-08',
    status: 'Đang xử lý',
    total: 1500000
  },
  {
    id: 'DH002',
    customer: 'Trần Thị B',
    date: '2025-04-07',
    status: 'Đã giao',
    total: 3200000
  },
  // ... thêm đơn hàng khác
];

get filteredOrders() {
  return this.orders.filter(order =>
    (order.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
    (this.selectedStatus === '' || order.status === this.selectedStatus)
  );
}

deleteOrder(id: string) {
  this.orders = this.orders.filter(order => order.id !== id);
}
}
