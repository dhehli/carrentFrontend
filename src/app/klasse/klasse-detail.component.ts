import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Klasse }        from './klasse';
import { KlasseService } from './klasse.service';

@Component({
  selector: 'klasse-detail',
  templateUrl: './klasse-detail.component.html'
})
export class KlasseDetailComponent implements OnInit {
  klasse: Klasse;

  constructor(
    private klasseService: KlasseService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.klasseService.getKlasse(+params.get('id')))
      .subscribe(klasse => this.klasse = klasse);
  }

  save(): void {
    this.klasseService.update(this.klasse)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
