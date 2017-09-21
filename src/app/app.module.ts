import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


import { AppComponent }         from './app.component';
import { KlasseListeComponent } from './klasse/klasse-liste.component';
import { KlasseDetailComponent } from './klasse/klasse-detail.component';
import { KlasseService }          from './klasse/klasse.service';
import { AutoListeComponent }   from './auto/auto-liste.component';
import { AutoDetailComponent }   from './auto/auto-detail.component';
import { AutoService }   from './auto/auto.service';
import { SachbearbeiterListeComponent }   from './sachbearbeiter/sachbearbeiter-liste.component';
import { SachbearbeiterDetailComponent }   from './sachbearbeiter/sachbearbeiter-detail.component';
import { SachbearbeiterService }   from './sachbearbeiter/sachbearbeiter.service';
import { KundeListeComponent }   from './kunde/kunde-liste.component';
import { KundeDetailComponent }   from './kunde/kunde-detail.component';
import { KundeService }   from './kunde/kunde.service';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    KlasseListeComponent,
    KlasseDetailComponent,
    AutoListeComponent,
    AutoDetailComponent,
    SachbearbeiterListeComponent,
    SachbearbeiterDetailComponent,
    KundeListeComponent,
    KundeDetailComponent  
  ],
  providers: [ KlasseService, AutoService, SachbearbeiterService, KundeService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
