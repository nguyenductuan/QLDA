import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { UserService } from '../../service/user.service';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  discountCodes: any;
  selectedDiscount: string = '';

  constructor(private cart: CartService,
    private app: UserService,

    private router: Router
  ) { }
  ngOnInit() {
    this.listCartUser();
    this.listdiscount();

  }
  isLogin = this.app.checklogin();
  user = this.isLogin.employee_id;
  listcart: any;
  //Lấy danh sách sản phẩm trong giỏ hàng của người dùng
  listCartUser() {
    this.cart.listCartUser(this.user).subscribe((data: any) => {
      this.listcart = data;
      console.log(this.listcart);
    })
  }
  total: number = 0;
  selectedProductIds: number[] = [];
  selectedProductId: number[] = [];
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
    this.calculateTotalPrice();
  }
  checkproduct() {
    this.selectedProductId = this.selectedProductIds
  }
  // Hàm tính tổng tiền các sản phẩm được chọn
  calculateTotalPrice() {
    this.total = 0; // Reset total before calculating
    this.listcart.forEach((product: any) => {
      if (this.selectedProductIds.includes(product.product.product_id)) {
        this.total += product.product.price * product.quantity;
      }
    });
  }
  quantity: number;
  increment(p: any, quantity: number, employee_id: any) {

    //update số lượng trong DB 
    this.quantity = quantity + 1;
    this.cart.updateQuantity(p,
      this.quantity, employee_id).
      subscribe((data: any) => {
      })
    //load lại trang
    window.location.reload();
  }
  decrement(p: any, quantity: number, employee_id: any) {
    this.quantity = quantity - 1;
    console.log("M", quantity);
    this.cart.updateQuantity(p, this.quantity, employee_id).
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
    this.cart.deleteproduct(id).subscribe((data: any) => {
    })
    window.location.reload();
  }
  productIds: any;
  checkout() {
    this.productIds = this.selectedProductIds; // Ví dụ về danh sách productIds
    this.router.navigate(['/home/payment'], { state: { productids: this.productIds } });
  }
}
