import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Auto } from './auto';

@Injectable()
export class AutoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8080/restAPI/auto';  // URL to web api

  constructor(private http: Http) { }

  getAutos(): Promise<Auto[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => JSON.parse(response.text()) as Auto[])
               .catch(this.handleError);
  }

  getAuto(id: number): Promise<Auto> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => JSON.parse(response.text()) as Auto)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(marke: string, typ: string, klasseId: number): Promise<any> {
    return this.http
      .post(this.url, JSON.stringify(
        {marke: marke, typ: typ, klasse: {id: klasseId}}
      ), {headers: this.headers})
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  update(auto: Auto, klasseId: number): Promise<Auto> {
    let data = {marke: auto.marke, typ: auto.typ, klasse: {id: klasseId}};
    const url = `${this.url}/${auto.id}`;
    return this.http
      .put(url, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(() => auto)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
