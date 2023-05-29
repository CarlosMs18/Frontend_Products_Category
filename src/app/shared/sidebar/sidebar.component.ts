import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import {sideBarMenu } from 'src/app/interfaces/sidebarMenu.interface';
import { ScriptsService } from 'src/app/services/scripts.service';
import { SidebarServiceService } from 'src/app/services/sidebar-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {
  public enlacesSidebarTop : sideBarMenu[] = [];
  public enlacesSidebarBot : sideBarMenu[] = [];
  constructor(
    private router :Router,
    private sidebarService :SidebarServiceService,
    private activatedRoute : ActivatedRoute
  ){
  this.enlacesSidebarBot = sidebarService.enlacesSidebarBot;
  this.enlacesSidebarTop = sidebarService.enlacesSidebarTop;

  }
  ngOnInit(): void {

  }






}
/*   constructor(private scriptService : ScriptsService){

  } */
