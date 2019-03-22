import { GoalProgress } from './../../models/goal-progress.model';
import { UserService } from 'src/app/shared/services/user.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalWithProgressModel } from '../../models/goal-with-progress.model';
import { Goal } from '../../models/goal.model';
@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  private BACKURL = 'http://localhost:52503/';

  constructor(private _http: HttpClient, private _userService: UserService) { }

  deleteUserGoal(id: string): Observable<any> {
    return this._http.delete(this.BACKURL + 'api/goals/' + id, { headers: this.getHeaders() });
  }

  createUserGoal(name: string): Observable<Goal> {
    const body = JSON.stringify({
      goalname: name,
    });
    return this._http.post<GoalWithProgressModel[]>(this.BACKURL + 'api/goals/create', body, { headers: this.getHeaders() })
      .pipe(
        map((userGoal: any) => {
          return this.mapGoal(userGoal);
        }));
  }

  getUserGoal(id: string): Observable<Goal> {
    return this._http.get<Goal[]>(this.BACKURL + 'api/goals/' + id, { headers: this.getHeaders() }).pipe(
      map(goal => {
        return this.mapGoal(goal);
      })
    );
  }

  getUserTodayGoalWithProgress(): Observable<GoalWithProgressModel[]> {
    return this._http.get<GoalWithProgressModel[]>(this.BACKURL + 'api/goals/todayProgress', { headers: this.getHeaders() })
      .pipe(
        map((goalWithProgress: any) => {
          return this.mapGoalsWithProgress(goalWithProgress);
        }));
  }

  GetUserGoalsWithProgress(date: Date, limit: number = 20): Observable<GoalWithProgressModel[]> {
    const body = JSON.stringify({
      DateTimeOffset: date.toJSON(),
      DayLimit: limit
    });
    return this._http.post<GoalWithProgressModel[]>(this.BACKURL + 'api/goals/progressHistory', body, { headers: this.getHeaders() })
      .pipe(
        map((goalsWithProgress: any) => {
          return this.mapGoalsWithProgress(goalsWithProgress);
        }));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this._userService.getToken()
    });
  }

  private mapGoal(goal: any): Goal {
    return new Goal({
      id: goal.id,
      createdAt: new Date(goal.createdAt),
      name: goal.name
    });
  }

  private mapGoalsWithProgress(goalsWithProgress: any): GoalWithProgressModel[] {
    const goalsProgress: GoalWithProgressModel[] = [];
    goalsWithProgress.forEach(goal => {
      const progressCollection = [];
      goal.goalProgressCollection.forEach(goalProgress => {
        progressCollection.push(new GoalProgress({
          createdAt: new Date(goalProgress.createdAt),
          id: goalProgress.id,
          isDone: goalProgress.isDone,
          isDummy: goalProgress.isDummy
        }));
      });
      goalsProgress.push(new GoalWithProgressModel({
        goal: new Goal({
          id: goal.id,
          createdAt: new Date(goal.createdAt),
          name: goal.name
        }),
        goalProgressCollection: progressCollection
      })
      );
    });
    return goalsProgress;
  }
}
