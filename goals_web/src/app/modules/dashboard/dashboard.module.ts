import { MaterialModule } from './../../shared/angular-material/angular-material.module';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ChartsModule } from 'ng2-charts';
import { ProfileOutletComponent } from './components/profile-outlet/profile-outlet.component';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from 'src/app/shared/components/comments/create-comment/create-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    StatisticsComponent,
    EditProfileComponent,
    CommentsComponent,
    CreateCommentComponent,
    StatisticComponent,
    ProfileOutletComponent
  ],
  imports: [
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ChartsModule,
    CommonModule
  ],
  providers: []
})
export class DashboardModule { }
