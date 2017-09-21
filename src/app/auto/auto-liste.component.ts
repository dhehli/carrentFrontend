import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Auto }        from './auto';
import { AutoService } from './auto.service';
import { Klasse }        from '../klasse/klasse';
import { KlasseService } from '../klasse/klasse.service';

@Component({
  selector: 'auto-liste',
  templateUrl: './auto-liste.component.html',
})
export class AutoListeComponent implements OnInit {
  autos: Auto[] = [];
  selectedAuto: Auto;
  klassen: Klasse[] = [];

  constructor(
    private autoService: AutoService,
    private klasseService: KlasseService,
    private router: Router
  ) { }

  getAutos(): void {
    this.autoService
        .getAutos()
        .then(autos => this.autos = autos);
  }

  add(marke: string, typ: string, klasseId: number): void {
    marke = marke.trim();
    typ = typ.trim();
    if (!marke || !typ || !klasseId) { return; }
    this.autoService.create(marke, typ, klasseId)
      .then(auto => {
        this.getAutos();
        this.selectedAuto = null;
      });
  }
  
  delete(auto: Auto): void {
    this.autoService
        .delete(auto.id)
        .then(() => {
          this.autos = this.autos.filter(h => h !== auto);
          if (this.selectedAuto === auto) { this.selectedAuto = null; }
        });
  }

  getKlassen(): void {
    this.klasseService
        .getKlassen()
        .then(klassen => this.klassen = klassen);
  }

  ngOnInit(): void {
    this.getAutos();
    this.getKlassen();
  }
}
