import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.css'
})
export class CommonTableComponent {
  @Input() columns: { title: string, key: string }[] = [];
  @Input() data: any[] = [];
  @Input() showActions: boolean = false;  // có hiển thị cột hành động không
   @Input() selectable: boolean = false; //  checkbox

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
 @Output() selectionChange = new EventEmitter<any[]>();

 selectedRows = new Set<any>();
  allChecked = false;

   onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }
  onView(row: any) {
    this.view.emit(row);
}
 onSelectRow(row:any){
  this.selectionChange.emit(Array.from(this.selectedRows));
    this.updateAllChecked();
}
//  onSelectRow(row: any, checked: boolean) {
//     if (checked) {
//       this.selectedRows.add(row);
//     } else {
//       this.selectedRows.delete(row);
//     }
//     this.selectionChange.emit(Array.from(this.selectedRows));
//     this.updateAllChecked();
//   }
   onSelectAll(checked: boolean) {
    this.selectedRows.clear();
    if (checked) {
      this.data.forEach(row => this.selectedRows.add(row));
    }
    this.selectionChange.emit(Array.from(this.selectedRows));
    this.allChecked = checked;
  }

  updateAllChecked() {
    this.allChecked = this.data.length > 0 && this.selectedRows.size === this.data.length;
  }
}
