import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  constructor() {}
  minDate = new Date(2022, 2, 24);
  maxDate = new Date(2022, 3, 24);
  datepickerControl: FormControl = new FormControl(new Date(2022, 2, 24), [Validators.required]);

  ngOnInit(): void {}
}
