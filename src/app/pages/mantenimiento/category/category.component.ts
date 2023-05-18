
import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryResponse } from 'src/app/interfaces/category-response.interface';
import { CategoryService } from 'src/app/services/category.service';
import { productTable } from '../products/products.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  public displayColumns : string[] = ['id', 'nombre','descripcion', 'actions'];
  public dataSource = new MatTableDataSource<categoryTable>();

  @ViewChild(MatPaginator)
  paginator! : MatPaginator;
  

  constructor(
    private categoryService : CategoryService
  ){}

  ngOnInit(): void {
     this.getCategory()
  }

  getCategory(){
    this.categoryService.getCategories()
    .subscribe(
      {
        next : (data : CategoryResponse) => {
          this.processCategoriesResponse(data);
        }
      }
    )
  }

  processCategoriesResponse(data : CategoryResponse){
      const {metadata, categoryResponse : {category}} = data;

      if(metadata[0].code == "00"){
        let dataCategory : categoryTable[] = [];
        category.forEach((element : any) => {
          dataCategory.push(element);
        })
      
        this.dataSource = new MatTableDataSource<categoryTable>(dataCategory),
        this.dataSource.paginator = this.paginator;
      }

  }

}
export interface categoryTable{
    id:number,
    nombre : string,
    descripcion : string

}