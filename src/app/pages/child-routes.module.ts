import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './mantenimiento/products/products.component';
import { CategoryComponent } from './mantenimiento/category/category.component';


const routes : Routes = [
    {path : '', component: ProductsComponent ,data : {titulo : 'Products'}},
    {path : 'category', component: CategoryComponent ,data : {titulo : 'Category'}}
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ChildRoutingModule {}