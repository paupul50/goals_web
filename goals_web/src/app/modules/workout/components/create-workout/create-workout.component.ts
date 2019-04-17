import { WorkoutService } from '../../services/workout/workout.service';
import { WorkoutCreateService } from '../../services/workout-create/workout-create.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {
  newWorkoutForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private _workoutService: WorkoutService,
    public workoutCreateService: WorkoutCreateService,
    private _router: Router) {
    if (!this.workoutCreateService.isCheckedIfLastWorkoutIsDone) {
      this._router.navigate(['workout']);
    }
  }

  ngOnInit() {
    this.newWorkoutForm = this._formBuilder.group({
      workoutNameControl: ['', Validators.required]
    });
  }

  saveWorkout() {
    if (this.newWorkoutForm.valid) {
      this._workoutService.createWorkout(this.newWorkoutForm.value.workoutNameControl,
        this.workoutCreateService.routePoints)
        .subscribe((anything) => {
          this.workoutCreateService.clearRoutePoints();
          this._router.navigate(['workout']);
        });
    }
  }

  addRoutePoint() {
    this.workoutCreateService.addNewRoutePoint();
  }
  removeRoutePoint() {
    this.workoutCreateService.removeRoutePoint();
  }
  saveRoutePoint() {
    this.workoutCreateService.saveRoutePoint();
  }

  setInfoWindow(routePoint: any) {
    this.workoutCreateService.infoWindow = routePoint;
  }
}
