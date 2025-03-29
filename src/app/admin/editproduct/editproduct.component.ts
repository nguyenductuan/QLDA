import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { CategoryService } from '../../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogEditComponent } from '../../common/confirmation-dialog-edit/confirmation-dialog-edit.component';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent implements OnInit {

  constructor( private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private product: ProductsService,
    private category: CategoryService,public dialog: MatDialog
  ){}
  product_id: any ;
  categorylist:any;
editProductForm: FormGroup;
selectedcategory:any;
  ngOnInit(): void {
this.product_id =  this.route.snapshot.paramMap.get('id');
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
    this.editProductForm = this.fb.group({
      name: [''],
      price: [''],
      quantity:[''],
      category:[''],
      thumbnail: ['']  // Thêm trường lưu tên file ảnh

    });

 this.product.productbyid(this.product_id).subscribe((product:any) => {
  console.log(product);
  this.editProductForm.patchValue({
    productId: product.productId,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    createdate: product.createdate,
    updatedate: product.updatedate,
    category: product.category?.categoryId || '' , // Gán categoryId vào form
    thumbnail: product.thumbnail || ''  // Gán tên file ảnh
      });
      this.imageUrl = product.thumbnail ? `http://localhost:8080/product/images/${product.thumbnail}` : null;
 })

  }
  editProduct(){
    const productData = {
      name: this.editProductForm.value.name,
      categoryid: this.editProductForm.value.category,
      price: this.editProductForm.value.price,
      quantity: this.editProductForm.value.quantity,
 image: this.file // chỉ gửi ảnh mới

    //  image: this.file ? this.file :this.editProductForm.value.thumbnail // Giữ ảnh cũ nếu không chọn ảnh mới
    };
    // this.product.update(productData, this.product_id).subscribe({
    //   next: (response) => {
    //     console.log("Cập nhật sản phẩm thành công")
    //   },
    //   error: (err) => {
    //     console.log("Cạp nhật sản phẩm thất bại", err);
    //   }
    // })
   const dialogRef = this.dialog.open(ConfirmationDialogEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editProductForm.valid) {
          this.product.update(productData, this.product_id).subscribe({
            next: (response) => {
              console.log("Cập nhật sản phẩm thành công")
            },
            error: (err) => {
              console.log("Cạp nhật sản phẩm thất bại", err);
            }
          })
        }
      }
    });
  }
file:any;
imageUrl:any
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    //đoạn code khi upload ảnh mới -> hiển thị ảnh mới trên giao diện
    if (this.file) {
      this.editProductForm.patchValue({ thumbnail: this.file.name });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file);
    }
  
  }
}
