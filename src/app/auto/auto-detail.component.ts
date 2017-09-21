import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Auto }        from './auto';
import { AutoService } from './auto.service';
import { Klasse }        from '../klasse/klasse';
import { KlasseService } from '../klasse/klasse.service';

@Component({
  selector: 'auto-detail',
  templateUrl: './auto-detail.component.html'
})
export class AutoDetailComponent implements OnInit {
  auto: Auto;
  klassen: Klasse[] = [];
  klasse: Klasse;

  constructor(
    private autoService: AutoService,
    private route: ActivatedRoute,
    private klasseService: KlasseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.autoService.getAuto(+params.get('id')))
      .subscribe(auto => this.auto = auto);
    this.getKlassen();
  }

  getKlassen(): void {
    this.klasseService
        .getKlassen()
        .then(klassen => this.klassen = klassen);
  }

  save(klasseId: number): void {
    this.autoService.update(this.auto, klasseId)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();

  }
}
