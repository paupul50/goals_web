import { Component, OnInit } from '@angular/core';
import { GroupInvitationService } from '../../../../services/group/group-invitation/group-invitation.service';

@Component({
  selector: 'app-group-invitation',
  templateUrl: './group-invitation.component.html',
  styleUrls: ['./group-invitation.component.css']
})
export class GroupInvitationComponent implements OnInit {
  isInvitationsLoaded = false;
  invitationsObject: any;

  constructor(private _groupInvitationService: GroupInvitationService) {
    this._groupInvitationService.getUserGroupInvitations().subscribe((invitations: any) => {
      this.invitationsObject = invitations;
      this.isInvitationsLoaded = true;
      console.log(this.invitationsObject);
    });
  }

  ngOnInit() {
  }

  acceptInvitation(leaderUsername: string) {
    this._groupInvitationService.acceptInvitation(leaderUsername).subscribe((response: any) => {
      location.reload();
    });
  }

  cancelInvitation(invitation: any) {
    console.log('cancel invitation', invitation);
    this._groupInvitationService.cancelInvitation(invitation.id).subscribe((response: any) => {
      const newList = [];
      this.invitationsObject.forEach(currentInvitation => {
        if (currentInvitation.id !== invitation.id) {
          newList.push(currentInvitation);
        }
      });
      this.invitationsObject = newList;
    });
  }

}
