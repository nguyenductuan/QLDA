import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css'
})
export class DatepickerComponent implements OnInit {
  // start: Date;
  // end: Date;
  selectedDates: Date[];
  // event: any;
  // clickCount: number = 0;
  @Input() key: number;
constructor(){
 
  // const today = new Date();
  //   const nextWeek = new Date();
  //   nextWeek.setDate(today.getDate() - 30);
  //   this.selectedDates = [nextWeek, today];
}
@Input() defaultDates: Date[] = [];
@Output() dateSelect = new EventEmitter<any>();
ngOnInit() {
  if (this.defaultDates.length === 2) {
    this.selectedDates = this.defaultDates;
    this.dateSelect.emit({
      value: this.defaultDates
    });
  }
}
onDateSelect(event: any) {
   console.log('DatePicker event:', event);
  this.dateSelect.emit({
    value: [event]
  });
}

  // onDateSelect(event: any): void {
  //   this.clickCount++;

  //   if (this.clickCount === 1) {
  //     console.log('Lần chọn 1:', event);
  //     this.start = event

  //   }
  //   if (this.clickCount === 2) {
  //     console.log('Lần chọn 2:', event);
  //     this.end = event;
  //     this.clickCount = 0;
  //   }
  // }
}
