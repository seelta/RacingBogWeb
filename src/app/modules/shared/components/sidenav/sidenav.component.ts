import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Jugador", route: "jugador", icon: "category"},
    {name: "Productos", route: "home", icon: "production_quantity_limits"}
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

}
