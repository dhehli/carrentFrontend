import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Kunde }        from './kunde';
import { KundeService } from './kunde.service';
import { Sachbearbeiter }        from '../sachbearbeiter/sachbearbeiter';
import { SachbearbeiterService } from '../sachbearbeiter/sachbearbeiter.service';

@Component({
  selector: 'kunde-detail',
  templateUrl: './kunde-detail.component.html'
})
export class KundeDetailComponent implements OnInit {
  kunde: Kunde;
  sachbearbeiterAll: Sachbearbeiter[] = [];
  sachbearbeiter: Sachbearbeiter;

  constructor(
    private kundeService: KundeService,
    private route: ActivatedRoute,
    private sachbearbeiterService: SachbearbeiterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.kundeService.getKunde(+params.get('id')))
      .subscribe(kunde => this.kunde = kunde);
    this.getAllSachbearbeiter();
  }

  getAllSachbearbeiter(): void {
    this.sachbearbeiterService
        .getAllSachbearbeiter()
        .then(sachbearbeiterAll => this.sachbearbeiterAll = sachbearbeiterAll);

  }

  save(sachbearbeiterId: number): void {
    this.kundeService.update(this.kunde, sachbearbeiterId)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();

  }
}
