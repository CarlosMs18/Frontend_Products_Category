
import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryResponse } from 'src/app/interfaces/category-response.interface';
import { CategoryService } from 'src/app/services/category.service';
import { productTable } from '../products/products.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { NewCategoryComponent } from 'src/app/components/new-category/new-category.component';
import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  public dataCategory : categoryTable[] = [];
  public displayColumns : string[] = ['id', 'nombre','descripcion', 'actions'];
  public dataSource = new MatTableDataSource<categoryTable>();

  @ViewChild(MatPaginator)
  paginator! : MatPaginator;


  constructor(
    private categoryService : CategoryService,
    private toastr : ToastrService ,
    private dialog : MatDialog,
    private ConfirmService : ConfirmService
  ){}

  ngOnInit(): void {
     this.getCategory()
  }

  getCategory(){
    this.categoryService.getCategories()
    .subscribe(
      {
        next : (data : CategoryResponse) => {

          console.log(data)
          this.processCategoriesResponse(data);
        }
      }
    )
  }

  processCategoriesResponse(data : CategoryResponse){
      const {metadata, categoryResponse : {category}} = data;

      if(metadata[0].code == "00"){

        this.dataCategory = [];
        category.forEach((element : any) => {
          this.dataCategory.push(element);
        })

        this.dataSource = new MatTableDataSource<categoryTable>(this.dataCategory),
        this.dataSource.paginator = this.paginator;
      }

  }


  agregarCategoria(){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width :'450px'
    })

    dialogRef.afterClosed().subscribe((result : number) => {
        if(result == 1){
          this.toastr.success(`La categoria fue agregado con exito`, "Categoria nuevo");
          this.getCategory();
        }else if(result == 2){
          this.toastr.error(`Se produjo un error al agregar la categoria`)
        }
    })
  }


  editarCategory(id : number, nombre : string ,descripcion:string){

    const dialogRef = this.dialog.open(NewCategoryComponent,{
        data : {id, nombre, descripcion},
        width:'450px'
    })

    dialogRef.afterClosed().subscribe((result : number) => {
      if(result == 1){

        this.toastr.success(`La categoria numero ${id} fue actualizada con exito`, "Categoria actualizada");
        this.getCategory();
      }else if(result == 2){

        this.toastr.error(`Se produjo un error al actualizar la categoria`, "Error al actualizar Categoria")
      }
  })
  }


  eliminarCategory(id : number){
    this.ConfirmService.entidad = 'categoria'
    const dialogRef = this.dialog.open(ConfirmComponent,{
      data : {id},
      width :'450px'
    })

    dialogRef.afterClosed().subscribe((result : number ) => {
      if(result == 1){

        this.toastr.info(`La categoria con el  N° ${id} fue eliminado con exito`, "categoria eliminado");
        this.dataCategory = this.dataCategory.filter(data => data.id != id);
        this.dataSource = new MatTableDataSource<categoryTable>(this.dataCategory)
        this.dataSource.paginator = this.paginator;
      }else if(result == 2){
        this.toastr.error(`Se produjo un error al eliminar la categoria ${id}`)
      }
    })
  }

}
export interface categoryTable{
    id:number,
    nombre : string,
    descripcion : string

}
