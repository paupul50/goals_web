import { GroupGoalsComponent } from './components/group-goals/group-goals.component';
import { NgModule } from '@angular/core';
import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './components/goals/goals.component';
import { CreateGoalComponent } from './components/create-goal/create-goal.component';
import { MaterialModule } from '../../shared/angular-material/angular-material.module';
import { TodayGoalsComponent } from './components/today-goals/today-goals.component';
@NgModule({
  imports: [
    GoalsRoutingModule,
    MaterialModule,
  ],
  declarations: [
    GoalsComponent,
    CreateGoalComponent,
    GroupGoalsComponent,
    TodayGoalsComponent
  ]
})
export class GoalsModule { }
