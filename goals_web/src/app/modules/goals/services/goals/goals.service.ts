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

  constructor(private _http: HttpClient, private _userService: UserService) { }

  deleteUserGoal(id: string): Observable<any> {
    return this._http.delete(this._userService.BACKURL + 'api/goals/' + id, { headers: this._userService.getHeaders() });
  }

  createUserGoal(goalType: any, name: string, goalValues: any): Observable<any> {
    const body = JSON.stringify({
      Goalname: name,
      GoalType: goalType,
      IsGroupGoal: goalValues.IsGroupGoal,
      WorkoutId: goalValues.WorkoutId,
      GoalNumberValue: goalValues.GoalNumberValue,
      GoalStringValue: goalValues.GoalStringValue
    });
    return this._http.post(this._userService.BACKURL + 'api/goals/create', body,
      { headers: this._userService.getHeaders() });
  }

  synchroniseGoogleData(): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/googleFit',
      { headers: this._userService.getHeaders() });
  }

  getUserGoal(id: string): Observable<Goal> {
    return this._http.get<Goal[]>(this._userService.BACKURL + 'api/goals/' + id, { headers: this._userService.getHeaders() }).pipe(
      map(goal => {
        return this.mapGoal(goal);
      })
    );
  }

  getUserTodayGoalWithProgress(): Observable<GoalWithProgressModel[]> {
    return this._http.get<GoalWithProgressModel[]>(this._userService.BACKURL + 'api/goals/todayProgress',
      { headers: this._userService.getHeaders() });
    // .pipe(
    //   map((goalWithProgress: any) => {
    //     return this.mapGoalsWithProgress(goalWithProgress);
    //   }));
  }

  GetUserGoalsWithProgress(date: Date, limit: number = 20): Observable<GoalWithProgressModel[]> {
    const body = JSON.stringify({
      DateTimeOffset: date.toJSON(),
      DayLimit: limit
    });
    return this._http.post<GoalWithProgressModel[]>(this._userService.BACKURL + 'api/goals/progressHistory',
      body, { headers: this._userService.getHeaders() })
      .pipe(
        map((goalsWithProgress: any) => {
          return this.mapGoalsWithProgress(goalsWithProgress);
        }));
  }

  private mapGoal(goal: any): Goal {
    if (goal) {
      return new Goal({
        id: goal.id,
        createdAt: new Date(goal.createdAt),
        name: goal.name
      });
    }
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
          isDummy: goalProgress.isDummy,
          numberValue: goalProgress.goalNumberValue,
          stringValue: goalProgress.goalStringValue
        }));
      });
      goalsProgress.push(new GoalWithProgressModel({
        goal: new Goal({
          id: goal.id,
          createdAt: new Date(goal.createdAt),
          name: goal.name,
          type: goal.goalType,
          numberValue: goal.goalNumberValue,
        }),
        goalProgressCollection: progressCollection
      })
      );
    });
    return goalsProgress;
  }
}
