import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductResponse } from 'src/app/interfaces/product-response.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
    constructor(
      public dialogRef : MatDialogRef<ConfirmComponent>,
      @Inject(MAT_DIALOG_DATA) public data : Product,
      private productService : ProductService,
      private toastr : ToastrService
    ){}


    onNoClick() : void{
      this.dialogRef.close(3)
    }

    delete(){
      if(this.data != null){
        this.productService.deleteProduct(this.data.id)
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
      }
    }
}
