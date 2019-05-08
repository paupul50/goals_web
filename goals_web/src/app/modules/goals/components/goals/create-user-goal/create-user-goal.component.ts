import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/modules/workout/services/workout/workout.service';

@Component({
  selector: 'app-create-user-goal',
  templateUrl: './create-user-goal.component.html',
  styleUrls: ['./create-user-goal.component.css']
})
export class CreateUserGoalComponent implements OnInit {
  isWorkoutsLoaded = false;
  workouts: any[];
  constructor(private _workoutService: WorkoutService) {
    this._workoutService.getUserUnusedWorkouts().subscribe((workouts: any[]) => {
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
   }

  ngOnInit() {
  }

}
