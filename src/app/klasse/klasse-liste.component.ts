import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Klasse }        from './klasse';
import { KlasseService } from './klasse.service';

@Component({
  selector: 'klasse-liste',
  templateUrl: './klasse-liste.component.html'
})
export class KlasseListeComponent implements OnInit {
  klassen: Klasse[] = [];
  selectedKlasse: Klasse;

  constructor(
    private klasseService: KlasseService,
    private router: Router
  ) { }

  getKlassen(): void {
    this.klasseService
        .getKlassen()
        .then(klassen => this.klassen = klassen);
  }

  add(klassenName: string, tagesgebuehr: number): void {
    klassenName = klassenName.trim();
    if (!klassenName || !tagesgebuehr) { return; }
    this.klasseService.create(klassenName, tagesgebuehr)
      .then(klasse => {
        this.getKlassen();
        this.selectedKlasse = null;
      });
  }

  delete(klasse: Klasse): void {
    this.klasseService
        .delete(klasse.id)
        .then(() => {
          this.klassen = this.klassen.filter(h => h !== klasse);
          if (this.selectedKlasse === klasse) { this.selectedKlasse = null; }
        });
  }

  ngOnInit(): void {
    this.getKlassen();
  }
}
