import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootFormComponent } from './root-form.component';

describe('RootFormComponent', () => {
  let component: RootFormComponent;
  let fixture: ComponentFixture<RootFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
