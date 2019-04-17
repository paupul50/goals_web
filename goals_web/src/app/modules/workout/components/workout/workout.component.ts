import { Component, OnInit } from '@angular/core';
import { WorkoutCreateService } from '../../services/workout-create/workout-create.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  constructor(private _workoutCreateService: WorkoutCreateService, private _router: Router) { }

  ngOnInit() {
    if (this._workoutCreateService.isCreate) {
      this._router.navigate(['workout/create']);
    }
    if (this._workoutCreateService.isWorkoutSession) {
      this._router.navigate(['workout/session/' + this._workoutCreateService.workoutId]);
    }
  }

}
