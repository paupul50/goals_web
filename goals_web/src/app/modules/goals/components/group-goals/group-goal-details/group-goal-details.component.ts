import { UserService } from 'src/app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GroupGoalHttpService } from '../../../services/group/group-goal/group-goal-http.service';

@Component({
  selector: 'app-group-goal-details',
  templateUrl: './group-goal-details.component.html',
  styleUrls: ['./group-goal-details.component.css']
})
export class GroupGoalDetailsComponent {
  isGoalLoaded = false;
  id: string;
  groupGoal: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private _groupGoalHttpService: GroupGoalHttpService,
    private _router: Router,
    private _userService: UserService) {
    this.initializeGroupGoal();
  }

  private initializeGroupGoal(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._groupGoalHttpService.getGroupGoal(this.id).subscribe((groupGoal: any) => {
        this.groupGoal = groupGoal;
        this.isGoalLoaded = true;
      });
    });
  }

  removeGoal(): void {
    this._groupGoalHttpService.deleteGroupGaol(this.id).subscribe(() => {
      this._router.navigate(['/goals/group']);
    });
  }

  isCurrentUserGroupLeader(): boolean {
    if (this._userService.getCurrentUsername() === this.groupGoal.goalMedium.group.leaderUsername) {
      return true;
    } else {
      return false;
    }
  }

}
