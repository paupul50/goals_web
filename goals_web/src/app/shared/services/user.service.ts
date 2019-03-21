import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private BACKURL = 'http://localhost:52503/';
  constructor(private _http: HttpClient) {

  }

  createUser(email: string, password: string, firstname: string, surname: string): Observable<any> {
    const body = JSON.stringify({
      Username: email,
      Password: password,
      FirstName: firstname,
      LastName: surname
    });
    return this._http.post(this.BACKURL + 'api/users/create', body, this.httpOptions);
  }

  login(email: string, password: string): Subject<boolean> {
    const body = JSON.stringify({
      username: email,
      password: password
    });
    const result: Subject<boolean> = new Subject<boolean>();
    this._http.post(this.BACKURL + 'api/users/authenticate', body, this.httpOptions).subscribe((response: any) => {
      localStorage.setItem('access_token', 'Bearer ' + response.token);
      result.next(true);
    }, (
        (err: Error) => {
          result.next(false);
        }
      ));

    return result;
  }
  getToken(): any {
    return localStorage.getItem('access_token');
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    this._http.delete(this.BACKURL + 'api/users/logout',  httpOptions).subscribe((response: any) => {
    });
    localStorage.removeItem('access_token');
  }
}
