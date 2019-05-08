import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSessionService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  GetCurrentWorkoutSession(): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/workoutProgress',
      { headers: this._userService.getHeaders() });
  }

  createWorkoutSession(id): Observable<Object> {
    const body = JSON.stringify({
      Id: id,
    });
    return this._http.post(this._userService.BACKURL + 'api/workoutProgress', body,
      { headers: this._userService.getHeaders() });
  }

  updateWorkoutSession(index: any, routeId: any, workoutId: any): Observable<any> {
    const body = JSON.stringify({
      WorkoutProgress: index,
      RoutePointId: routeId
    });
    return this._http.patch(this._userService.BACKURL + 'api/workoutProgress/' + workoutId, body,
      { headers: this._userService.getHeaders() });
  }

}
