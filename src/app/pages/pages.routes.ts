import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';


const routes : Routes = [
    {
        path : 'inventory',
        component : PagesComponent,
        loadChildren : () => import('./child-routes.module').then(m => m.ChildRoutingModule)
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule {}