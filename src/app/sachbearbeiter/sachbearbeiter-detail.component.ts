import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Sachbearbeiter }        from './sachbearbeiter';
import { SachbearbeiterService } from './sachbearbeiter.service';

@Component({
  selector: 'sachbearbeiter-detail',
  templateUrl: './sachbearbeiter-detail.component.html'
})
export class SachbearbeiterDetailComponent implements OnInit {
  sachbearbeiter: Sachbearbeiter;

  constructor(
    private sachbearbeiterService: SachbearbeiterService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.sachbearbeiterService.getSachbearbeiter(+params.get('id')))
      .subscribe(sachbearbeiter => this.sachbearbeiter = sachbearbeiter);
  }

  save(): void {
    this.sachbearbeiterService.update(this.sachbearbeiter)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
