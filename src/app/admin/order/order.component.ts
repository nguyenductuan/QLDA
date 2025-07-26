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
columns: any;
pageSize = 5;  // Số bản ghi/trang
currentPage = 1; // Trang hiện tại
data: any[] = [];
selectedStatus = '';
  ngOnInit(): void {
this.fetchOrders();
 }
 get totalItems(): number {
return 10;
  }
  onPageChange(page: number) {
    this.currentPage = page;
   this.fetchOrders();
  }
 // Lấy danh sách order
fetchOrders() {
  this.order.listorder(this.currentPage - 1,this.pageSize).subscribe({
    next: (response) => {
      this.listorder = response.data;
      console.log('Danh sách đơn hàng:', this.listorder);
       this.columns = [
        { title: 'Mã đơn', key: 'orderId' },
        { title: 'Khách hàng', key: 'name' },
        { title: 'Ngày', key: 'createdate' },
        { title: 'Trạng thái', key: 'payment_status' },
        { title: 'Tổng tiền', key: 'total_amount' },
       
      ];
      this.data = this.listorder.map((item: any) => {
        const formatDate = (dateStr: string | null) => {
          if (!dateStr) return dateStr;
          const [year, month, day] = dateStr.split("-");
          return `${day}/${month}/${year}`;
        };
        return {
          ...item,
          createdate: formatDate(item.createdate),
        };
       
      });
    },
    error: (error) => {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    }
  });
}
onEdit(row: any) {
    console.log('Sửa', row);
  }
onDelete(row: any) {
   // this.deleteproduct(row.id);
  }
onView(row: any) {
    console.log('Xem chi tiết', row);
  }

   onSelectionChange(selectedRows: any[]) {
   // console.log('Các dòng được chọn:', selectedRows);
    // this.selectedCategoryIds = selectedRows.map((row: any) => row.categoryId);
    //  console.log('Danh sách category id:', this.selectedCategoryIds);
  
    // if (this.selectedCategoryIds.length === 0) {
    //   this.showDeleteButton = false;
    // }else{
    //   this.showDeleteButton = true;
    // }
  }
deleteOrder(orderId: string) {
 // this.orders = this.orders.filter(order => order.id !== id);
}
}
