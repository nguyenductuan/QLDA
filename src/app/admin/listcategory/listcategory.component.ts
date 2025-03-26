import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrl: './listcategory.component.css'
})
export class ListcategoryComponent implements OnInit {
constructor(private category:CategoryService){}
categorys:any;
allChecked: boolean = false;
countcategory: any;
  ngOnInit() {
    this.category.listcategorys().subscribe({
      next:(data)=>{
       this.categorys = data;
this.countcategory = data.length;
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
  openCategoryDialog(event:any){

  }
  deletecategory(id:any){

  }
  checkIfAllSelected(){}

  toggleAll(event:any){

  }

}
