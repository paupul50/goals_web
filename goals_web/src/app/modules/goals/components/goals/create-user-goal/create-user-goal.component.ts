import { WorkoutHttpService } from './../../../../workout/services/workout/workout-http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-user-goal',
  templateUrl: './create-user-goal.component.html',
  styleUrls: ['./create-user-goal.component.css']
})
export class CreateUserGoalComponent {
  isWorkoutsLoaded = false;
  workouts: any[];

  constructor(private _workoutHttpService: WorkoutHttpService) {
    this.initializeUnusedWorkouts();
  }

  private initializeUnusedWorkouts(): void {
    this._workoutHttpService.getUserUnusedWorkouts().subscribe((workouts: any[]) => {
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
  }
}
