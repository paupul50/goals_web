import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupMembersService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  getGroupMembers(): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/groupMembers',
      { headers: this._userService.getHeaders() });
  }

  removeGroupMember(username: string): Observable<any> {
    const body = JSON.stringify({
      MemberUsername: username,
    });
    return this._http.post(this._userService.BACKURL + 'api/groupMembers/specific', body,
      { headers: this._userService.getHeaders() });
  }

  leaveGroup(): Observable<any> {
    return this._http.delete(this._userService.BACKURL + 'api/groupMembers',
      { headers: this._userService.getHeaders() });
  }

}
