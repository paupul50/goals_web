import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { LoggedInGuard } from 'src/app/Services/logged-in.guard';


const routes: Routes = [
  { path: '', redirectTo: 'profile', canActivate: [LoggedInGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [LoggedInGuard]},
  { path: 'profile/edit', component: EditProfileComponent, canActivate: [LoggedInGuard]},
  { path: 'statistics/id', component: StatisticComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
