import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  constructor() { }
  

  public loadScript(){
    let node = document.createElement('script');
    node.src = 'assets/js/script.js';
    node.type = 'text/javascript',
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
