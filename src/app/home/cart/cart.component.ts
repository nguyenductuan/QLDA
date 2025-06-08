import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { UserService } from '../../service/user.service';
import { Route, Router } from '@angular/router';
import { UserinfoService } from '../../service/userinfo.service';
import { ConfirmationDialogDeleteComponent } from '../../common/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  discountCodes: any;
  selectedDiscount: string = '';
  productIds: any;
  total: number = 0;
  selectedProductIds: number[] = [];
  selectedProductId: number[] = [];
  allChecked: any;
  listcart: any;
  quanty: number;
  count:any;
  sum: any;
  constructor(private cart: CartService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private app: UserService,
    private userinfo: UserinfoService,
    private router: Router
  ) { }
  ngOnInit() {
    this.loadCart();
    this.listdiscount();
  }
  // Thêm hàm này để load lại dữ liệu cart
  loadCart() {
    this.cart.listCartUser(this.userinfo.getUserInfo().employee.employeeId).subscribe((response: any) => {
      this.listcart = response.data;
       this.count = this.listcart.length;
      this.sum = this.count;
      // Cập nhật count vào CartService
    this.cart.updateCartCount(this.count);

    })
  }
  // hàm khi click chọn tất cả 
  // Biến lưu trữ trạng thái chọn tất cả
  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.listcart.forEach((p: any) => p.selected = isChecked);
    this.allChecked = isChecked;

    this.selectedProductIds = this.listcart
      .filter((item: any) => item.selected)
      .map((item: any) => item.product.productId);
    this.calculateTotalPrice();
  }
  // Hàm gọi khi checkbox của sản phẩm được chọn
  toggleSelection(productId: number, event: any): void {
    if (event.target.checked) {
      // Thêm sản phẩm vào mảng selectedProductIds
      this.selectedProductIds.push(productId);
    } else {
      // Xóa sản phẩm khỏi mảng selectedProductIds
      const index = this.selectedProductIds.indexOf(productId);
      if (index > -1) {
        this.selectedProductIds.splice(index, 1);
      }
    }
    //hàm xử lý check vào checkbox all khi check hết các checkbox
    this.allChecked = this.listcart.every((p: any) => p.selected);
    this.calculateTotalPrice();
  }
  checkproduct() {
    this.selectedProductId = this.selectedProductIds
  }
  // Hàm tính tổng tiền các sản phẩm được chọn
  calculateTotalPrice() {
    this.total = 0; // Reset total before calculating
    this.listcart.forEach((product: any) => {
      if (this.selectedProductIds.includes(product.product.productId)) {
        this.total += product.product.price * product.quantity;
      }
    });
  }

  increment(p: any, quantity: number, employeeId: any) {
    //update số lượng trong DB 
    this.quanty = quantity + 1;
    this.cart.updateQuantity(p,
      this.quanty, employeeId).subscribe({
    next: () => {
      this.loadCart(); // gọi sau khi update xong
    },
    error: err => {
      console.error("Lỗi cập nhật số lượng", err);
    }
  });
    
  }
  decrement(p: any, quantity: number, employeeId: any) {
    this.quanty = quantity - 1;
    if (this.quanty < 1) return; // Không cho phép số lượng nhỏ hơn 1
    this.cart.updateQuantity(p, this.quanty, employeeId).subscribe({
    next: () => {
      this.loadCart(); // gọi sau khi update xong
    },
    error: err => {
      console.error("Lỗi cập nhật số lượng", err);
    }
  });
  
  }
  //hàm lấy danh sách mã giảm giá
  listdiscount() {
    this.cart.listdiscount().subscribe((data: any) => {
      this.discountCodes = data;
    })
  }
  //Hàm giảm giá
  applyDiscount() {
    this.cart.applyDiscount(this.total, this.selectedDiscount).subscribe((data: any) => {
      this.total = data;
    })
  }
  deleteproduct(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cart.deleteproduct(id).subscribe((data: any) => {
        
          this.snackBar.open('Xóa thành công', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
          );
          window.location.reload();
        })
      };
    })
  }
  checkout() {
    this.productIds = this.selectedProductIds; // Ví dụ về danh sách productIds
    this.router.navigate(['/home/payment'], { state: { productids: this.productIds } });
  }
}
