import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../../services/goals/goals.service';
import { GoalWithProgressModel } from '../../models/goal-with-progress.model';
import { Goal } from '../../models/goal.model';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  displayedColumns: string[] = [];
  goals: GoalWithProgressModel[];
  dataSource: any[] = [];
  isLoaded = false;
  limit = 10;

  constructor(private _goalService: GoalsService) {
    const currentDate = new Date();
    this._goalService.GetUserGoalsWithProgress(currentDate, 10).subscribe((goals: GoalWithProgressModel[]) => {
      this.mapGoalsToTableDataSource(goals);
      this.isLoaded = true;
    });
  }

  private mapGoalsToTableDataSource(goals: GoalWithProgressModel[]): void {
    this.goals = goals;
    this.displayedColumns.push('Data');
    goals.forEach(element => {
      this.displayedColumns.push(element.goal.name);
    });
    for (let i = 0; i < this.limit; i++) {
      let tableGoalObject;
      for (let k = 0; k < goals.length; k++) {
        let objectToMerge;
        if (k === 0) {
          objectToMerge = {
            Data: {
              createdAt: goals[k].goalProgressCollection[i].createdAt
            },
            [goals[k].goal.name]: goals[k].goalProgressCollection[i]
          };
        } else {
          objectToMerge = {
            [goals[k].goal.name]: goals[k].goalProgressCollection[i]
          };
        }

        tableGoalObject = { ...tableGoalObject, ...objectToMerge };
      }
      this.dataSource.push(tableGoalObject);
    }
    goals.push(new GoalWithProgressModel({
      goal: new Goal({
        name: 'Data'
      })
    }));
  }

  ngOnInit() {
  }

}
