import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './mantenimiento/products/products.component';
import { CategoryComponent } from './mantenimiento/category/category.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ProductsComponent,
    CategoryComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ]
})
export class PagesModule { }
