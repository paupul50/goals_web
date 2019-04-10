import { Injectable } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutCreateService {
  routePoints: any[] = [];
  newRoutePoint = null;
  // [latitude]="54.904053" [longitude]="23.949231" ąžuolynas
  centerCoordinates: LatLngLiteral = {
    lat: 54.904053,
    lng: 23.949231
  };

  infoWindow: any;
  constructor() { }

  addNewRoutePoint() {
    this.newRoutePoint = {
      lat: this.centerCoordinates.lat,
      lng: this.centerCoordinates.lng,
      radius: 50,
      fillColour: 'blue',
      circleDraggable: true,
      editable: true,
      index: this.routePoints.length + 1
    };
  }

  saveRoutePoint() {
    this.routePoints.push(Object.assign({}, this.newRoutePoint));
    this.lockLastRoutePoint();
    this.newRoutePoint = null;
  }

  removeRoutePoint() {
    this.routePoints.pop();
    this.routePoints[this.routePoints.length - 1].editable = true;
    this.routePoints[this.routePoints.length - 1].circleDraggable = true;
    this.routePoints[this.routePoints.length - 1].fillColour = 'blue';
  }

  updateLastCoordinates(coords: any) {
    this.newRoutePoint.lat = coords.lat;
    this.newRoutePoint.lng = coords.lng;
    this.lockLastRoutePoint();
  }

  clearRoutePoints() {
    this.routePoints = [];
    this.clearInfoWindow();
  }

  clearInfoWindow() {
    this.infoWindow = null;
  }

  private lockLastRoutePoint() {
    if (this.routePoints.length > 0) {
      this.routePoints[this.routePoints.length - 1].editable = false;
      this.routePoints[this.routePoints.length - 1].circleDraggable = false;
      this.routePoints[this.routePoints.length - 1].fillColour = 'black';
    }
  }

}
