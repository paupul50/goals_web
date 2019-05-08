import { UserService } from 'src/app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GroupGoalService } from '../../../services/group/group-goal/group-goal.service';

@Component({
  selector: 'app-group-goal-details',
  templateUrl: './group-goal-details.component.html',
  styleUrls: ['./group-goal-details.component.css']
})
export class GroupGoalDetailsComponent implements OnInit {
  isGoalLoaded = false;
  id: string;
  groupGoal: any;
  constructor(private _activatedRoute: ActivatedRoute,
    private _groupGoalService: GroupGoalService,
    private _router: Router,
    private _userService: UserService) {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._groupGoalService.getGroupGoal(this.id).subscribe((groupGoal: any) => {
        console.log('group goal', groupGoal);
        this.groupGoal = groupGoal;
        this.isGoalLoaded = true;
      });
    });
  }

  ngOnInit() {
  }

  removeGoal(): void {
    this._groupGoalService.deleteGroupGaol(this.id).subscribe(() => {
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
