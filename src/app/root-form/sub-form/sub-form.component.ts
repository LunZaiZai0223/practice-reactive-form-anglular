import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css']
})
export class SubFormComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: [''],
      age: [''],
      birthday: [''],
      address: this.fb.group({
        city: [''],
        district: [''],
        street: ['']
      }),
      email: [''],
      hobbies: this.fb.array([]),
      introduction: ['']
    });

    this.formReady.emit(this.employeeForm);
  }

}
