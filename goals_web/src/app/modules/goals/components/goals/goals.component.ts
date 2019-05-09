import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../../services/goals/goals.service';
import { GoalWithProgressModel } from '../../models/goal-with-progress.model';
import { Goal } from '../../models/goal.model';
import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';

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

  constructor(private _goalService: GoalsService, private _snackbarService: SnackbarService) {
    const currentDate = new Date();
    this._goalService.GetUserGoalsWithProgress(currentDate, 10).subscribe((goals: GoalWithProgressModel[]) => {
      console.log(goals);
      if (goals.length > 0) {
        this.mapGoalsToTableDataSource(goals);
        this.isLoaded = true;
      } else {
        this._snackbarService.openSnackBar('Nėra siekių.');
      }
    });
  }

  isNumberGoal(goalType: number): boolean {
    if (goalType === 2 || goalType === 3 || goalType === 102) {
      return true;
    } else {
      return false;
    }
  }
  isRandomGoal(goalType: number): boolean {
    if (goalType === 201) {
      return true;
    } else {
      return false;
    }
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
