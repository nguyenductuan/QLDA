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
data: any[] = [];
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
       this.columns = [
        { title: 'Tên sản phẩm', key: 'name' },
        { title: 'Nhóm sản phẩm', key: 'categoryName' }, // Sửa key thành 'categoryName'
        { title: 'Giá', key: 'price' },
        { title: 'Số lượng', key: 'quantity' },
        { title: 'Ngày tạo', key: 'createdate' },
        { title: 'Trạng thái', key: 'status' },
      ];
      this.listorder = this.listorder.map((item: any) => {
        const formatDate = (dateStr: string | null) => {
          if (!dateStr) return dateStr;
          const [year, month, day] = dateStr.split("-");
          return `${day}/${month}/${year}`;
        };

        const convertStatus = (status: string | number) => {
          if (status === "0" || status === 0) return "Dừng hoạt động";
          if (status === "1" || status === 1) return "Hoạt động";
          return status;
        };
        return {
          ...item,
          categoryName: item.category?.name || '', // lấy tên nhóm sản phẩm
          createdate: formatDate(item.createdate),
          status: convertStatus(item.status),
        };
      });
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
