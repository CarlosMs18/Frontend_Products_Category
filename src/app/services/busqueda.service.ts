import { Category } from './../interfaces/category.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryResponse } from '../interfaces/category-response.interface';
import { ProductResponse } from '../interfaces/product-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  public base_url : string = environment.base_url;
  constructor(private http : HttpClient) { }



  private normalizarCategorias(resultados : CategoryResponse) : CategoryResponse{
    return resultados ;
  }

  public normalizarProductos(resultados : ProductResponse) : ProductResponse{
    return resultados
  }

  buscar(tipo : 'categories' | 'products', termino : string){

    const url = `${this.base_url}/${tipo}/filter/${termino}`;
    return this.http.get<any>(url)
                  .pipe(
                    map((resp  : any) => {
                      switch(tipo){
                        case 'categories':
                          return this.normalizarCategorias(resp)

                        case 'products':
                          return this.normalizarProductos(resp)

                        default :
                          return [];
                      }
                    })
                  )
  }
}
