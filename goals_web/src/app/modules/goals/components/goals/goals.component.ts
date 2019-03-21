import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../../services/goals.service';
import { GoalWithProgressModel } from '../../models/goal-with-progress.model';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  goals: GoalWithProgressModel[];
  isLoaded = false;
  limit = 10;
  constructor(private _goalService: GoalsService) {
    const currentDate = new Date();
    this._goalService.GetUserGoalsWithProgress(currentDate, 10).subscribe((goals: GoalWithProgressModel[]) => {
      this.goals = goals;
      console.log(this.goals);
      this.isLoaded = true;
    });
  }

  ngOnInit() {
  }

}
