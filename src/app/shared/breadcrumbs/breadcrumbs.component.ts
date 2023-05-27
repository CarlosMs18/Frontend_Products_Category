import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map, tap } from 'rxjs';
import { ScriptsService } from 'src/app/services/scripts.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  public titulo : string = '';
  public tituloSubs$!: Subscription;

  constructor(private router : Router, private route : ActivatedRoute){
    this.tituloSubs$ =  this.getArgumentosRuta()
    .subscribe(({titulo}) => {

      this.titulo = titulo;
     /*  this.titulo = titulo */

     /*  document.title = `AdminPro - ${titulo}` */

})
}

getArgumentosRuta(){
  return this.router.events
      .pipe(
        filter((event: any)=>event instanceof ActivationEnd),
        filter((event : ActivationEnd) => event.snapshot.firstChild === null),
        map((event : ActivationEnd)  => event.snapshot.data)
      )
}
}
