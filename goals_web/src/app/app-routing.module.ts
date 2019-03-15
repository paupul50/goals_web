import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './user/create/create.component';
import { LoggedOutGuard } from './Services/logged-out.guard';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './modules/dashboard/dashboard.module#DashboardModule'},
  { path: 'workout', loadChildren: './modules/workout/workout.module#WorkoutModule'},
  { path: 'goals', loadChildren: './modules/goals/goals.module#GoalsModule'},
  { path: 'register', component: CreateComponent, canActivate: [LoggedOutGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] }
];


// AIzaSyDrdlUYQrwcssbaEQEWgt2-TvyGhRNHh7E - google map
// 4/DAFG4thDDgfHgs2iIl8PGHMIG1ZVwiq2J7PaYRtkSnuD4Y-AkzoL2feta-zwPUphfs14yj-IkYaJar3nvWfpO9w - fitness oauth
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
