import { GroupGoalsComponent } from './components/group-goals/group-goals.component';
import { CreateGoalComponent } from './components/create-goal/create-goal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoalsComponent } from './components/goals/goals.component';
import { TodayGoalsComponent } from './components/today-goals/today-goals.component';


const routes: Routes = [
  { path: '', component: GoalsComponent },
  { path: 'create', component: CreateGoalComponent},
  { path: 'group', component: GroupGoalsComponent},
  { path: 'today', component: TodayGoalsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
