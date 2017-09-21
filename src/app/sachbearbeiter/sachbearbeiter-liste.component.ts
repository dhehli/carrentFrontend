import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Sachbearbeiter }        from './sachbearbeiter';
import { SachbearbeiterService } from './sachbearbeiter.service';

@Component({
  selector: 'sachbearbeiter-liste',
  templateUrl: './sachbearbeiter-liste.component.html'
})
export class SachbearbeiterListeComponent implements OnInit {
  sachbearbeiter: Sachbearbeiter[] = [];
  selectedSachbearbeiter: Sachbearbeiter;

  constructor(
    private sachbearbeiterService: SachbearbeiterService,
    private router: Router
  ) { }

  getAllSachbearbeiter(): void {
    this.sachbearbeiterService
        .getAllSachbearbeiter()
        .then(sachbearbeiter => this.sachbearbeiter = sachbearbeiter);
  }

  add(vorName: string, name: string): void {
    vorName = vorName.trim();
    name = name.trim();
    if (!vorName || !name) { return; }
    this.sachbearbeiterService.create(vorName, name)
      .then(sachbearbeiter => {
        this.getAllSachbearbeiter();
        this.selectedSachbearbeiter = null;
      });
  }

  delete(sachbearbeiter: Sachbearbeiter): void {
    this.sachbearbeiterService
        .delete(sachbearbeiter.id)
        .then(() => {
          this.sachbearbeiter = this.sachbearbeiter.filter(h => h !== sachbearbeiter);
          if (this.selectedSachbearbeiter === sachbearbeiter) { this.selectedSachbearbeiter = null; }
        });
  }

  ngOnInit(): void {
    this.getAllSachbearbeiter();
  }
}
