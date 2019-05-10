import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupGoalHttpService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  deleteGroupGaol(id: string): Observable<any> {
    return this._http.delete(this._userService.BACKURL + 'api/groupGoals/' + id, { headers: this._userService.getHeaders() });
  }

  createGroupGoal(goalType: any, name: string, workout: string = '-1'): Observable<Object> {
    const body = JSON.stringify({
      Name: name,
      GoalType: goalType,
      WorkoutId: workout
    });
    return this._http.post(this._userService.BACKURL + 'api/groupGoals', body,
      { headers: this._userService.getHeaders() });
  }

  getGroupGoal(id: string): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/groupGoals/' + id, { headers: this._userService.getHeaders() });
  }

}
