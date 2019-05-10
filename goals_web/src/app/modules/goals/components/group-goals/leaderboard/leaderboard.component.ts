
import { Component } from '@angular/core';
import { StatisticsHttpService } from 'src/app/shared/services/statistics/statistics-http.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  leaderboard: any;

  constructor(private _statisticsHttpService: StatisticsHttpService) {
    this.initializeLeaderBoard();
  }

  private initializeLeaderBoard(): void {
    this._statisticsHttpService.getGroupLeaderBoard().subscribe((leaderboard: any) => {
      this.leaderboard = leaderboard;
    });
  }
}
