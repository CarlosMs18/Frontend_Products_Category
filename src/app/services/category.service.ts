import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryResponse } from '../interfaces/category-response.interface';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public base_url : string = environment.base_url;
  constructor(private http : HttpClient) { }

  public getCategories(){
    return this.http.get<CategoryResponse>(`${this.base_url}/categories`);
  }

  public getCategorieUnique(id : number){
    return this.http.get<CategoryResponse>(`${this.base_url}/categories/${id}`);
  }

  public postCategory(category : Category){

    return this.http.post<CategoryResponse>(`${this.base_url}/categories`, category);
  }


  public updateCategory(category : Category){
    console.log(`${this.base_url}/categories/${category.id}`)
    return this.http.put<CategoryResponse>(`${this.base_url}/categories/${category.id}`, category);
  }



  public deleteCategories(id : number){
    return this.http.delete<CategoryResponse>(`${this.base_url}/categories/${id}`);
  }


}
