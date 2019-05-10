import { GroupMembersHttpService } from '../../services/group/group-members/group-members-http.service';
import { GroupHttpService } from '../../services/group/group-http.service';
import { Component } from '@angular/core';
import { GroupGoalProgressHttpService } from '../../services/group/group-goal-progress/group-goal-progress-http.service';

@Component({
  selector: 'app-group-goals',
  templateUrl: './group-goals.component.html',
  styleUrls: ['./group-goals.component.css']
})
export class GroupGoalsComponent {
  isGroupLoaded = false;
  groupObject: any;
  groupProgressObject: any[];
  displayedColumns: string[] = ['goalDetails', 'goal', 'userGoalProgresses'];

  constructor(private _groupHttpService: GroupHttpService,
    private _groupMembersHttpService: GroupMembersHttpService,
    private _groupGoalProgressHttpService: GroupGoalProgressHttpService
  ) {
    this.setGroupData();
  }

  private setGroupData(): void {
    this._groupHttpService.getUserGroup().subscribe((groupObject: any) => {
      this.groupObject = groupObject;
      this.isGroupLoaded = true;
      if (this.groupObject.group) {
        this.setGroupProgress();
      }
    });
  }

  private setGroupProgress(): void {
    const currentDate = new Date();
    this._groupGoalProgressHttpService.getSpecificGroupGoalsDayProgress(currentDate)
      .subscribe((progress: any) => {
        this.groupProgressObject = progress;
      });
  }

  deleteGroup(): void {
    this._groupHttpService.deleteGroup().subscribe(() => {
      location.reload();
    });
  }

  leaveGroup(): void {
    this._groupMembersHttpService.leaveGroup().subscribe(() => {
      location.reload();
    });
  }

}
