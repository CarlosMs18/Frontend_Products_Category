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
import { Category } from 'src/app/interfaces/category.interface';
import { BusquedaService } from 'src/app/services/busqueda.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public dataProduct   : productTable[] = []
  public displayColumns : string[] = ['id','nombre','price','account','category','picture','actions']
  public dataSource = new MatTableDataSource<productTable>()

  @ViewChild(MatPaginator)
  paginator! : MatPaginator

  constructor(
    private productService : ProductService,
    private busquedaService : BusquedaService,
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
          this.procesandoProductsResponse(data);

        }
      }
    )
  }
  procesandoProductsResponse(data : ProductResponse){
      const {metadata , productResponse : {product}} = data



      if(metadata[0].code == "00"){
        this.dataProduct = [];
        product.forEach((element : any)=> {

          element.category = element.category.nombre;
          element.picture = 'data:image/jpeg;base64,'+element.picture;


          this.dataProduct.push(element)

        })


        this.dataSource = new MatTableDataSource<productTable>(this.dataProduct);
        this.dataSource.paginator = this.paginator;
      }
  }

  buscarProducto(valor : string){
      if(valor.length === 0){
        return this.getProducts();
      }

      this.busquedaService.buscar('products', valor)
          .subscribe((resp : any) => {
            console.log(resp)
            this.procesandoProductsResponse(resp);
          })

  }


  agregarProducto(){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width :'450px'
    })

    dialogRef.afterClosed().subscribe((result : number) => {

      if(result == 1){
        this.toastr.success(`El producto fue agregado con exito`, "producto agregado");
        this.getProducts();

      }else if(result == 2){
        this.toastr.error(`Se produjo un error al crear el producto`)
      }
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


  editarProduct(id : number, nombre : string , price : number, account : number, category : Category){
      const dialogRef = this.dialog.open(NewProductComponent , {
        data : {id,nombre, price ,account , category},
        width : '450px'
      })

      dialogRef.afterClosed().subscribe((result : number) => {
        if(result == 1){
          this.toastr.success(`El producto numero ${id} fue actualizado con exito`, "producto actualizado");
          this.getProducts();
        } else if(result == 2){
          this.toastr.error(`Se produjo un error al actualizar el producto numero ${id}`)
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
