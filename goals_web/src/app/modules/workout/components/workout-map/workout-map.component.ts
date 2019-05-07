import { WorkoutCreateService } from '../../services/workout-create/workout-create.service';
import { Component, OnInit } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-workout-map',
  templateUrl: './workout-map.component.html',
  styleUrls: ['./workout-map.component.css']
})
export class WorkoutMapComponent implements OnInit {
  constructor(public workoutCreateService: WorkoutCreateService) {

  }

  onRadiusChange(radius: number) {
    this.workoutCreateService.newRoutePoint.radius = radius;
  }

  updatePointCoordinates(newCoordinates: any): void {
    this.workoutCreateService.updateLastCoordinates(newCoordinates);
  }

  setCenterCoordinates(coordiantes: LatLngLiteral) {
    this.workoutCreateService.centerCoordinates = coordiantes;
  }

  ngOnInit() {
  }

  imitateLocation(event: any) {
    if (this.workoutCreateService.isWorkoutSession && this.workoutCreateService.currentSessionPoint > 0) {
      this.workoutCreateService.changeUserLocation(event.coords);
    }
  }

}
