import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  getUserGroup(): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/group',
      { headers: this._userService.getHeaders() });
  }

  createGroup(name: string): Observable<Object> {
    const body = JSON.stringify({
      GroupName: name,
    });
    return this._http.post(this._userService.BACKURL + 'api/group', body,
      { headers: this._userService.getHeaders() });
  }

  deleteGroup(): Observable<Object> {
    return this._http.delete(this._userService.BACKURL + 'api/group',
      { headers: this._userService.getHeaders() });
  }

}
