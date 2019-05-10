import { GoalsHttpService } from '../../../services/goals/goals-http.service';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../../../models/goal.model';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent {
  id: string;
  userGoal: any;
  isGoalLoaded = false;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _goalsHttpService: GoalsHttpService,
    private _router: Router
  ) {
    this.initializeGoalDetails();
  }

  private initializeGoalDetails(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._goalsHttpService.getUserGoal(this.id).subscribe((userGoal: Goal) => {
        this.userGoal = userGoal;
        this.isGoalLoaded = true;
      });
    });
  }

  removeGoal(): void {
    this._goalsHttpService.deleteUserGoal(this.id).subscribe(() => {
      this._router.navigate(['/goals']);
    });
  }

}
