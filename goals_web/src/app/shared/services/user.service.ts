import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public BACKURL = 'http://localhost:52503/';
  //  public BACKURL = '/';  // - for hosting in azure
  constructor(private _http: HttpClient, private _router: Router) {}

  createUser(userCreateObject: any): Observable<any> {
    const body = JSON.stringify(userCreateObject);
    return this._http.post(this.BACKURL + 'api/users/create', body, { headers: this.getLoginHeader() });
  }

  setGoogleAccess(token: any): Observable<any> {
    const body = JSON.stringify({
      Token: token
    });
    return this._http.post(this.BACKURL + 'api/googleFit', body, { headers: this.getHeaders() });
  }

  login(loginObject: any): Subject<boolean> {
    const body = JSON.stringify(loginObject);
    const result: Subject<boolean> = new Subject<boolean>();
    this._http.post(this.BACKURL + 'api/users/authenticate', body, { headers: this.getLoginHeader() }).subscribe((response: any) => {
      localStorage.setItem('access_token', 'Bearer ' + response.token);
      localStorage.setItem('current_user', response.username);
      if (response.isGoogleLogged === true) {
        localStorage.setItem('google_logged', 'true');
      } else {
        localStorage.setItem('google_logged', 'false');
      }


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

  getCurrentUsername(): any {
    return localStorage.getItem('current_user');
  }

  getIsGoogleLogged(): boolean {
    if (localStorage.getItem('google_logged') === 'true') {
      return true;
    } else {
      return false;
    }
  }
  removeIsGoogleLogged(): void {
    localStorage.removeItem('google_logged');
  }

  setIsGoogleLogged(): void {
    localStorage.setItem('google_logged', 'true');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  logout(): void {
    this._http.delete(this.BACKURL + 'api/users/logout', { headers: this.getHeaders() }).subscribe((response: any) => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('current_user');
      localStorage.removeItem('google_logged');
      this._router.navigate(['login']);
    });
  }

  private getLoginHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
  }

  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.getToken()
    });
  }
}
