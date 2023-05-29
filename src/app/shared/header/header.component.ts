import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    public theme!: string | null;
    constructor(){


    }
    ngOnInit(): void {
      this.theme =  localStorage.getItem('theme')
      if(this.theme){
       document.body.classList.add('dark');
       return;
      }
    }

  cambiarStatus(){

    const switchMode = document.getElementById('switch-mode');
    if(switchMode?.classList.contains('dark')){
      console.log(switchMode)
      localStorage.removeItem('theme')

      switchMode?.classList.remove('dark')
    }else{
      localStorage.setItem('theme','dark')
      switchMode?.classList.add('dark')
    }

  }

}
