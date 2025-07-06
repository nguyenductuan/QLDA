import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserinfoService } from '../../service/userinfo.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent implements OnInit {
  discountCodes: any;
  selectedDiscount: string = '';
  totalPrice: any;
  productids: any;
  total: any;
  constructor(private cartService: CartService,
    private router: Router,
    private userinfo: UserinfoService,
    private productService: ProductsService) {
    // Lấy danh sách các sản phẩm đã chọn
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.productids = navigation.extras.state['productids'];
    }
  }
  orderForm: FormGroup;

  listcart: any;
  convertArrayToString(numbers: any[]) {
    return numbers.join(',');
  }
  listproduct: any;
  a:any;
  ngOnInit(): void {
    this.listdiscount();
     this.a = this.convertArrayToString(this.productids);
     this.listCartUser();
    this.orderForm = new FormGroup(
      {
        name: new FormControl(''),
        address: new FormControl(''),
        phone: new FormControl(''),
        email: new FormControl(''),
        note: new FormControl('')
      }
    )
  }
  sumproductToCart() {
    this.total = 0;
    this.listproduct.forEach((product: any) => {
      this.total += product.price * product.quantity;
    })
  }
  userParams: any;
  total_amount: any;
  CartItem: any[];
  user_id= this.userinfo.getUserInfo().employee.employeeId;

  listCartUser(){
    // lấy sản phẩm trong giỏ hàng
    this.cartService.listCartUser(this.userinfo.getUserInfo().employee.employeeId).subscribe((data: any) => {
      const cart = data; // Dữ liệu giỏ hàng
      //productids sẽ mất khi load lại trang . Cách xử lý lưu vào LocalStorage hoặc SessionStorage hoặc serverice
      this.cartService.listproductIds(this.a).subscribe(
        {
          next: (products) => {
            this.listproduct =  products;
               console.log("Sản phẩm", products);
            this.sumproductToCart();
          }
        }
      );
    }
    )
  }
  placeorder() {
this.listCartUser();
    this.CartItem = this.listproduct.map((cartItems: { productId:any; quantity: any; }) => ({
      productId: cartItems.productId,
      quantity: cartItems.quantity
    }));
    // lấy dữ liệu tổng tiền
    this.total_amount = this.total;
    this.userParams = {
      userid: this.user_id,
      total_amount: this.total_amount,
      ...this.orderForm.value,
      cartItem: this.CartItem
    }
    this.cartService.createorder(this.userParams).subscribe((data: any) => {
      console.log(data);
    })

  }
  //Danh sách mã giảm giá
  listdiscount() {
    this.cartService.listdiscount().subscribe((data: any) => {
      this.discountCodes = data;
      console.log("Giảm giá", this.discountCodes);
    })
  }
  //Hàm tính giảm giá 
  applyDiscount() {
    this.cartService.applyDiscount(this.total, this.selectedDiscount).subscribe((data: any) => {
      this.total = data;
      console.log("Thanh toán", this.total);
    })
  }
}
