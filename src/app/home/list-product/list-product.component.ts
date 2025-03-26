import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit {
  constructor(private productService: ProductsService) { }
  products: any;
 url = 'a';
  ngOnInit(): void {
  
   this.listproduct();
  }
  listproduct(){
    this.productService.listproducts().subscribe((data:any) =>
    {
      this.products = data;
    })
}
}
