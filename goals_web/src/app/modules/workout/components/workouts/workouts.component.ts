import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout/workout.service';
import { WorkoutSessionService } from '../../services/workout-session/workout-session.service';
import { WorkoutCreateService } from '../../services/workout-create/workout-create.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  workouts: any[];
  groupWorkouts: any[];
  isGroupWorkoutsLoaded = false;
  isWorkoutsLoaded = false;
  constructor(
    private _workoutCreateService: WorkoutCreateService,
    private _workoutService: WorkoutService,
    private _workoutSessionService: WorkoutSessionService,
    private _router: Router) {
    // load user workouts
    this._workoutService.getUserWorkouts().subscribe((workouts: any[]) => {
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
    // load group workouts
    this._workoutService.getGroupWorkouts().subscribe((workouts: any[]) => {
      this.groupWorkouts = workouts;
      this.isGroupWorkoutsLoaded = true;
    });
    this._workoutSessionService.GetCurrentWorkoutSession().subscribe((result: any) => {
      if (result == null) { // if no active workout session
        this._workoutCreateService.isCheckedIfLastWorkoutIsDone = true;
      } else { // if workout session is active
        this._workoutCreateService.isCheckedIfLastWorkoutIsDone = true;
        this._workoutCreateService.isWorkoutSession = true;
        this._workoutCreateService.currentSessionPoint = result.progressIndex;
        this._workoutCreateService.startCheckingCurrentCoords();
        this._router.navigate(['/workout/session', result.workoutId]);
      }
    });
    // check if are any workouts are in progress GetCurrentWorkoutSession
  }

  removeWorkout(id: string) {
    this._workoutService.deleteWorkout(id).subscribe((anything) => {
      const newList = [];
      this.workouts.forEach(workout => {
        if (id !== workout.id) {
          newList.push(workout);
        }
      });
      this.workouts = newList;
    });
  }

  ngOnInit() {
  }

}
