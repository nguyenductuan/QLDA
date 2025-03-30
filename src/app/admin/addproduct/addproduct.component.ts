import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
constructor(private category: CategoryService,
  private product:ProductsService,private fb: FormBuilder
){

}
addproduct:FormGroup;
selectedStatus:any;
selectedcategory:any;
categorylist:any;
imageError:any;
submitted= false;
statusOptions: any= [
  { label: 'Hoạt động', value: 1 },
  { label: 'Dừng hoạt động', value: 2 }
];
imageUrl: string | ArrayBuffer | null = null;

imageUrls:any;
file:any;
onFileSelected(event: any) {
  this.file = event.target.files[0];
  if (!this.file) {
    this.imageError = "Vui lòng chọn ảnh sản phẩm!";
    return;
  }
  // Danh sách định dạng ảnh hợp lệ
  const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (!validImageTypes.includes(this.file.type)) {
    this.imageError = "File chọn khác định dạng!";
    return;
  }
  // Nếu hợp lệ, đặt giá trị file và hiển thị ảnh xem trước
  this.imageError = null;
  if (this.file) {
    const reader = new FileReader();
    reader.onload = (e) => this.imageUrl = reader.result;
    reader.readAsDataURL(this.file);
  }
}
  ngOnInit(): void { 
    this.addproduct = this.fb.group({
      name: ['',[Validators.required]],
      price: ['', [Validators.required,Validators.min(1)]],
      quantity:['', [Validators.required, Validators.min(1)]],
      status:['', [Validators.required]]
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
    this.submitted = true;
    if (!this.imageUrl) {
      this.imageError = "Chưa chọn ảnh!";
      return;
    }
  const productData = {
    name: this.addproduct.value.name,
    categoryid: this.selectedcategory, 
    price: this.addproduct.value.price,
    status: this.selectedStatus,
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
