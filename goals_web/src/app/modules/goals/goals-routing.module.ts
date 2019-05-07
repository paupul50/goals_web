import { GroupGoalDetailsComponent } from './components/group-goals/group-goal-details/group-goal-details.component';
import { CreateGroupGoalComponent } from './components/group-goals/create-group-goal/create-group-goal.component';
import { CreateGroupComponent } from './components/group-goals/create-group/create-group.component';
import { LeaderboardComponent } from './components/group-goals/leaderboard/leaderboard.component';
import { GroupGoalsComponent } from './components/group-goals/group-goals.component';
import { CreateGoalComponent } from './components/goals/create-goal/create-goal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoalsComponent } from './components/goals/goals.component';
import { TodayGoalsComponent } from './components/today-goals/today-goals.component';
import { GoalDetailsComponent } from './components/goals/goal-details/goal-details.component';
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';
import { GroupUsersComponent } from './components/group-goals/group-members/group-users/group-users.component';
import { GoogleRedirectComponent } from './components/google-redirect/google-redirect.component';


const routes: Routes = [
  { path: '', component: GoalsComponent, canActivate: [LoggedInGuard]},
  { path: 'creategoal', component: CreateGoalComponent, canActivate: [LoggedInGuard]},
  { path: 'creategroupgoal', component: CreateGroupGoalComponent, canActivate: [LoggedInGuard]},
  { path: 'creategroup', component: CreateGroupComponent, canActivate: [LoggedInGuard]},
  { path: 'group', component: GroupGoalsComponent, canActivate: [LoggedInGuard]},
  { path: 'groupusers', component: GroupUsersComponent, canActivate: [LoggedInGuard]},
  { path: 'groupleaderboard', component: LeaderboardComponent, canActivate: [LoggedInGuard]},
  { path: 'today', component: TodayGoalsComponent, canActivate: [LoggedInGuard]},
  { path: 'today/:redirect', component: GoogleRedirectComponent, canActivate: [LoggedInGuard]},
  { path: ':id', component: GoalDetailsComponent, canActivate: [LoggedInGuard]},
  { path: 'group/:id', component: GroupGoalDetailsComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
