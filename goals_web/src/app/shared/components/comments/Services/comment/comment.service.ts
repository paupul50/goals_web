import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  addComment(body: string, commentTarget: string, commentTargetId: number): Observable<any> {
    const requestBody = JSON.stringify({
      commentTarget: commentTarget,
      commentTargetId: commentTargetId,
      body: body
    });
    return this._http.post(this._userService.BACKURL + 'api/comment', requestBody,
      { headers: this._userService.getHeaders() });
  }

}
