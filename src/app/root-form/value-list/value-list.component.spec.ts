import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueListComponent } from './value-list.component';

describe('ValueListComponent', () => {
  let component: ValueListComponent;
  let fixture: ComponentFixture<ValueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
