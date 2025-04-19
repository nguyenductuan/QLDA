import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { CategoryService } from '../../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogEditComponent } from '../../common/confirmation-dialog-edit/confirmation-dialog-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent implements OnInit {

  constructor( private fb: FormBuilder, 
    private route: ActivatedRoute, private snackBar: MatSnackBar,
    private router: Router,
    private product: ProductsService,
    private category: CategoryService,public dialog: MatDialog
  ){}
  product_id: any ;
  categorylist:any;
editProductForm: FormGroup;
selectedcategory:any;
selectedStatus:any;
submitted = false;
statusOptions: any[] = [
  { label: 'Hoạt động', value: 1 },
  { label: 'Dừng hoạt động', value: 2 }
];

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
    this.submitted = true;
    const productData = {
      name: this.editProductForm.value.name,
      categoryid: this.editProductForm.value.category,
      price: this.editProductForm.value.price,
      quantity: this.editProductForm.value.quantity,
 image: this.file // chỉ gửi ảnh mới

   
    };

   const dialogRef = this.dialog.open(ConfirmationDialogEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editProductForm.valid) {
          this.product.update(productData, this.product_id).subscribe({
            next: (response) => {
              console.log("Cập nhật sản phẩm thành công")
              this.snackBar.open(response.message, 'Đóng', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
              this.router.navigate(['/admin/listproduct']);
            },
            error: (err) => {
              console.log("Cập nhật sản phẩm thất bại", err);
              this.snackBar.open(err.message, 'Đóng', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
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
