import { GroupInvitationService } from './../../../../services/group/group-invitation/group-invitation.service';
import { GroupMembersService } from './../../../../services/group/group-members/group-members.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  membersObject: any[];
  isMembersLoaded = false;

  newMemberForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private _groupMembersService: GroupMembersService,
    private _groupInvitationService: GroupInvitationService) {
    this._groupMembersService.getGroupMembers().subscribe((members: any) => {
      this.membersObject = members;
      this.isMembersLoaded = true;
      console.log('members:', this.membersObject);
    });
  }

  ngOnInit() {
    this.newMemberForm = this._formBuilder.group({
      memberUsernameControl: ['', Validators.email]
    });
  }

  removeGroupMember(member: any) {
    this._groupMembersService.removeGroupMember(member.username).subscribe((response) => {
      const newList = [];
      this.membersObject.forEach(currentMember => {
        if (currentMember.username !== member.username) {
          newList.push(currentMember);
        }
      });
      this.membersObject = newList;
    });
  }

  submit() {
    this._groupInvitationService.sentGroupInvitation(this.newMemberForm.value.memberUsernameControl)
      .subscribe(anything => console.log('išsiųsta'));
  }



}
