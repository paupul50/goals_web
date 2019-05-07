import { CreateGroupGoalComponent } from './components/group-goals/create-group-goal/create-group-goal.component';
import { GroupInvitationComponent } from './components/group-goals/group-members/group-invitation/group-invitation.component';
import { CreateGroupComponent } from './components/group-goals/create-group/create-group.component';
import { LeaderboardComponent } from './components/group-goals/leaderboard/leaderboard.component';
import { GoalDetailsComponent } from './components/goals/goal-details/goal-details.component';
import { GroupGoalsComponent } from './components/group-goals/group-goals.component';
import { NgModule } from '@angular/core';
import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './components/goals/goals.component';
import { CreateGoalComponent } from './components/goals/create-goal/create-goal.component';
import { MaterialModule } from '../../shared/angular-material/angular-material.module';
import { TodayGoalsComponent } from './components/today-goals/today-goals.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupUsersComponent } from './components/group-goals/group-members/group-users/group-users.component';
import { GroupGoalDetailsComponent } from './components/group-goals/group-goal-details/group-goal-details.component';
import { GoogleRedirectComponent } from './components/google-redirect/google-redirect.component';
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
    LeaderboardComponent,
    CreateGroupComponent,
    GroupInvitationComponent,
    GroupGoalDetailsComponent,
    CreateGroupGoalComponent,
    GoogleRedirectComponent
  ]
})
export class GoalsModule { }
