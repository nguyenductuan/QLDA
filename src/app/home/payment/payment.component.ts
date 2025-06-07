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
  selectedProductIds: any;
  discountCodes: any;
  selectedDiscount: string = '';
  CartItems: any[];
  totalPrice: any;
  productids: any;
  total: any;
  // paymentDetails = {
  //   name: '',
  //   address: '',
  //   paymentMethod: 'Thanh toán khi nhận hàng',  // Mặc định là thanh toán khi nhận hàng
  // };

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
  ngOnInit(): void {
    this.listdiscount();
    const a = this.convertArrayToString(this.productids);
    // lấy sản phẩm trong giỏ hàng
    this.cartService.listCartUser(this.userinfo.getUserInfo().employee.employeeId).subscribe((data: any) => {
      const cart = data; // Dữ liệu giỏ hàng
      //productids sẽ mất khi load lại trang . Cách xử lý lưu vào LocalStorage hoặc SessionStorage hoặc serverice
      this.cartService.listproductIds(a).subscribe(
        {
          next: (products) => {
            this.CartItems = this.productids.map((productId: number) => {
              const product = products.find((p: { productId: number }) => p.productId == productId);
              // Lấy số lượng từ giỏ 000 theo product_id của sản phẩm 
              let totalQuantity = 0;
              // Chỉ định kiểu cho item
              console.log("Sản phẩm", product);
              // Fix đoạn này
              //-------------------//
              cart.forEach((item: { product: { productId: number }; quantity: number }) => {
                if (item.product.productId === productId) {
                  totalQuantity += item.quantity;
                }
              });
        //-------------------------------//

              return {
                product: product!,
                quantity: totalQuantity
              }; // Trả về sản phẩm và số lượng
            });
            this.sumproductToCart();
          }
        }
      );
    }
    )
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
    this.CartItems.forEach((product: any) => {
      this.total += product.product.price * product.quantity;
    })
  }
  //Viết chuwong trình mã giảm giá
  userParams: any;
  total_amount: any;
  CartItem: any[];
  // lấy dữ liệu cá nhân
  user_id= this.userinfo.getUserInfo().employeeId;
  placeorder() {
    this.CartItem = this.CartItems.map(cartItems => ({
      productId: cartItems.product.productId,
      quantity: cartItems.quantity
    }));
    // lấy dữ liệu tổng tiền
    this.total_amount = this.total;
    this.userParams = {
      user_id: this.user_id,
      total_amount: this.total_amount,
      ...this.orderForm.value,
      cartItem: this.CartItem
    }
    this.cartService.createorder(this.userParams).subscribe((data: any) => {
      console.log(data);
    })
    //đặt hàng bắn thông báo đặt hàng thành công focus sang trang tình trạng đơn hàng
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
