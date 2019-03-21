import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { GroupGoalsComponent } from './components/group-goals/group-goals.component';
import { CreateGoalComponent } from './components/create-goal/create-goal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoalsComponent } from './components/goals/goals.component';
import { TodayGoalsComponent } from './components/today-goals/today-goals.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';
import { LoggedInGuard } from 'src/app/Services/logged-in.guard';
import { GroupUsersComponent } from './components/group-users/group-users.component';


const routes: Routes = [
  { path: '', component: GoalsComponent, canActivate: [LoggedInGuard]},
  { path: 'create', component: CreateGoalComponent, canActivate: [LoggedInGuard]},
  { path: 'group', component: GroupGoalsComponent, canActivate: [LoggedInGuard]},
  { path: 'groupusers', component: GroupUsersComponent, canActivate: [LoggedInGuard]},
  { path: 'groupleaderboard', component: LeaderboardComponent, canActivate: [LoggedInGuard]},
  { path: 'today', component: TodayGoalsComponent, canActivate: [LoggedInGuard]},
  { path: 'id', component: GoalDetailsComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
