import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routes';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path : '', redirectTo : '/inventory', pathMatch : 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
