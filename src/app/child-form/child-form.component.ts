import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { City, districtListOfTP, districtListOfKS } from '../shared/index';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.css']
})
export class ChildFormComponent implements OnInit {
  @Input() formGroupName!: string;

  childForm!: FormGroup;
  cityList: City[] = [];
  districtList: string[] = [];

  get cityControl(): FormControl {
    return this.childForm.get('address.city') as FormControl;
  }

  get districtControl(): FormControl {
    return this.childForm.get('address.district') as FormControl;
  }

  get hobbyControlArray(): FormArray {
    return this.childForm.get('hobbies') as FormArray;
  }

  // 非必要別使用 -> 因為連同 parent 也會更動
  //   結構的問題 
  //   addControl
  constructor(private rootFormGroup: FormGroupDirective, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.childForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.cityList.push({ cityCode: 'TP', cityName: '台北市'}, { cityCode: 'KS', cityName: '高雄市'});

    // NOTE: 無法直接推 Group 進 array，因為觸發 ExpressionChangedAfterItHasBeenCheckedError 的錯誤
    //   -> 因為在 parent component 中用 {{ form.value | json }}，但是在 child
    //   推進去的，所以結束 child 的 lifecycle 後會就會在 parent 的 array 新增 group，會造成 parent
    //   的 lifecycle 未結束就新增， angular 會報錯（init 跟 結束的 state 不一樣）
    // this.hobbyControlArray.push(group);
    // setTimeout(() => this.hobbyControlArray.push(group), 1);
    
    this.handleChangeDistrictList();

  }

  onAddNewHobbyControl(): void {
    const newHobbyGroup: FormGroup = this.fb.group({
      hobbyName: ['', Validators.required],
      hobbyDuration: ['', Validators.required]
    });

    this.hobbyControlArray.push(newHobbyGroup);
  }

  onRemoveHobbyControl(hobbyIndex: number): void {
    this.hobbyControlArray.removeAt(hobbyIndex);
  }

  createHobbyControlGroup(): FormGroup {
    const hobbyControlGroup: FormGroup = new FormGroup({
      hobbyName: new FormControl('', Validators.required),
      hobbyDuration: new FormControl('', Validators.required)
    });

    return hobbyControlGroup;
  }

  handleChangeDistrictList(): void {
    this.cityControl.valueChanges.subscribe((selectedCityName: string) => {
      console.log('hit change district');
      this.districtList = [];
      this.districtControl.reset('');
      selectedCityName === '台北市' ?
        this.districtList.push(...districtListOfTP) :
        this.districtList.push(...districtListOfKS)
    });
  }

}
