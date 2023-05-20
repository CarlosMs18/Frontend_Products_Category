import { ConfirmService } from './../../../services/confirm.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse } from 'src/app/interfaces/product-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { NewProductComponent } from 'src/app/components/new-product/new-product.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public metodos : string[] = ['category', 'product']
  public dataProduct   : productTable[] = []
  public displayColumns : string[] = ['id','nombre','price','account','category','actions']
  public dataSource = new MatTableDataSource<productTable>()

  @ViewChild(MatPaginator)
  paginator! : MatPaginator

  constructor(
    private productService : ProductService,
    private toastr : ToastrService,
    private dialog : MatDialog,
    private confirmService : ConfirmService
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

        }
      }
    )
  }
  procesandoCategoriesResponse(data : ProductResponse){
      const {metadata , productResponse : {product}} = data



      if(metadata[0].code == "00"){
        product.forEach((element : any)=> {

          element.category = element.category.nombre;

          this.dataProduct.push(element)

        })
        this.dataSource = new MatTableDataSource<productTable>(this.dataProduct);
        this.dataSource.paginator = this.paginator;
      }
  }


  agregarProducto(){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width :'450px'
    })

    dialogRef.afterClosed().subscribe((result : number) => {

    })
  }



  eliminarProduct(id : number){
    this.confirmService.entidad = 'productos'
    const dialogRef = this.dialog.open(ConfirmComponent,{
        data : {id},
        width :'450px'
    })

    dialogRef.afterClosed().subscribe((result : number)=> {

      if(result == 1){
        this.toastr.info(`El producto N° ${id} fue eliminado con exito`, "producto eliminado");
        this.dataProduct = this.dataProduct.filter(data => data.id != id);
        this.dataSource = new MatTableDataSource<productTable>(this.dataProduct);
        this.dataSource.paginator = this.paginator;
      }else if(result == 2){
        this.toastr.error(`Se produjo un error al eliminar el producto ${id}`)
      }

    })


  }
}



export interface productTable{
    id : number,
    nombre : string,
    price : number,
    account : string,
    category : string
}
