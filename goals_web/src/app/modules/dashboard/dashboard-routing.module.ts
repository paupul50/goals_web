import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { StatisticComponent } from './components/statistic/statistic.component';


const routes: Routes = [
  { path: '', redirectTo: 'profile'},
  { path: 'profile', component: ProfileComponent },
  { path: 'statistics', component: StatisticsComponent},
  { path: 'profile/edit', component: EditProfileComponent},
  { path: 'statistics/id', component: StatisticComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
