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
  user:any;
  
  //Lấy số lượng sản phẩm trong giỏ
  getCount(){
    this.cartService.cartCount$.subscribe((count: number) => {
      this.sum = count;
    });
  }
  // Danh sách sản phẩm
  listproduct(){
    this.productService.listproducts().subscribe((data: any) => {
      this.products = data;
    })
  }

  ngOnInit() {
  this.listproduct();
  this.user = this.userinfo.getUserInfo().name;
  this.getCount();
  }
}
