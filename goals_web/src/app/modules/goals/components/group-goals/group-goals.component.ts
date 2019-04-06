import { GroupMembersService } from './../../services/group/group-members/group-members.service';
import { GroupService } from '../../services/group/group.service';
import { Component, OnInit } from '@angular/core';
import { GroupGoalProgressService } from '../../services/group/group-goal-progress/group-goal-progress.service';

@Component({
  selector: 'app-group-goals',
  templateUrl: './group-goals.component.html',
  styleUrls: ['./group-goals.component.css']
})
export class GroupGoalsComponent implements OnInit {
  isGroupLoaded = false;
  groupObject: any;
  groupProgressObject: any[];

  displayedColumns: string[] = ['goalDetails', 'goal', 'userGoalProgresses'];
  constructor(private _groupService: GroupService,
    private _groupMembersService: GroupMembersService,
    private _groupGoalProgressService: GroupGoalProgressService) {
    this.setGroupData();
  }

  private setGroupData(): void {
    this._groupService.getUserGroup().subscribe((groupObject: any) => {
      this.groupObject = groupObject;
      this.isGroupLoaded = true;
      if (this.groupObject.group) {
        this.setGroupProgress();
      }
    });
  }

  private setGroupProgress(): void {
    const currentDate = new Date();
    this._groupGoalProgressService.getSpecificGroupGoalsDayProgress(currentDate).subscribe((progress: any) => {
      this.groupProgressObject = progress;
      console.log('progress', this.groupProgressObject);
    });
  }

  ngOnInit() {
  }

  deleteGroup() {
    this._groupService.deleteGroup().subscribe((response: any) => {
      location.reload();
    });
  }

  leaveGroup() {
    this._groupMembersService.leaveGroup().subscribe((response: any) => {
      location.reload();
    });
  }

}
