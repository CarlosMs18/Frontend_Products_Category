import { ConfirmService } from './../../services/confirm.service';
import { Component , Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from 'src/app/interfaces/category-response.interface';
import { ProductResponse } from 'src/app/interfaces/product-response.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

    public entidad : string = '';

    constructor(
      public dialogRef : MatDialogRef<ConfirmComponent>,
      @Inject(MAT_DIALOG_DATA) public data : Product,
      private productService : ProductService,
      private categoryService : CategoryService,
      private confirmService : ConfirmService

    ){}


    ngOnInit(): void {
        this.entidad = this.confirmService.getEntidad;
        console.log(this.entidad);
    }


    onNoClick() : void{
      this.dialogRef.close(3)
    }

    delete(){
      if(this.data != null){

        switch (this.entidad) {
          case 'productos':
            console.log('products')
            this.productService.deleteProduct(this.data.id!)
                .subscribe(
                  {
                    next : ({metadata,productResponse:{product}}: ProductResponse )=> {
                      this.dialogRef.close(1)

                },error : (err : Error) => {
                  this.dialogRef.close(2);
                }
                  }
                );
            break;

          case 'categoria':
                this.categoryService.deleteCategories(this.data.id!)
                  .subscribe(
                    {
                      next : (response : CategoryResponse) => {
                        this.dialogRef.close(1);
                      },
                      error : (err :Error) => {
                        this.dialogRef.close(2)
                      }
                    }
                  )
            break;
          default:
            break;
        }



      /*   this.productService.deleteProduct(this.data.id)
      .subscribe(
        {
          next : ({metadata,productResponse:{product}}: ProductResponse )=> {
                this.dialogRef.close(1)


          },
          error : (err : Error) => {
            this.dialogRef.close(2);
          }
        }
      )

      }else{
        this.dialogRef.close(2);
      } */
    }else{
      this.dialogRef.close(2);
    }
  }
}
