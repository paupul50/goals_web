import { MaterialModule } from './../../shared/angular-material/angular-material.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CommentsComponent } from 'src/app/shared/comments/comments.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ProfileComponent,
    StatisticsComponent,
    EditProfileComponent,
    CommentsComponent,
    StatisticComponent
  ],
  imports: [
    DashboardRoutingModule,
    MaterialModule,
    ChartsModule
  ],
  providers: []
})
export class DashboardModule { }
