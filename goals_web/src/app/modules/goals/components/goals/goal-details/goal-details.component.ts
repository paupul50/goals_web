import { GoalsService } from '../../../services/goals/goals.service';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../../../models/goal.model';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {
  id: string;
  userGoal: any;
  isGoalLoaded = false;
  constructor(private _activatedRoute: ActivatedRoute, private _goalsService: GoalsService, private _router: Router) {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._goalsService.getUserGoal(this.id).subscribe((userGoal: Goal) => {
        this.userGoal = userGoal;
        console.log(userGoal);
        this.isGoalLoaded = true;
      });
    });
  }

  ngOnInit() {
  }

  removeGoal(): void {
    this._goalsService.deleteUserGoal(this.id).subscribe( () => {
      this._router.navigate(['/goals']);
    });
  }

}
