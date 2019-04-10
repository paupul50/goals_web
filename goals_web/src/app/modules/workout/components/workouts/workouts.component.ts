import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../../../shared/services/workout/workout.service';

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
  constructor(private _workoutService: WorkoutService) {
    this._workoutService.getUserWorkouts().subscribe((workouts: any[]) => {
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
    this._workoutService.getGroupWorkouts().subscribe((workouts: any[]) => {
      this.groupWorkouts = workouts;
      this.isGroupWorkoutsLoaded = true;
    });
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
