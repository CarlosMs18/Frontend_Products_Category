import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryResponse } from '../interfaces/category-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public base_url : string = environment.base_url;
  constructor(private http : HttpClient) { }

  public getCategories(){
    return this.http.get<CategoryResponse>(`${this.base_url}/categories`)
  }

  public deleteCategories(id : number){
    return this.http.delete<CategoryResponse>(`${this.base_url}/categories/${id}`)
  }
}
