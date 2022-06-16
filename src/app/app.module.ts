import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RootFormComponent } from './root-form/root-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { SubFormComponent } from './root-form/sub-form/sub-form.component';
import { TestComponent } from './test/test.component';
import { ValueListComponent } from './root-form/value-list/value-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RootFormComponent,
    ChildFormComponent,
    SubFormComponent,
    TestComponent,
    ValueListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
