import { Component, OnInit } from '@angular/core';
import { GoalsHttpService } from '../../services/goals/goals-http.service';
import { GoalWithProgressModel } from '../../models/goal-with-progress.model';
import { Goal } from '../../models/goal.model';
import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {
  displayedColumns: string[] = [];
  goals: GoalWithProgressModel[];
  dataSource: any[] = [];
  isLoaded = false;
  limit = 10;

  constructor(private _goalHttpService: GoalsHttpService, private _snackbarService: SnackbarService) {
    this.initializeGoalProgresses();
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

  private initializeGoalProgresses(): void {
    const currentDate = new Date();
    this._goalHttpService.GetUserGoalsWithProgress(currentDate, 10).subscribe((goals: GoalWithProgressModel[]) => {
      if (goals.length > 0) {
        this.mapGoalsToTableDataSource(goals);
        this.isLoaded = true;
      } else {
        this._snackbarService.openSnackBar('Nėra siekių.');
      }
    });
  }

  // dynamic table
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

}
