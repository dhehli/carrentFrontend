import { Component }          from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">Carrent</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" routerLink="/kunde" routerLinkActive="active">Kunde</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/auto" routerLinkActive="active">Auto</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/klasse" routerLinkActive="active">Klasse</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/sachbearbeiter" routerLinkActive="active">Sachbearbeiter</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <div class="jumbotron">
      <div class="container">
            <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'Tour of Heroes';
}
