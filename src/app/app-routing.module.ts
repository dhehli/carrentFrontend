import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KlasseListeComponent }   from './klasse/klasse-liste.component';
import { KlasseDetailComponent }   from './klasse/klasse-detail.component';
import { AutoListeComponent }   from './auto/auto-liste.component';
import { AutoDetailComponent }   from './auto/auto-detail.component';
import { SachbearbeiterListeComponent }   from './sachbearbeiter/sachbearbeiter-liste.component';
import { SachbearbeiterDetailComponent }   from './sachbearbeiter/sachbearbeiter-detail.component';
import { KundeListeComponent }   from './kunde/kunde-liste.component';
import { KundeDetailComponent }   from './kunde/kunde-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'klasse',  component: KlasseListeComponent },
  { path: 'klasse/:id',  component: KlasseDetailComponent },
  { path: 'auto',  component: AutoListeComponent },
  { path: 'auto/:id',  component: AutoDetailComponent },
  { path: 'sachbearbeiter',  component: SachbearbeiterListeComponent },
  { path: 'sachbearbeiter/:id',  component: SachbearbeiterDetailComponent },
  { path: 'kunde',  component: KundeListeComponent },
  { path: 'kunde/:id',  component: KundeDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
