import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NewProductComponent } from './new-product/new-product.component';



@NgModule({
  declarations: [
    NewCategoryComponent,
    NewProductComponent
  ],
  exports : [
    NewCategoryComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
