import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';
import { GroupGoalsComponent } from './components/group-goals/group-goals.component';
import { NgModule } from '@angular/core';
import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './components/goals/goals.component';
import { CreateGoalComponent } from './components/create-goal/create-goal.component';
import { MaterialModule } from '../../shared/angular-material/angular-material.module';
import { TodayGoalsComponent } from './components/today-goals/today-goals.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupUsersComponent } from './components/group-users/group-users.component';
@NgModule({
  imports: [
    GoalsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    GoalsComponent,
    CreateGoalComponent,
    GroupGoalsComponent,
    TodayGoalsComponent,
    GoalDetailsComponent,
    GroupUsersComponent,
    LeaderboardComponent
  ]
})
export class GoalsModule { }
