import { WorkoutHttpService } from './../../../../workout/services/workout/workout-http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-group-goal',
  templateUrl: './create-group-goal.component.html',
  styleUrls: ['./create-group-goal.component.css']
})
export class CreateGroupGoalComponent {
  isWorkoutsLoaded = false;
  workouts: any[];

  constructor(private _workoutHttpService: WorkoutHttpService) {
    this.initializeGroupUnusedWorkouts();
  }

  private initializeGroupUnusedWorkouts(): void {
    this._workoutHttpService.getGroupUnusedWorkouts().subscribe((workouts: any[]) => {
      console.log(workouts);
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
  }
}
