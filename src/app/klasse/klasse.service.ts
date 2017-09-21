import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Klasse } from './klasse';

@Injectable()
export class KlasseService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8080/restAPI/klasse';  // URL to web api

  constructor(private http: Http) { }

  getKlassen(): Promise<Klasse[]> {
    return this.http.get(this.url)
     .toPromise()
     .then(response => JSON.parse(response.text()) as Klasse[])
     .catch(this.handleError);
  }

  getKlasse(id: number): Promise<Klasse> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => JSON.parse(response.text()) as Klasse)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(klassenName: string, tagesgebuehr: number): Promise<any> {
    return this.http
      .post(this.url, JSON.stringify(
        {klassenName: klassenName, tagesgebuehr: tagesgebuehr}
      ), {headers: this.headers})
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  update(klasse: Klasse): Promise<Klasse> {
    const url = `${this.url}/${klasse.id}`;
    return this.http
      .put(url, JSON.stringify(klasse), {headers: this.headers})
      .toPromise()
      .then(() => klasse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
