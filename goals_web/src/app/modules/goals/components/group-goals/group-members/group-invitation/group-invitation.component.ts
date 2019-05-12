import { Component, OnInit } from '@angular/core';
import { GroupInvitationHttpService } from '../../../../services/group/group-invitation/group-invitation-http.service';

@Component({
  selector: 'app-group-invitation',
  templateUrl: './group-invitation.component.html',
  styleUrls: ['./group-invitation.component.css']
})
export class GroupInvitationComponent {
  isInvitationsLoaded = false;
  invitationsObject: any;

  constructor(private _groupInvitationHttpService: GroupInvitationHttpService) {
    this.initGroupInvitations();
  }

  private initGroupInvitations(): void {
    this._groupInvitationHttpService.getUserGroupInvitations().subscribe((invitations: any) => {
      this.invitationsObject = invitations;
      this.isInvitationsLoaded = true;
    });
  }

  acceptInvitation(leaderUsername: string): void {
    this._groupInvitationHttpService.acceptInvitation(leaderUsername).subscribe((response: any) => {
      location.reload();
    });
  }

  cancelInvitation(invitation: any): void {
    this._groupInvitationHttpService.cancelInvitation(invitation.id).subscribe((response: any) => {
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
