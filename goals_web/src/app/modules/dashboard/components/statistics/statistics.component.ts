import { Component } from '@angular/core';
import { StatisticsHttpService } from '../../../../shared/services/statistics/statistics-http.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  userGoals: any;
  groupGoals: any;
  isLoaded = false;

  constructor(private _statisticsHttpService: StatisticsHttpService) {
    this.initializeStatistic();
  }

  private initializeStatistic(): void {
    this._statisticsHttpService.getCurrentUserDescription().subscribe((statistics: any) => {
      this.userGoals = statistics.userGoals;
      this.groupGoals = statistics.groupGoals;
      this.isLoaded = true;
    });
  }
}
