import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
constructor(private category: CategoryService,
  private product:ProductsService
){

}
addproduct:FormGroup;
selectedStatus:any;
selectedcategory:any;
categorylist:any;
statusOptions: any= [
  { label: 'Hoạt động', value: 1 },
  { label: 'Dừng hoạt động', value: 0 }
];
imageUrl: string | ArrayBuffer | null = null;

imageUrls:any;
file:any;
onFileSelected(event: any) {
  this.file = event.target.files[0];
  if (this.file) {
    const reader = new FileReader();
    reader.onload = (e) => this.imageUrl = reader.result;
    reader.readAsDataURL(this.file);
  }

}
  ngOnInit(): void {
    this.addproduct = new FormGroup(
      {
        name: new FormControl(''),
        price: new FormControl(''),
        quantity: new FormControl('')
        
       
      }
    )
    //lấy dannh sách nhóm sản phẩm
this.category.listcategorys().subscribe(
  {
    next:(data) => {
      this.categorylist = data;
      console.log(this.categorylist)
    },
    error:(err) => {
      console.error('Lỗi khi lấy danh sách sản phẩm:', err);
    }
  }
)
    
  }
  addproducts:any;
  id:any;
 
  createproduct(){
  const productData = {
    name: this.addproduct.value.name,
    categoryid: this.selectedcategory, 
    price: this.addproduct.value.price,
    quantity: this.addproduct.value.quantity,
    image: this.file
  };
this.product.addproduct(productData).subscribe({
  next:(data)=>{ 
    console.log(data);
    },
  error:(err)=>{
    console.log("Lỗi",err)
  }
})
  }
}
