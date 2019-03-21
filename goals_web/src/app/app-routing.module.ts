import { HomeComponent } from './shared/components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedOutGuard } from './shared/guards/logged-out.guard';
import { CreateComponent } from './shared/components/user/create/create.component';
import { LoginComponent } from './shared/components/user/login/login.component';
import { LoggedInGuard } from './shared/guards/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: CreateComponent, canActivate: [LoggedOutGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'workout', loadChildren: './modules/workout/workout.module#WorkoutModule', canActivate: [LoggedInGuard]},
  { path: 'goals', loadChildren: './modules/goals/goals.module#GoalsModule', canActivate: [LoggedInGuard]},
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule', canActivate: [LoggedInGuard]}
];


// AIzaSyDrdlUYQrwcssbaEQEWgt2-TvyGhRNHh7E - google map
// 4/DAFG4thDDgfHgs2iIl8PGHMIG1ZVwiq2J7PaYRtkSnuD4Y-AkzoL2feta-zwPUphfs14yj-IkYaJar3nvWfpO9w - fitness oauth
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
