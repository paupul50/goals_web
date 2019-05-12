import { WorkoutHttpService } from '../../services/workout/workout-http.service';
import { WorkoutService } from '../../services/workout-create/workout.service';
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
    private _workoutHttpService: WorkoutHttpService,
    public workoutService: WorkoutService,
    private _router: Router
    ) {
    if (!this.workoutService.isCheckedIfLastWorkoutIsDone) {
      this._router.navigate(['workout']);
    }
  }

  ngOnInit(): void {
    this.newWorkoutForm = this._formBuilder.group({
      workoutNameControl: ['', Validators.required]
    });
  }

  saveWorkout(): void {
    if (this.newWorkoutForm.valid) {
      this._workoutHttpService.createWorkout(this.newWorkoutForm.value.workoutNameControl,
        this.workoutService.routePoints)
        .subscribe(() => {
          this.workoutService.clearRoutePoints();
          this._router.navigate(['workout']);
        });
    }
  }

  addRoutePoint(): void {
    this.workoutService.addNewRoutePoint();
  }
  removeRoutePoint(): void {
    this.workoutService.removeRoutePoint();
  }
  saveRoutePoint(): void {
    this.workoutService.saveRoutePoint();
  }

  setInfoWindow(routePoint: any): void {
    this.workoutService.infoWindow = routePoint;
  }
}
