import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { CartService } from '../../service/cart.service';
import { UserinfoService } from '../../service/userinfo.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit {
  constructor(private productService: ProductsService, private cart :CartService, private userinfo: UserinfoService ) { }
  products: any;
count:any;
sum: any;
  listcart: any;
  ngOnInit(): void {
  
   this.listproduct();
   this.getCart();
  }
  listproduct(){
    this.productService.listproducts().subscribe((data:any) =>
    {
      this.products = data;
    })
}
  getCart(){
    this.cart.listCartUser(this.userinfo.getUserInfo().employee.employeeId).subscribe((data: any) => {
      this.listcart = data;
      this.count = this.listcart.data.length;
      this.sum = this.count;
      
      // Cập nhật count vào CartService
    this.cart.updateCartCount(this.count);
    })
  }
}
