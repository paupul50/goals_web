import { Component, OnInit } from '@angular/core';
import { WorkoutCreateService } from '../../services/workout-create/workout-create.service';
import { WorkoutService } from '../../../../shared/services/workout/workout.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-start-workout',
  templateUrl: './start-workout.component.html',
  styleUrls: ['./start-workout.component.css']
})
export class StartWorkoutComponent implements OnInit {
  id: string;
  isWorkoutLoaded = false;
  constructor(public workoutCreateService: WorkoutCreateService,
    private _workoutService: WorkoutService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._workoutService.getUserWorkout(this.id).subscribe((workout: any) => {
        console.log('workout', workout);
        this.isWorkoutLoaded = true;
        this.workoutCreateService.routePoints = workout.workoutWithRoutePoints;
      });
    });

  }

  setInfoWindow(routePoint: any) {
    this.workoutCreateService.infoWindow = routePoint;
  }

  ngOnInit() {
  }

}
