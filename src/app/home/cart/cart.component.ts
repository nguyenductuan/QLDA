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
  constructor(private cart: CartService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private app: UserService,
    private userinfo: UserinfoService,
    private router: Router
  ) { }
  ngOnInit() {
    this.listCartUser();
    this.listdiscount();
  }
  user = this.userinfo.getUserInfo();

  //Lấy danh sách sản phẩm trong giỏ hàng của người dùng
  listCartUser() {
    this.cart.listCartUser(this.user.employeeId).subscribe((data: any) => {
      this.listcart = data;
      console.log(this.listcart);
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
      this.quanty, employeeId).
      subscribe((data: any) => {
      })
    //load lại trang
    window.location.reload();
  }
  decrement(p: any, quantity: number, employeeId: any) {
    this.quanty = quantity - 1;
    this.cart.updateQuantity(p, this.quanty, employeeId).
      subscribe((data: any) => {
      })
    //load lại trang
    window.location.reload();
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
          });

          window.location.reload(); // Tải lại trang sau khi xóa thành công
        })
      };
    })
  }

  checkout() {
    this.productIds = this.selectedProductIds; // Ví dụ về danh sách productIds
    this.router.navigate(['/home/payment'], { state: { productids: this.productIds } });
  }
}
