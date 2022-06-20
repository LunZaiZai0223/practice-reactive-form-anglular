import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TTP-assignment';
  testForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.testForm = this.fb.group({
      testParent: [''],
    });
    // console.log(this.testForm);
  }

  addChild(name: string, group: FormGroup): void {
    this.testForm.addControl(name, group);
  }

  onSubmit(): void {
    console.log(this.testForm);
    console.log(this.testForm.value);
  }

}
