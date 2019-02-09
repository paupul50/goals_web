import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    DashboardRoutingModule
  ],
  providers: []
})
export class DashboardModule { }
