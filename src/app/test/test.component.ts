import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  childForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.childForm = this.fb.group({
      name: [''],
      array: this.fb.array([])
    });
    
    const hb: FormGroup = this.fb.group({
      name: [''],
      duration: ['']
    });

    this.childForm = this.fb.group({
      name: ['', Validators.required],
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

    // (<FormArray>this.childForm.get('hobbies')).push(hb, hb);
    (<FormArray>this.childForm.get('hobbies')).push(hb);

    // (<FormArray>this.childForm.get('array')).push(this.fb.group({ v: [''], v2: ['']}));

    // this.formReady.emit(this.childForm);
  }

  ngAfterViewInit(): void {

    this.formReady.emit(this.childForm);
  }

}
