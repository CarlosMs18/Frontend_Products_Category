import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from 'src/app/interfaces/category-response.interface';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm : FormGroup;
  public tituloCategoria : string = 'Nueva Categoria'
  constructor(
    private fb: FormBuilder,
    private dialogRef : MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA)public data : Category,
    private categoryService : CategoryService,
    private toastr : ToastrService



  ){
    this.categoryForm = this.fb.group({
      nombre : ['', [Validators.required, Validators.minLength(6)]],
      descripcion : ['',Validators.required],
    })




  }
  ngOnInit(): void {
    if(this.data != null){
      this.formularioActualizando(this.data);
      this.tituloCategoria = 'Actualizar Categoria'
    }
  }

  onSave(){
    if(this.categoryForm.invalid){
      this.categoryForm.markAllAsTouched();
      return;
    }


    if(this.data != null){
      const categoryUpdated : Category = {
        id : this.data.id,
        nombre : this.categoryForm.get('nombre')?.value,
        descripcion : this.categoryForm.get('descripcion')?.value
      }

      this.categoryService.updateCategory(categoryUpdated)
      .subscribe(
        {
          next : (resp : CategoryResponse) => {
            this.dialogRef.close(1);
          },
          error : (err :HttpErrorResponse) => {
            console.log(err.error.errors[0])
            this.toastr.error(`${err.error.errors[0]}`, 'Error al actualizar categoria')
            this.dialogRef.close(2);
          }
        }
      )
    }else{
      this.categoryService.postCategory(this.categoryForm.value)
      .subscribe(
        {
          next : (resp : CategoryResponse) => {
            this.dialogRef.close(1);
          },
          error : (err :Error) => {
            this.dialogRef.close(2);
          }
        }
      )
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  formularioActualizando(category :any){


      this.categoryForm = this.fb.group({
        nombre : [category.nombre, [Validators.required, Validators.minLength(6)]],
        descripcion : [category.descripcion,Validators.required],
      })


  }





}
