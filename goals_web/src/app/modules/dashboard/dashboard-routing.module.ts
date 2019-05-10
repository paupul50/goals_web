import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';
import { ProfileOutletComponent } from './components/profile-outlet/profile-outlet.component';


const childRoutes: Routes = [
  { path: '', redirectTo: 'current', pathMatch: 'full', canActivate: [LoggedInGuard] },
  { path: 'current', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'others/:id', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'edit', component: EditProfileComponent, canActivate: [LoggedInGuard] },
];

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full', canActivate: [LoggedInGuard] },
  { path: 'profile', component: ProfileOutletComponent, children: childRoutes, canActivate: [LoggedInGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [LoggedInGuard] }
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
