import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {tap} from 'rxjs'

import { ProductResponse } from '../interfaces/product-response.interface';
import { ProductFormData } from '../interfaces/productform-data.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public base_url : string = environment.base_url;
  constructor(private http : HttpClient) { }

  public getProducts() {

    return this.http.get<ProductResponse>(`${this.base_url}/products`)

  }



  public postProduct(product :FormData){
    return this.http.post<ProductResponse>(`${this.base_url}/products`, product);
  }

  public updateProduct(product :FormData , id :string){
    return this.http.put<ProductResponse>(`${this.base_url}/products/${id}`, product);
  }

  public deleteProduct(id : number){
      return this.http.delete<ProductResponse>(`${this.base_url}/products/${id}`)
  }
}
