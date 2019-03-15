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
  constructor(private http: HttpClient) {

  }

  createUser(name: string, email: string, password: string): Observable<any> {
    const body = JSON.stringify({
      name: name,
      email: email,
      password: password
    });
    return this.http.post(this.BACKURL + 'api/register', body, this.httpOptions);
  }

  login(email: string, password: string): Subject<boolean> {
    const body = JSON.stringify({
      username: email,
      password: password
    });
    const result: Subject<boolean> = new Subject<boolean>();
    this.http.post(this.BACKURL + 'api/users/authenticate', body, this.httpOptions).subscribe((response: any) => {
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
    // const HEADERS = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.getToken() });
    // this.http.delete(this.BACKURL + 'api/logout', { headers: HEADERS }).subscribe((response: any) => {
    // });
    localStorage.removeItem('access_token');
  }
}
