import { HeaderComponent } from './core/layout/header-component/header-component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './core/layout/footer-component/footer-component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ RouterOutlet , HeaderComponent ,FooterComponent, CommonModule],
})
export class AppComponent {

  show = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let currentRoute = this.route;

          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }

          return currentRoute.snapshot.data?.['hideHeader'];
        })
      )
      .subscribe(hide => {
        console.log('hideHeader:', hide); // 👈 debug
        this.show = !hide;
      });
  }

}
