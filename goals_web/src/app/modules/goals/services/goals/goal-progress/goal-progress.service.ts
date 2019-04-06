import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';
import { GoalProgress } from '../../../models/goal-progress.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoalProgressService {

  private BACKURL = 'http://localhost:52503/';

  constructor(private _http: HttpClient, private _userService: UserService) { }

  updateProgressState(goalProgress: GoalProgress): Observable<boolean> {
    const body = JSON.stringify({
      id: goalProgress.id,
      isDone: !goalProgress.isDone
    });
    return this._http.patch<GoalProgress>(this.BACKURL + 'api/goalProgress', body,
      { headers: this._userService.getHeaders() }).pipe(
        map(progress => {
          return progress.isDone;
        })
      );
  }
}
