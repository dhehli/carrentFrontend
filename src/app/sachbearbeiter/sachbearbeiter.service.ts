import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Sachbearbeiter } from './sachbearbeiter';

@Injectable()
export class SachbearbeiterService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://localhost:8080/restAPI/sachbearbeiter';  // URL to web api

  constructor(private http: Http) { }

  getAllSachbearbeiter(): Promise<Sachbearbeiter[]> {
    return this.http.get(this.url)
     .toPromise()
     .then(response => JSON.parse(response.text()) as Sachbearbeiter[])
     .catch(this.handleError);
  }

  getSachbearbeiter(id: number): Promise<Sachbearbeiter> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => JSON.parse(response.text()) as Sachbearbeiter)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(vorName: string, name: string): Promise<any> {
    return this.http
      .post(this.url, JSON.stringify(
        {vorName: vorName, name: name}
      ), {headers: this.headers})
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  update(sachbearbeiter: Sachbearbeiter): Promise<Sachbearbeiter> {
    const url = `${this.url}/${sachbearbeiter.id}`;
    return this.http
      .put(url, JSON.stringify(sachbearbeiter), {headers: this.headers})
      .toPromise()
      .then(() => sachbearbeiter)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
