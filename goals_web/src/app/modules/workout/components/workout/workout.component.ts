import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout-create/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  constructor(private _workoutService: WorkoutService, private _router: Router) { }

  ngOnInit() {
    if (this._workoutService.isCreate) {
      this._router.navigate(['workout/create']);
    }
    if (this._workoutService.isWorkoutSession) {
      this._router.navigate(['workout/session/' + this._workoutService.workoutId]);
    }
  }
}
