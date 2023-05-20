import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryResponse } from 'src/app/interfaces/category-response.interface';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {

  public categoryForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef : MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Category,
    private categoryService : CategoryService


  ){
    this.categoryForm = this.fb.group({
      nombre : ['', [Validators.required, Validators.minLength(6)]],
      descripcion : ['',Validators.required],
    })
  }

  onSave(){
    if(this.categoryForm.invalid){
      this.categoryForm.markAllAsTouched();
      return;
    }
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


  onCancel(){
    this.dialogRef.close(3);
  }

  campoInvalido(campo : string) : boolean {
    if(this.categoryForm.get(campo)?.invalid){
      return true
    }else{
      return false;
    }
  }
}
