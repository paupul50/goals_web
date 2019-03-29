import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private BACKURL = 'http://localhost:52503/';

  constructor(private _http: HttpClient, private _userService: UserService) { }

  getCurrentUserDescription(): Observable<any> {
    return this._http.get(this.BACKURL + 'api/userDescription',
      { headers: this._userService.getHeaders() }).pipe(
        map(progress => {
          return progress;
        })
      );
  }
  getUserDescription(id): Observable<any> {
    return this._http.get(this.BACKURL + 'api/userDescription/' + id,
      { headers: this._userService.getHeaders() }).pipe(
        map(progress => {
          return progress;
        })
      );
  }
}
