import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupGoalProgressHttpService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  getTodayUserGroupGoalsProgress(): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/groupGoalProgress',
      { headers: this._userService.getHeaders() });
  }

  getSpecificGroupGoalsDayProgress(date: Date): Observable<Object> {
    const body = JSON.stringify({
      GroupProgressDate: date,
    });
    return this._http.post(this._userService.BACKURL + 'api/groupGoalProgress', body,
      { headers: this._userService.getHeaders() });
  }

  updateGroupGoalProgressState(goalProgress: any): Observable<any> {
    const body = JSON.stringify({
      id: goalProgress.id,
      isDone: !goalProgress.isDone
    });
    return this._http.patch(this._userService.BACKURL + 'api/groupGoalProgress', body,
      { headers: this._userService.getHeaders() });
  }

}
