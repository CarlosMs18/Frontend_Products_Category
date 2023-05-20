import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  public entidad : string = '';
  constructor() { }

  get getEntidad(){
    return this.entidad;
  }

}
