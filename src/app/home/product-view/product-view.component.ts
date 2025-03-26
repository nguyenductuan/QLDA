import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { UserService } from '../../service/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})

export class ProductViewComponent implements OnInit {
  id: any;
  products: any
  quantity: number =1;
  listcart:any;
  sum:any;
  constructor(private product: ProductsService,
     private router: Router,
    private route: ActivatedRoute,
    private cart: CartService,private app:UserService) { }


  increment() {
    this.quantity++;
  }
  decrement() {
    if (this.quantity > 1) { // Đảm bảo số lượng không nhỏ hơn 1
      this.quantity--;
    }
  }
  private reloadSubject = new Subject<void>();  // Subject để phát tín hiệu reload
  isLogin= this.app.checklogin();
  user = this.isLogin;
  employee_id:any;

  addToCart(product_id:any) {
   
    this.employee_id = this.user.employee_id;
   
    this.cart.addTocart(product_id, this.quantity,this.employee_id).subscribe((data: any) => {
   
      console.log("M",data);
      this.getCart();
    })
// location.reload();
   
  }
  getCart(){
    this.cart.listCartUser(this.isLogin.employee_id).subscribe((data: any) => {
      this.listcart = data;
      this.sum = this.listcart.length;

    })
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productbyId();  
    this.getCart();
  }

productbyId(){
  this.product.productbyid(this.id).subscribe((data: any) => {
    this.products = data;
  })
}
}
