import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Kunde }        from './kunde';
import { KundeService } from './kunde.service';
import { Sachbearbeiter }        from '../sachbearbeiter/sachbearbeiter';
import { SachbearbeiterService } from '../sachbearbeiter/sachbearbeiter.service';

@Component({
  selector: 'kunde-liste',
  templateUrl: './kunde-liste.component.html',
})
export class KundeListeComponent implements OnInit {
  kunden: Kunde[] = [];
  selectedKunde: Kunde;
  sachbearbeiterAll: Sachbearbeiter[] = [];

  constructor(
    private kundeService: KundeService,
    private sachbearbeiterService: SachbearbeiterService,
    private router: Router
  ) { }

  getKunden(): void {
    this.kundeService
        .getKunden()
        .then(kunden => this.kunden = kunden);
  }


  add(name: string, vorname: string, strasse: string, plz: number, ort: string, sachbearbeiterId: number): void {
    name = name.trim();
    vorname = vorname.trim();
    strasse = strasse.trim();
    ort = ort.trim();
    if (!name || !vorname || !strasse || !ort) { return; }
    this.kundeService.create(name, vorname, strasse, plz, ort, sachbearbeiterId)
      .then(kunde => {
        this.getKunden();
        this.selectedKunde = null;
      });
  }

  delete(kunde: Kunde): void {
    this.kundeService
        .delete(kunde.kundenId)
        .then(() => {
          this.kunden = this.kunden.filter(h => h !== kunde);
          if (this.selectedKunde === kunde) { this.selectedKunde = null; }
        });
  }

  getAllSachbearbeiter(): void {
    this.sachbearbeiterService
        .getAllSachbearbeiter()
        .then(sachbearbeiterAll => this.sachbearbeiterAll = sachbearbeiterAll);
  }

  ngOnInit(): void {
    this.getKunden();
    this.getAllSachbearbeiter();
  }
}
