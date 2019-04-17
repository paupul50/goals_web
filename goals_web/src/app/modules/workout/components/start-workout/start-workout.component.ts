import { WorkoutSessionService } from './../../services/workout-session/workout-session.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutCreateService } from '../../services/workout-create/workout-create.service';
import { WorkoutService } from '../../services/workout/workout.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-start-workout',
  templateUrl: './start-workout.component.html',
  styleUrls: ['./start-workout.component.css']
})
export class StartWorkoutComponent implements OnInit, OnDestroy {
  id: string;
  isWorkoutLoaded = false;



  constructor(public workoutCreateService: WorkoutCreateService,
    private _workoutService: WorkoutService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    if (!this.workoutCreateService.isCheckedIfLastWorkoutIsDone) {
      this._router.navigate(['workout']);
    } else {
      this._activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
        this._workoutService.getUserWorkout(this.id).subscribe((workout: any) => {
          console.log('workout', workout);
          this.isWorkoutLoaded = true;
          this.workoutCreateService.routePoints = workout.workoutWithRoutePoints;
          this.workoutCreateService.isWorkoutSession = true;
          this.workoutCreateService.workoutId = this.id;
          console.log('sessionPoint', this.workoutCreateService.currentSessionPoint);
          if (this.workoutCreateService.currentSessionPoint > 1) {
            this.workoutCreateService.isSessionStarted = true;
            this.workoutCreateService.loadWorkoutProgress();
          }
        });
      });
    }
  }

  setInfoWindow(routePoint: any) {
    this.workoutCreateService.infoWindow = routePoint;
  }

  startWorkoutSession() {
    this.workoutCreateService.startWorkoutSession();
  }

  endWorkoutSession() {
    if (this.workoutCreateService.isSessionStarted) {
      this.workoutCreateService.currentSessionPoint = -1;
      this.workoutCreateService.updateWorkoutSession();
    }

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.workoutCreateService.destroyInterval();
  }


}
