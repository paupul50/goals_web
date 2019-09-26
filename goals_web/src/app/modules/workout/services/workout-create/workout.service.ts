import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';
import { Injectable } from '@angular/core';
import { LatLngLiteral } from '@agm/core';
import { Router } from '@angular/router';
import { WorkoutSessionHttpService } from '../workout-session/workout-session-http.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  isWorkoutSession = false;
  isSessionStarted = false;
  isCheckedIfLastWorkoutIsDone = false;
  isCreate = false;
  currentSessionPoint = 0;
  message = 'koordinates (getCoordsStatus)';

  interval: any;
  workoutId: string;
  userLocation: any;
  routePoints: any[] = [];
  newRoutePoint = null;

  centerCoordinates: LatLngLiteral = {
    lat: 54.904053,
    lng: 23.949231
  };

  centerCoordinatesWorkout: LatLngLiteral = {
    lat: 54.904053,
    lng: 23.949231
  };

  infoWindow: any;
  constructor(
    private _router: Router,
    private _workoutSessionHttpService: WorkoutSessionHttpService,
    private _snackbarService: SnackbarService) { }

  focusRoute(): void {
    if (this.routePoints[0]) {
      this.centerCoordinatesWorkout.lat = this.routePoints[0].lat;
      this.centerCoordinatesWorkout.lng = this.routePoints[0].lng;
    }

  }
  // make circles green when loaded
  loadWorkoutProgress(): void {
    this.routePoints.forEach(routePoint => {

      if (routePoint.index < this.currentSessionPoint) {
        routePoint.fillColour = 'green';
      }

      if (routePoint.index === this.currentSessionPoint) {
        routePoint.fillColour = 'blue';
      }
    });
  }

  // clear routes when closing workout
  clearRoutePoints(): void {
    this.routePoints = [];
    this.clearInfoWindow();
    this.isWorkoutSession = false;
    this.isCreate = false;
    this.workoutId = null;
    this.currentSessionPoint = 0;
    this.userLocation = null;
    this.newRoutePoint = null;
  }

  // clear info box when closed
  private clearInfoWindow(): void {
    this.infoWindow = null;
  }

  // to change currentLocation coordinates and if it's in the circle, change color of it
  changeUserLocation(location: any): void {
    this.userLocation = location;
    this.routePoints.forEach(routePoint => {
      if (routePoint.index === this.currentSessionPoint) {
        routePoint.fillColour = 'blue';
      }
      if (this.arePointsNear(this.userLocation, routePoint, routePoint.radius / 1000)
        && this.currentSessionPoint === routePoint.index) {
        this.updateWorkoutSession(routePoint);
      }
    });

  }

  // to update workout progress
  updateWorkoutSession(routePoint: any = {}): void {
    this._workoutSessionHttpService.updateWorkoutSession(this.currentSessionPoint, routePoint.id, this.workoutId)
      .subscribe((result: any) => {
        if (result.status === 0 || result.status === 2) {
          this.destroyInterval();
          this.clearRoutePoints();
          this._router.navigate(['workout']);
          this._snackbarService.openSnackBar('Sesija pabaigta.');
        } else {
          routePoint.fillColour = 'green';
          this.currentSessionPoint++;
          if (routePoint.index === this.currentSessionPoint) {
            routePoint.fillColour = 'blue';
          }
          this._snackbarService.openSnackBar('Taškas įveiktas.');
        }
      });
  }

  // to start workout session
  startWorkoutSession(): void {
    this.startCheckingCurrentCoords();
    this._workoutSessionHttpService.createWorkoutSession(this.workoutId).subscribe((result: any) => {
      this.currentSessionPoint = 1;
      this.isSessionStarted = true;
    });
  }

  startCheckingCurrentCoords(): void {
    this.interval = setInterval(() => {
      this.checkGeoLocation();
    }, 3000);
  }

  private checkGeoLocation(): void {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.changeUserLocation({
            lng: position.coords.longitude,
            lat: position.coords.latitude
          });
        },
        error => {
          switch (error.code) {
            case 1:
              this.message = 'Permission Denied';
              break;
            case 2:
              this.message = 'Position Unavailable';
              break;
            case 3:
              this.message = 'timeout';
              break;
          }
        }
      );
    } else {
      this.message = 'unsupported browser for location??';
    }
  }

  destroyInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // ----------------------------------------- route creation ---------------------------------------------------
  // create new route point
  addNewRoutePoint(): void {
    this.newRoutePoint = {
      lat: this.centerCoordinates.lat,
      lng: this.centerCoordinates.lng,
      radius: 50,
      fillColour: 'blue',
      circleDraggable: true,
      editable: true,
      index: this.routePoints.length + 1
    };
    this.isCreate = true;
  }

  saveRoutePoint(): void {
    this.routePoints.push(Object.assign({}, this.newRoutePoint));
    this.lockLastRoutePoint();
    this.newRoutePoint = null;
  }

  removeRoutePoint(): void {
    this.routePoints.pop();
  }

  updateLastCoordinates(coords: any): void {
    this.newRoutePoint.lat = coords.lat;
    this.newRoutePoint.lng = coords.lng;
    this.lockLastRoutePoint();
  }

  // to check if the coordinate is inside a circle
  private arePointsNear(checkPoint, centerPoint, km): boolean {
    const ky = 40000 / 360;
    const kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  // when creating
  private lockLastRoutePoint(): void {
    if (this.routePoints.length > 0) {
      this.routePoints[this.routePoints.length - 1].editable = false;
      this.routePoints[this.routePoints.length - 1].circleDraggable = false;
      this.routePoints[this.routePoints.length - 1].fillColour = 'black';
    }
  }

}
