import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse } from 'src/app/interfaces/product-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  public displayColumns : string[] = ['id','nombre','price','account','category','actions']
  public dataSource = new MatTableDataSource<productTable>()

  @ViewChild(MatPaginator)
  paginator! : MatPaginator

  constructor(
    private productService : ProductService,
  
  ){
   
  }
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this.productService.getProducts()
    .subscribe(
      {
        next : (data : ProductResponse) => {
          console.log(data)
          this.procesandoCategoriesResponse(data);
          /* console.log */
        }
      }
    )
  }
  procesandoCategoriesResponse(data : ProductResponse){
      const {metadata , productResponse : {product}} = data
     
      
      const dataProduct : productTable[] = []
      if(metadata[0].code == "00"){
        product.forEach((element : any)=> {       
          element.category = element.category.nombre;
          dataProduct.push(element) 
        })

        this.dataSource = new MatTableDataSource<productTable>(dataProduct);
        this.dataSource.paginator = this.paginator;

      }



      console.log(dataProduct)
  }
}



export interface productTable{
    id : number,
    nombre : string,
    price : number,
    account : string,
    category : string
}