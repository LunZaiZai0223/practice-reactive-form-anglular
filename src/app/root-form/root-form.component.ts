import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['./root-form.component.css']
})
export class RootFormComponent implements OnInit {
  myForm!: FormGroup;
  // dataInSessionLength!: number;
  // valueList!: any[];
  editId!: string;

  parentStringifiedList: string = '';

  constructor(private fb: FormBuilder) { }

  get fatherBirthdayControl(): FormControl {
    return this.myForm.get('father.birthday') as FormControl;
  }

  get fatherAgeControl(): FormControl {
    return this.myForm.get('father.age') as FormControl;
  }

  get motherBirthdayControl(): FormControl {
    return this.myForm.get('mother.birthday') as FormControl;
  }

  get motherAgeControl(): FormControl {
    return this.myForm.get('mother.age') as FormControl;
  }

  get employeeBirthdayControl(): FormControl {
    return this.myForm.get('employee.birthday') as FormControl;
  }

  get employeeAgeControl(): FormControl {
    return this.myForm.get('employee.age') as FormControl;
  }

  get fatherGroup(): FormGroup {
    return this.myForm.get('father') as FormGroup;
  }

  get motherGroup(): FormGroup {
    return this.myForm.get('mother') as FormGroup;
  }

  get employeeGroup(): FormGroup {
    return this.myForm.get('employee') as FormGroup;
  }

  get employeeHobbiesArray(): FormArray {
    return this.myForm.get('employee.hobbies') as FormArray;
  }

  ngOnInit(): void {
    this.editId = '';
    this.formInit();
    // this.setDataInSessionLength();
    console.log(this.myForm.get('father.birthday')?.value);
    this.addBirthdayControlHandler();
    // this.setValueList();
    // sessionStorage.setItem('key01', JSON.stringify(this.myForm.getRawValue()));

    // NOTE: for test but Ok!?
    // this.myForm.addControl('test', this.fb.group({ text: ['']}));
    // console.log(this.myForm);

    // NOTE: control.valueChanges.subscribe hit immediately after the new value is updated and
    // before the change bubbled up to its parent
    // this.myForm.get('father.name')!.valueChanges.subscribe((selectedValue) => {
    //   console.log('changed');
    //   console.log(selectedValue);
      // parent 會得到上一次的 value
      // console.log(this.myForm.value);
    // });

  }

  // ouUpdatedValueList(newList: any):void {
  //   this.valueList = newList;
  //   this.valueList.forEach((item) => {
  //     const tempObj = {
  //       id: item.id,
  //       father: item.father,
  //       mother: item.mother,
  //       employee: item.employee
  //     };
  //     sessionStorage.setItem(item.id, JSON.stringify(tempObj));
  //   });
  // }

  // onPushNewItemInValueList(valueObj: any): void {
  //   this.valueList.push(valueObj);
  //   console.log(this.valueList);
  // }

  onSubmit(): void {
    console.log(this.myForm);
    console.log(this.myForm.getRawValue());
    const formValue: object = this.myForm.getRawValue();
    const sessionKey: string = this.getSessionStorageKey();
    const tempValueObj: object = this.getTempValueObj(sessionKey, formValue);
    this.setSessionStorage(tempValueObj);
    this.setParentStringifiedList();
    // this.onPushNewItemInValueList(tempValueObj);
    // this.setDataInSessionLength();
    // this.myForm.removeControl('employee');
    this.formInit();
    console.log(this.myForm);
    this.addBirthdayControlHandler();
    // console.log(this.myForm);
    // this.employeeGroup.get('introduction')?.reset();
    // this.myForm.reset();
    // this.employeeGroup.reset();
  }

  setParentStringifiedList(): void {
    const stringifiedList: string = JSON.stringify(Object.values(sessionStorage));
    this.parentStringifiedList = stringifiedList;
  }

  // addChildForm(keyName: string, group: FormGroup): void {
  //   console.log('hit');
  //   this.myForm.addControl(keyName, group);
  // }

  // checkBirthday(selectedDate: string): void {
  //   const year: string = selectedDate.slice(0, 3);
  //   console.log(year);
  //   // const month: string = selectedDate.slice()
  // }


