import { WorkoutService } from '../../services/workout-create/workout.service';
import { Component } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-workout-map',
  templateUrl: './workout-map.component.html',
  styleUrls: ['./workout-map.component.css']
})
export class WorkoutMapComponent {
  constructor(public workoutService: WorkoutService) { }

  onRadiusChange(radius: number): void {
    this.workoutService.newRoutePoint.radius = radius;
  }

  updatePointCoordinates(newCoordinates: any): void {
    this.workoutService.updateLastCoordinates(newCoordinates);
  }

  setCenterCoordinates(coordiantes: LatLngLiteral): void {
    this.workoutService.centerCoordinates = coordiantes;
  }

  imitateLocation(event: any): void {
    if (this.workoutService.isWorkoutSession && this.workoutService.currentSessionPoint > 0) {
      this.workoutService.changeUserLocation(event.coords);
    }
  }

}
