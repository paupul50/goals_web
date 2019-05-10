import { Component } from '@angular/core';
import { WorkoutHttpService } from '../../services/workout/workout-http.service';
import { WorkoutSessionHttpService } from '../../services/workout-session/workout-session-http.service';
import { WorkoutService } from '../../services/workout-create/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent {
  workouts: any[];
  groupWorkouts: any[];
  isGroupWorkoutsLoaded = false;
  isWorkoutsLoaded = false;
  constructor(
    private _workoutService: WorkoutService,
    private _workoutHttpService: WorkoutHttpService,
    private _workoutSessionHttpService: WorkoutSessionHttpService,
    private _router: Router) {
    this.initializeUserWorkouts();
    this.initializeUserSession();
  }

  private initializeUserWorkouts(): void {
    this._workoutHttpService.getUserWorkouts().subscribe((workouts: any[]) => {
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
    this._workoutHttpService.getGroupWorkouts().subscribe((workouts: any[]) => {
      this.groupWorkouts = workouts;
      this.isGroupWorkoutsLoaded = true;
    });
  }

  private initializeUserSession(): void {
    this._workoutSessionHttpService.GetCurrentWorkoutSession().subscribe((result: any) => {
      if (result == null) { // if no active workout session
        this._workoutService.isCheckedIfLastWorkoutIsDone = true;
      } else { // if workout session is active
        this._workoutService.isCheckedIfLastWorkoutIsDone = true;
        this._workoutService.isWorkoutSession = true;
        this._workoutService.currentSessionPoint = result.progressIndex;
        this._workoutService.startCheckingCurrentCoords();
        this._router.navigate(['/workout/session', result.workoutId]);
      }
    });
  }
  removeWorkout(id: string) {
    this._workoutHttpService.deleteWorkout(id).subscribe(() => {
      const newList = [];
      this.workouts.forEach(workout => {
        if (id !== workout.id) {
          newList.push(workout);
        }
      });
      this.workouts = newList;
    });
  }
}
