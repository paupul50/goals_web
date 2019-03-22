import { GoalProgressService } from './../../services/goal-progress/goal-progress.service';
import { GoalsService } from './../../services/goals/goals.service';
import { Component, OnInit } from '@angular/core';
import { GoalWithProgressModel } from '../../models/goal-with-progress.model';
import { GoalProgress } from '../../models/goal-progress.model';

@Component({
  selector: 'app-today-goals',
  templateUrl: './today-goals.component.html',
  styleUrls: ['./today-goals.component.css']
})
export class TodayGoalsComponent implements OnInit {
  group = false;
  displayedColumns: string[] = ['goal', 'goalProgressCollection'];
  dataSource: GoalWithProgressModel[] = [];
  constructor(private _goalsService: GoalsService, private _goalProgressService: GoalProgressService) {
    this._goalsService.getUserTodayGoalWithProgress().subscribe((goalWithProgress: GoalWithProgressModel[]) => {
      this.dataSource = goalWithProgress;
    });
  }

  ngOnInit() {
  }

  changeState(goalProgress: GoalProgress): void {
    this._goalProgressService.updateProgressState(goalProgress).subscribe((isDone: boolean) => {
      goalProgress.isDone = isDone;
    });
  }

}
