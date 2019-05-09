import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../../shared/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  userGoals: any;
  groupGoals: any;
  isLoaded = false;
  constructor(private _statisticsService: StatisticsService) {
    this._statisticsService.getCurrentUserDescription().subscribe((statistics: any) => {
      this.userGoals = statistics.userGoals;
      this.groupGoals = statistics.groupGoals;
      console.log(statistics);
      this.isLoaded = true;
    });
  }

  ngOnInit() {
  }

}
