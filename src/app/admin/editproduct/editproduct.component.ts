import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { CategoryService } from '../../service/category.service';

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
    private category: CategoryService
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
      quantity:['']

    });
 this.product.productbyid(this.product_id).subscribe((product:any) => {
  console.log(product);
  this.editProductForm.patchValue({
        ...product,
       categoryId:product.categoryId
       // imageUrl: product.thumbnail
      });
 })

  }
  editProduct(){
    const productData = {
      name: this.editProductForm.value.name,
      categoryid: this.selectedcategory, 
      price: this.editProductForm.value.price,
      quantity: this.editProductForm.value.quantity,
      image: this.file
    };
             this.product.update(productData,this.product_id).subscribe({
            next:(response)=>{
console.log(response)
            },
            error:(err)=>{
              console.log("Lỗi");
            }
            })
             
      
    // const dialogRef = this.dialog.open(ConfirmationDialogEditComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     if (this.editUserForm.valid) {
    //       this.userService.updateUser(this.editUserForm.value).subscribe((user:any) => {
    //         console.log('User added successfully');
    //         this.router.navigate(['/admin']);
    //       }, error => {
    //         console.error('Error adding user', error);
    //       });
    //     }
    //   }
    // });
  }
file:any;
imageUrl:any
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  
  }
}
