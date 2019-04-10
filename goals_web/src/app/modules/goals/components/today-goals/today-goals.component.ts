import { GroupGoalProgressService } from './../../services/group/group-goal-progress/group-goal-progress.service';
import { GoalProgressService } from '../../services/goals/goal-progress/goal-progress.service';
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
  isGroupGoalsLoaded = false;
  isGoalsLoaded = false;
  displayedColumns: string[] = ['goal', 'goalProgress'];
  goalsObject: GoalWithProgressModel[] = [];
  groupGoalsObject: any;
  constructor(private _goalsService: GoalsService,
    private _goalProgressService: GoalProgressService,
    private _groupGoalProgressService: GroupGoalProgressService) {
    this.setGoalsProgressData();
  }

  private setGoalsProgressData(): void {
    this.setGroupGoalsProgress();
    this.setGoalsProgress();
  }

  private setGoalsProgress(): void {
    this._goalsService.getUserTodayGoalWithProgress().subscribe((goalWithProgress: any[]) => {
      this.goalsObject = goalWithProgress;
      console.log('mygoal progress', this.goalsObject);
      this.isGoalsLoaded = true;
    });
  }

  private setGroupGoalsProgress(): void {
    this._groupGoalProgressService.getTodayUserGroupGoalsProgress().subscribe((goalWithProgress: any) => {
      this.groupGoalsObject = goalWithProgress;
      console.log('groupgoal progress', this.groupGoalsObject);
      this.isGroupGoalsLoaded = true;
    });
  }

  ngOnInit() {
  }

  changeGoalProgressState(goalProgress: any): void {
    this._goalProgressService.updateProgressState(goalProgress).subscribe((isDone: boolean) => {
      goalProgress.isDone = isDone;
    });
  }

  changeGroupProgressState(GroupGoalProgress: any): void {
    this._groupGoalProgressService.updateGroupGoalProgressState(GroupGoalProgress)
      .subscribe((progress: any) => {
        GroupGoalProgress.isDone = progress.isDone;
      });
  }

}
