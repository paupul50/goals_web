import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';
import { GroupInvitationHttpService } from '../../../../services/group/group-invitation/group-invitation-http.service';
import { GroupMembersHttpService } from '../../../../services/group/group-members/group-members-http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  membersObject: any[];
  newMemberForm: FormGroup;
  isMembersLoaded = false;

  constructor(private _formBuilder: FormBuilder,
    private _groupMembersHttpService: GroupMembersHttpService,
    private _groupInvitationHttpService: GroupInvitationHttpService,
    private _snackbarService: SnackbarService
  ) {
    this.initializeGroupMembers();
  }

  private initializeGroupMembers(): void {
    this._groupMembersHttpService.getGroupMembers().subscribe((members: any) => {
      this.membersObject = members;
      this.isMembersLoaded = true;
    });
  }

  ngOnInit() {
    this.newMemberForm = this._formBuilder.group({
      memberUsernameControl: ['', Validators.email]
    });
  }

  removeGroupMember(member: any): void {
    this._groupMembersHttpService.removeGroupMember(member.username).subscribe(() => {
      const newList = [];
      this.membersObject.forEach(currentMember => {
        if (currentMember.username !== member.username) {
          newList.push(currentMember);
        }
      });
      this.membersObject = newList;
    });
  }

  submit(): void {
    this._groupInvitationHttpService.sentGroupInvitation(this.newMemberForm.value.memberUsernameControl)
      .subscribe(() => this._snackbarService.openSnackBar('Išsiųsta'));
  }
}
