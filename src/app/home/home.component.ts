import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CartService } from '../service/cart.service';
import { UserService } from '../service/user.service';
import { UserinfoService } from '../service/userinfo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private app: UserService,
    private userinfo: UserinfoService) {
  }
  products: any;
  sum: any;
  listcart: any;
  user: any;
  ngOnInit(): void {
    // this.loadProducts();
    this.loadUserInfo()
    this.loadCartCount();
  }
  private loadUserInfo(): void {
    const userInfo = this.userinfo.getUserInfo();
    this.user = userInfo?.name ?? '';
  }
  //Lấy số lượng sản phẩm trong giỏ
  private loadCartCount():void {
    this.cartService.cartCount$.subscribe((count: number) => {
      this.sum = count;
    });
  }
  // // Danh sách sản phẩm
  // private loadProducts(): void {
  //   this.productService.listproducts().subscribe((data: any) => {
  //     this.products = data;
  //   })
  // }
}
