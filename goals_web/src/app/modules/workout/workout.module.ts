import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './components/workout/workout.component';
import { DashboardRoutingModule } from './workout-routing.module';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrdlUYQrwcssbaEQEWgt2-TvyGhRNHh7E'
    })
  ],
  declarations: [WorkoutComponent]
})
export class WorkoutModule { }
