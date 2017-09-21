import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Kunde } from './kunde';

@Injectable()
export class KundeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8080/restAPI/kunde';  // URL to web api

  constructor(private http: Http) { }

  getKunden(): Promise<Kunde[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => JSON.parse(response.text()) as Kunde[])
               .catch(this.handleError);
  }

  getKunde(id: number): Promise<Kunde> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => JSON.parse(response.text()) as Kunde)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string, vorname: string, strasse: string, plz: number, ort: string, sachbearbeiterId: number): Promise<any> {
    return this.http
      .post(this.url, JSON.stringify(
        {vorname: vorname, name: name, strasse: strasse, plz: plz, ort: ort, sachBearbeiter: {id: sachbearbeiterId}}
      ), {headers: this.headers})
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  update(kunde: Kunde, sachbearbeiterId: number): Promise<Kunde> {
    let data = {
      vorname: kunde.vorname,
      name: kunde.name,
      strasse: kunde.strasse,
      plz: kunde.plz,
      ort: kunde.ort,
      sachBearbeiter: {id: sachbearbeiterId}
    };
    const url = `${this.url}/${kunde.kundenId}`;
    return this.http
      .put(url, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(() => kunde)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
