import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { ProductsService } from '../../service/products.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  addProductForm!: FormGroup;
  selectedStatus: any;
  selectedCategory: any;
  categoryList: any[] = [];
  imageError: string | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  file: File | null = null;
  submitted = false;

  statusOptions = [
    { label: 'Hoạt động', value: 1 },
    { label: 'Dừng hoạt động', value: 2 }
  ];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });

    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.listcategorys().subscribe({
      next: (data) => (this.categoryList = data),
      error: (err) => console.error('Lỗi khi lấy danh sách nhóm sản phẩm:', err)
    });
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];

    if (!this.file) {
      this.imageError = 'Vui lòng chọn ảnh sản phẩm!';
      return;
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validImageTypes.includes(this.file.type)) {
      this.imageError = 'File chọn khác định dạng!';
      return;
    }

    this.imageError = null;
    const reader = new FileReader();
    reader.onload = () => (this.imageUrl = reader.result);
    reader.readAsDataURL(this.file);
  }

  createProduct(): void {
    this.submitted = true;

    if (!this.imageUrl) {
      this.imageError = 'Chưa chọn ảnh!';
      return;
    }

    if (this.addProductForm.invalid) {
      this.logFormErrors();
      return;
    }

    const productData = {
      name: this.addProductForm.value.name,
      categoryid: this.selectedCategory,
      price: this.addProductForm.value.price,
      status: this.selectedStatus,
      quantity: this.addProductForm.value.quantity,
      image: this.file
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.addproduct(productData).subscribe({
          next: (res) => {
            this.snackBar.open(res.message, 'Đóng', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            if (res.status === 200) {
              this.router.navigate(['/admin/listproduct']);
            }
          },
          error: (err) => {
            this.snackBar.open(err.error.message || 'Lỗi khi thêm sản phẩm!', 'Đóng', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        });
      }
    });
  }

  private logFormErrors(): void {
    Object.entries(this.addProductForm.controls).forEach(([key, control]) => {
      if (control.invalid) {
        console.log(`Lỗi ở trường: ${key}`);
        Object.keys(control.errors || {}).forEach((error) => {
          console.log(` - ${error}`);
        });
      }
    });
  }
}
