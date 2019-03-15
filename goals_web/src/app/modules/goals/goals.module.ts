import { NgModule } from '@angular/core';
import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './components/goals/goals.component';

@NgModule({
  imports: [
    GoalsRoutingModule
  ],
  declarations: [
    GoalsComponent
  ]
})
export class GoalsModule { }
