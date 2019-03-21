import { GoalProgress } from './../models/goal-progress.model';
import { UserService } from 'src/app/shared/services/user.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalWithProgressModel } from '../models/goal-with-progress.model';
import { Goal } from '../models/goal.model';
@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private BACKURL = 'http://localhost:52503/';

  constructor(private _http: HttpClient, private _userService: UserService) { }

  GetUserGoalsWithProgress(date: Date, limit: number = 20): Observable<GoalWithProgressModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this._userService.getToken()
      })
    };
    const body = JSON.stringify({
      DateTimeOffset: date.toJSON(),
      DayLimit: limit
    });
    return this._http.post<GoalWithProgressModel[]>(this.BACKURL + 'api/goals/progress', body, httpOptions)
    .pipe(
      map( (goals: any) => {
        return this.mapGoals(goals);
    }));
  }

  mapGoals(goals: any): GoalWithProgressModel[] {
    const goalsWithProgress: GoalWithProgressModel[] = [];
    goals.forEach(goal => {
      const progressCollection = [];
      goal.goalProgressCollection.forEach(goalProgress => {
        progressCollection.push(new GoalProgress({
          createdAt: new Date(goalProgress.createdAt),
          id: goalProgress.id,
          isDone: goalProgress.isDone,
          isDummy: goalProgress.isDummy
        }));
      });
      goalsWithProgress.push( new GoalWithProgressModel( {
        goal: new Goal ( {
          id: goal.id,
          createdAt: new Date(goal.createdAt),
          name: goal.name
        }),
        goalProgressCollection: progressCollection
      })
        );
    });
    return goalsWithProgress;
  }
}
