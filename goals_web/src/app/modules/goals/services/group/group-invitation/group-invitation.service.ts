import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupInvitationService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  getUserGroupInvitations(): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/invitation',
      { headers: this._userService.getHeaders() });
  }

  sentGroupInvitation(memberEmail: string): Observable<any> {
    const body = JSON.stringify({
      MemberUsername: memberEmail,
    });
    return this._http.post(this._userService.BACKURL + 'api/invitation', body,
      { headers: this._userService.getHeaders() });
  }

  cancelInvitation(id: number): Observable<any> {
    return this._http.delete(this._userService.BACKURL + 'api/invitation/' + id,
      { headers: this._userService.getHeaders() });
  }

  acceptInvitation(LeaderUsername: string): Observable<any> {
    const body = JSON.stringify({
      LeaderUsername: LeaderUsername,
    });
    return this._http.post(this._userService.BACKURL + 'api/invitation/accept', body,
      { headers: this._userService.getHeaders() });
  }
}
