import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';
import { GoalProgress } from '../../../models/goal-progress.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoalProgressHttpService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  updateProgressState(goalProgress: any, isGroup: boolean): Observable<boolean> {
    const body = JSON.stringify({
      id: goalProgress.id,
      IsGroup: isGroup,
      IsDone: !goalProgress.isDone,
      GoalNumberValue: goalProgress.goalNumberValue,
      GoalStringValue: goalProgress.goalStringValue
    });
    return this._http.patch<GoalProgress>(this._userService.BACKURL + 'api/goalProgress', body,
      { headers: this._userService.getHeaders() }).pipe(
        map(progress => {
          return progress.isDone;
        })
      );
  }
}
