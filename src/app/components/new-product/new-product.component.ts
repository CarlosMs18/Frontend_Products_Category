import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  public productForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef : MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Product,
    private categoryService : CategoryService
  ){

    this.productForm = this.fb.group({
        nombre : ['',[Validators.required, Validators.minLength(6)]],
        precio : [0 , [Validators.required, Validators.min(0)]],
        cantidad : [0 , [Validators.required,Validators.min(0)]],
        categoria : ['',Validators.required]
    })
  }
}
