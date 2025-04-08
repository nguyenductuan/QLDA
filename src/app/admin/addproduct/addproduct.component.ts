import { Component, OnInit, ɵprovideZonelessChangeDetection } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { ProductsService } from '../../service/products.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
constructor(private category: CategoryService,  private router:Router,
  private product:ProductsService,private fb: FormBuilder,    private snackBar: MatSnackBar,
    
   
      public dialog: MatDialog,
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
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      quantity:['', [Validators.required,  Validators.pattern('^[0-9]+$')]],
      status:['', [Validators.required]],
      category: ['',[Validators.required]],
      image: ['',[Validators.required]]
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
  this.submitted = true;
  console.log(this.addproduct.valid);
  if (this.addproduct.valid){
  console.log("Dữ liệu hợp lệ");
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
         if (result) {
             this.product.addproduct(productData).subscribe((data: any) => {
              this.snackBar.open(data.message, 'Đóng', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
              if(data.status == 200){
                this.router.navigate(['/admin/listproduct']);
              }
               
            }, error => {
              this.snackBar.open(error.error.message, 'Đóng', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
            });
         }
       });
      
      }
      else{
        console.log("Lỗi")
         // Duyệt qua các control trong form để log lỗi
      for (const controlName in this.addproduct.controls) {
        const control = this.addproduct.controls[controlName];
        
        if (control.invalid) {
          console.log(`Lỗi ở trường: ${controlName}`);
          
          // Kiểm tra lỗi cụ thể của từng control
          for (const error in control.errors) {
            console.log(`Lỗi ${error} ở trường ${controlName}`);
          }
        }
      }
      }
  }
}
