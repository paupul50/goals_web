import { HomeComponent } from './shared/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedOutGuard } from './Services/logged-out.guard';
import { CreateComponent } from './shared/user/create/create.component';
import { LoginComponent } from './shared/user/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: CreateComponent, canActivate: [LoggedOutGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'workout', loadChildren: './modules/workout/workout.module#WorkoutModule'},
  { path: 'goals', loadChildren: './modules/goals/goals.module#GoalsModule'},
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule'}
];


// AIzaSyDrdlUYQrwcssbaEQEWgt2-TvyGhRNHh7E - google map
// 4/DAFG4thDDgfHgs2iIl8PGHMIG1ZVwiq2J7PaYRtkSnuD4Y-AkzoL2feta-zwPUphfs14yj-IkYaJar3nvWfpO9w - fitness oauth
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
