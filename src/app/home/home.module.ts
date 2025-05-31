import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: ListProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'productview/:id', component: ProductViewComponent },
      {path:'payment',component:PaymentComponent},
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  }
]
@NgModule({
  declarations: [
    ListProductComponent,
    ProductViewComponent,
    CartComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeModule { }
