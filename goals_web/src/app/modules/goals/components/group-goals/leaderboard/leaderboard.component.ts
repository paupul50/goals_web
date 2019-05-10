
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: any;

  constructor(private _statisticsService: StatisticsService) {
    this._statisticsService.getGroupLeaderBoard().subscribe((leaderboard: any) => {
      this.leaderboard = leaderboard;
    });
  }

  ngOnInit() {
  }

}
