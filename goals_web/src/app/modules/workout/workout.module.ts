import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutMapComponent } from './components/workout-map/workout-map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './components/workout/workout.component';
import { DashboardRoutingModule } from './workout-routing.module';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from '../../shared/angular-material/angular-material.module';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrdlUYQrwcssbaEQEWgt2-TvyGhRNHh7E'
    })
  ],
  declarations: [
    WorkoutComponent,
    WorkoutMapComponent,
    WorkoutsComponent
  ]
})
export class WorkoutModule { }
