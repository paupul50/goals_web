import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutService } from '../../services/workout-create/workout.service';
import { WorkoutHttpService } from '../../services/workout/workout-http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-start-workout',
  templateUrl: './start-workout.component.html',
  styleUrls: ['./start-workout.component.css']
})
export class StartWorkoutComponent implements OnDestroy {
  id: string;
  isWorkoutLoaded = false;

  constructor(public workoutService: WorkoutService,
    private _workoutHttpService: WorkoutHttpService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    if (!this.workoutService.isCheckedIfLastWorkoutIsDone) {
      this._router.navigate(['workout']);
    } else {
      this.initializeUserWorkout();
    }
  }

  private initializeUserWorkout(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._workoutHttpService.getUserWorkout(this.id).subscribe((workout: any) => {
        this.isWorkoutLoaded = true;
        this.workoutService.routePoints = workout.workoutWithRoutePoints;
        this.workoutService.isWorkoutSession = true;
        this.workoutService.workoutId = this.id;

        if (this.workoutService.currentSessionPoint > 1) {
          this.workoutService.isSessionStarted = true;
          this.workoutService.loadWorkoutProgress();
        }
      });
    });
  }

  setInfoWindow(routePoint: any): void {
    this.workoutService.infoWindow = routePoint;
  }

  startWorkoutSession(): void {
    this.workoutService.startWorkoutSession();
  }

  endWorkoutSession(): void {
    if (this.workoutService.isSessionStarted) {
      this.workoutService.currentSessionPoint = -1;
      this.workoutService.updateWorkoutSession();
    }
  }

  ngOnDestroy(): void {
    this.workoutService.destroyInterval();
  }
}
