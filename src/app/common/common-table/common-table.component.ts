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

//  selectedRows : Set<any> = new Set();
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
  onSelectRow(row: any, event: Event) {
    //$event.target là kiểu EventTarget | null, và EventTarget không có thuộc tính checked theo đúng typing của TypeScript.
   //ép kiểu EventTarget thành HTMLInputElement
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedRows.add(row);
    } else {
       this.selectedRows.delete(row);
    }
        this.selectionChange.emit(Array.from(this.selectedRows));
    this.updateAllChecked();
  }
   onSelectAll(checked: boolean) {
    // Xóa toàn bộ các dòng đã được chọn trước đó
    this.selectedRows.clear();
    // Nếu checked là true (checkbox tổng được chọn)
    if (checked) {
      // Thêm tất cả các dòng trong bảng vào tập selectedRows
      this.data.forEach(row => this.selectedRows.add(row));
    }
    // Phát sự kiện ra ngoài, truyền danh sách các dòng đã chọn (dưới dạng mảng)
    this.selectionChange.emit(Array.from(this.selectedRows));

    // Cập nhật trạng thái checkbox tổng
    this.allChecked = checked;
  }

  updateAllChecked() {
    this.allChecked = this.data.length > 0 && this.selectedRows.size === this.data.length;
  }
}
