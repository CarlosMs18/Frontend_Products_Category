import { Injectable } from '@angular/core';
import { sideBarMenu } from '../interfaces/sidebarMenu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {
  public enlacesSidebarTop : sideBarMenu[] = [];
  public enlacesSidebarBot : sideBarMenu[] = [];
  constructor() {
    this.enlacesSidebarBot = [
      {
        nombre : 'Settings',
        icono : 'bx bxs-cog',
        ruta : '#'
      },
      {
        nombre : 'Logout',
        icono : 'bx bxs-log-out-circle',
        ruta : '#',
        class : 'logout'
      }
    ]

    this.enlacesSidebarTop = [
      {
        nombre : 'Product',
        icono : 'bx bxs-dashboard',
        ruta : ''
      },
      {
        nombre : 'Category',
        icono : 'bx bxs-shopping-bag-alt',
        ruta : 'category'
      },
    /*   {
        nombre : 'Analytics',
        icono : 'bx bxs-doughnut-chart',
        ruta : '#'
      },
      {
        nombre : 'Message',
        icono : 'bx bxs-message-dots',
        ruta : '#'
      },
      {
        nombre : 'Team',
        icono : 'bx bxs-group',
        ruta : '#'
      } */
    ]

   }
}