  formInit(): void {
    this.myForm = this.fb.group({
      father: this.fb.group({
        name: ['', Validators.required],
        id: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}\d{9}$/)]],
        birthday: ['',
          [
            Validators.minLength(8),
            Validators.pattern(/^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/),
            // NOTE: 用 arrow function 取代 bind(this)
            // this.birthdayValidator.bind(this)
            (control: FormControl) => this.birthdayValidator(control)
          ]
        ],
        age: ['', Validators.required],
      }),
      mother: this.fb.group({
        name: ['', Validators.required],
        id: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}\d{9}$/)]],
        birthday: ['',
          [
            Validators.maxLength(8),
            Validators.minLength(8),
            Validators.pattern(/^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/),
            // this.birthdayValidator.bind(this)
            (control: FormControl) => this.birthdayValidator(control)
          ]
        ],
        age: ['', Validators.required]
      }),
      employee: this.fb.group({
        name: ['', Validators.required],
        id: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}\d{9}$/)]],
        age: ['', Validators.required],
        birthday: ['',
          [
            Validators.maxLength(8),
            Validators.minLength(8),
            Validators.pattern(/^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/),
            // this.birthdayValidator.bind(this)
            (control: FormControl) => this.birthdayValidator(control)
          ]
        ],
        address: this.fb.group({
          city: ['', Validators.required],
          district: ['', Validators.required],
          street: ['', Validators.required]
        }),
        // email 通常會自己寫
        email: ['', [Validators.required, Validators.email]],
        hobbies: this.fb.array([]),
        introduction: ['', Validators.required]
      })
    });
    this.hobbyListInit(2);
  }

  hobbyListInit(counter: number): void {
    for (let i = 0; i < counter; i++) {
      const group: FormGroup = this.fb.group({
        hobbyName: ['', Validators.required],
        hobbyDuration: ['', Validators.required]
      });
      // NOTE: 強轉型別
      // (<>)..
      //   no check -> 因為 typescript 會相信我寫的型別
      // NOTE: a as b
      //   變數多型別 -> file types
      // let s: object
      // if (s as string) {
      //   // do something if it's string
      // } else if (s as number) {
      //   // do something if it's string
      // }
      // this.myForm.get('employee.hobbies').push(group);
      (<FormArray>this.myForm.get('employee.hobbies')).push(group);
    }
  }

  // setDataInSessionLength(): void {
  //   const dataLength: number = Object.keys(sessionStorage).length;
  //   this.dataInSessionLength = dataLength;
  //   console.log(this.dataInSessionLength);
  // }

  // setValueList(): void {
  //   const session: any[] = Object.keys(sessionStorage);
  //   const valueWithKey: any[] = session.map((keyName: 'string') => {
  //     return { id: keyName, ...JSON.parse(sessionStorage.getItem(keyName) || '{}')}
  //   })
  //   this.valueList = valueWithKey;
  //   console.log(this.valueList);
  // }

  handleChangeBirthday(selectedBirthday: string, birthdayControl: FormControl, ageControl: FormControl): void {
    const { valid, value }: { valid: boolean, value: string } = birthdayControl;
    if (!valid) return;
    if (value === '') {
      // 刪除全部 birthday 確保 pipe 不會出現
      birthdayControl.markAsPristine();
      return ageControl.setValue('');
    }
    const formatBirthday: string = selectedBirthday.slice(0, 4) + '/' + selectedBirthday.slice(4, 6) + '/' + selectedBirthday.slice(6, 8);
    const age: number = this.getAge(formatBirthday);
    console.log(selectedBirthday);
    console.log('success input');
    console.log(age);
    ageControl.setValue(age, { emitEvent: false });
  }

  // NOTE: valueChange 為什麼會觸發？ -> 狀態管理
  // --> patchValue without valueChanges...
  // pipe directive
  addBirthdayControlHandler(): void {
    this.fatherBirthdayControl.valueChanges.subscribe((selectedBirthday: string) => {
      this.handleChangeBirthday(selectedBirthday, this.fatherBirthdayControl, this.fatherAgeControl);
    });

    this.motherBirthdayControl.valueChanges.subscribe((selectedBirthday: string) => {
      this.handleChangeBirthday(selectedBirthday, this.motherBirthdayControl, this.motherAgeControl);
    });

    this.employeeBirthdayControl.valueChanges.subscribe((selectedBirthday: string) => {
      this.handleChangeBirthday(selectedBirthday, this.employeeBirthdayControl, this.employeeAgeControl);
    });
  }

  // NOTE: 記得 bind(this) 確保 this 的指向
  birthdayValidator(control: FormControl): { [key: string]: boolean } | null {
    console.log(1234567);
    // NOTE: 日期 yyyymmdd 的正則
    // /^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/
    const { value }: { value: string } = control;
    const error: {[key: string]: boolean } = { invalidBirthday: true  };
    if (value.length === 0 ) {
      return null;
    }
    if (value.length !== 8) return error;
    const bornYear: number = Number(value.slice(0, 4));
    const bornMonth: number = Number(value.slice(4, 6));
    const bornDate: number = Number(value.slice(6, 8));
    const today: Date = new Date();
    const currentYear: number = today.getFullYear();
    const currentMonth: number = today.getMonth() + 1;
    const currentDate: number = today.getDate();
    if (currentYear < bornYear) {
      return error;
    } else if (currentYear === bornYear && currentMonth < bornMonth) {
      return error;
    } else if (currentYear === bornYear && currentMonth === bornMonth && currentDate < bornDate) {
      return error;
    }
    return null;
  }

  getAge(formatBirthday: string): number {
    const today: Date = new Date();
    const birthday: Date = new Date(formatBirthday);
    const monthCheck: number = today.getMonth() - birthday.getMonth();
    const dateCheck: number = today.getDate() - birthday.getDate();
    let age: number = today.getFullYear() - birthday.getFullYear();

    if (monthCheck < 0 || (monthCheck === 0 && dateCheck < 0)) {
      age --;
    }

    return age;
  }

  onFillInParentForm(): void {
    this.motherGroup.patchValue({
      name: '媽',
      id: 'T111111111',
      age: 100
    });
    this.fatherGroup.patchValue({
      name: '爸',
      id: 'T111111111',
      age: 100
    });
  }

  getTempValueObj(key: string, formValue: object): {} {
    const tempObj = { id: key, ...formValue };
    return tempObj;
  }

  setSessionStorage(valueObj: any, key? : string):void {
    console.log(key);
    sessionStorage.setItem( key || valueObj.id, JSON.stringify(valueObj));
  }

  getSessionStorageKey(): string {
    return String(Math.floor(Date.now() / 1000));
  }

  testCheck(): void {
    console.log(this.myForm);
  }

  setEditId(id: string): void {
    this.editId = id;
  }

  onSetEditMode(id: string) {
    this.formInit();
    this.addBirthdayControlHandler();
    console.log(id);
    this.setEditId(id);
    console.log(this.employeeGroup);
    const found = JSON.parse(sessionStorage.getItem(id) || '{}');
    console.log(found);
    this.setParentFormValue(found);
    this.setEmployeeFormValue(found);
  }

  setParentFormValue(found: any): void {
    Object.entries(found).forEach((arr) => {
      if (arr[0] === 'father' || arr[0] === 'mother') {
        console.log('應該只會出現兩次而已喔');
        this.myForm.get(arr[0])?.setValue(arr[1])
        console.log(this.employeeGroup);
        console.log('==========!!!!!!!============~~~~~~');
      }
    });

    // console.log(this.employeeGroup);
    // console.log('end of the parent setValue');
  }

  setEmployeeFormValue(found: any) {
    const { employee } = found;
    const hobbiesLength = employee.hobbies.length;

    while (this.employeeHobbiesArray.length !== 0) {
      this.employeeHobbiesArray.removeAt(0);
    }

    this.hobbyListInit(hobbiesLength);
    console.log(this.employeeGroup);

    Object.entries(employee).forEach((arr) => {
      if (arr[0] === 'hobbies') {
        this.employeeGroup.get('hobbies')?.setValue(arr[1], { emitEvent: false });
      } else if (arr[0] === 'address') {
        this.employeeGroup.get('address')?.setValue(arr[1], { emitEvent: false });
      } else {
        this.employeeGroup.get(arr[0])?.patchValue(arr[1], { emitEvent: false });
      }
    });
  }

  onSaveEdit(): void {
    const formValue = this.myForm.getRawValue();
    this.setSessionStorage({ id: this.editId, ...formValue }, this.editId);
    this.editId = '';
    this.setParentStringifiedList();
    this.formInit();
    this.addBirthdayControlHandler();
  }

  onBackToNormalMode(): void {
    this.editId = '';
    this.formInit();
    this.addBirthdayControlHandler();
  }

  onDeletedSessionStorageItem(id: string):void {
    sessionStorage.removeItem(id);
    this.setParentStringifiedList();
    const isSameItem = this.checkDeleteTheCurrentEditingItem(id);
    if (isSameItem) {
      this.onBackToNormalMode();
    }
  }

  checkDeleteTheCurrentEditingItem(id: string): boolean {
    return id === this.editId;
  }

  onDeleteCurrentItem(): void {
    sessionStorage.removeItem(this.editId);
    this.onBackToNormalMode();
    this.setParentStringifiedList();
  }

}
