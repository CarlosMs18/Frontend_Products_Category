import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from 'src/app/interfaces/category-response.interface';
import { Category } from 'src/app/interfaces/category.interface';
import { ProductResponse } from 'src/app/interfaces/product-response.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductFormData } from 'src/app/interfaces/productform-data.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  public productForm : FormGroup;
  public categories : Category[] = [];
  public selectedFile : any;
  public nombreImagen : string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef : MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private categoryService : CategoryService,
    private productService : ProductService,
    private toastr : ToastrService
  ){
    this.getCategories();

    this.productForm = this.fb.group({
        nombre : ['',[Validators.required, Validators.minLength(6)]],
        precio : [0 , [Validators.required, Validators.min(0)]],
        cantidad : [0 , [Validators.required,Validators.min(0)]],
        categoria : ['',Validators.required],
        picture : ['', Validators.required]
    })
  }
  ngOnInit(): void {
    if(this.data != null){
      this.formularioActualizado(this.data);
    }
  }

  getCategories(){
    this.categoryService.getCategories()
        .subscribe(
          {
            next : (categorias:CategoryResponse) => {
                this.categories = categorias.categoryResponse.category;


            }
          }
        )
  }

  onFileChanged(event : any ){
   this.selectedFile = event.target.files[0];

    if(!this.selectedFile){

    }else{
      this.nombreImagen = this.selectedFile.name;


    }


  }

  onSave(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    let data : ProductFormData =  {
      nombre : this.productForm.get('nombre')?.value,
      price : this.productForm.get('precio')?.value,
      account : this.productForm.get('cantidad')?.value,
      category : this.productForm.get('categoria')?.value,
      picture : this.selectedFile

    }



    const productFormData = new FormData();
    productFormData.append('picture',data.picture, data.picture.name);
    productFormData.append('nombre',data.nombre);
    productFormData.append('price',data.price);
    productFormData.append('account',data.account);
    productFormData.append('categoryId', data.category);

      if(this.data != null){
        console.log(data)
        this.productService.updateProduct(productFormData, this.data.id)
            .subscribe(
              {
                next : (resp : ProductResponse) => {
                  this.dialogRef.close(1);

                },
                error : (err : HttpErrorResponse) => {
                  this.toastr.error(`${err.error.errors[0]}`, 'Error al actualizar producto')
                  this.dialogRef.close(2);
                }
              }
            )


      }else{

        this.productService.postProduct(productFormData)
            .subscribe(
              {
                next : (resp : ProductResponse) => {
                  this.dialogRef.close(1);
                  console.log('desde new-`product!')
                },
                error : (err : HttpErrorResponse) => {
                  this.toastr.error(`${err.error.errors[0]}`, 'Error al crear producto')
                  this.dialogRef.close(2);
                }
              }
            )
      }

  }

  onCancel(){
    this.dialogRef.close(3);
  }


  formularioActualizado(product : any){
    this.productForm = this.fb.group({
      nombre : [product.nombre,[Validators.required, Validators.minLength(6)]],
      precio : [product.price , [Validators.required, Validators.min(0)]],
      cantidad : [product.account , [Validators.required,Validators.min(0)]],
      categoria : [product.category.id,Validators.required],
      picture : ['', Validators.required]
  })
  }
}
