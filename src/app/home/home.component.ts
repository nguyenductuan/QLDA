import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { CartService } from '../service/cart.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private app: UserService) {
  }

  isLogin = this.app.checklogin();
  user = this.isLogin.name;
  products: any;
  sum: any;
  listcart: any;

  ngOnInit() {
  console.log("Name:", this.user);
  this.listproduct();
  
this.getCart();
  }
  listproduct(){
    this.productService.listproducts().subscribe((data: any) => {
      this.products = data;
    })
  }
  getCart(){
    this.cartService.listCartUser(this.isLogin.employee_id).subscribe((data: any) => {
      this.listcart = data;
      this.sum = this.listcart.length;
      
    })
  }
}
