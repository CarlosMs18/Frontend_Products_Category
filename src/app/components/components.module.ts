import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    NewCategoryComponent
  ],
  exports : [
    NewCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
