import { WorkoutComponent } from './components/workout/workout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { CreateWorkoutComponent } from './components/create-workout/create-workout.component';
import { StartWorkoutComponent } from './components/start-workout/start-workout.component';
import { LoggedInGuard } from 'src/app/Services/logged-in.guard';

const childRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: WorkoutsComponent },
  { path: 'create', component: CreateWorkoutComponent },
  { path: 'session', component: StartWorkoutComponent}
];
const routes: Routes = [
  { path: '', component: WorkoutComponent, children: childRoutes, canActivate: [LoggedInGuard]}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
