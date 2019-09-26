import { UserService } from './../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserProfileHttpService } from '../../Services/user-profile/user-profile-http.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id: string;
  userData: any;
  commentTarget = 'profile';

  constructor(private _userProfileHttpService: UserProfileHttpService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService) {
    this.initializeProfile();
  }

  private initializeProfile(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this._userProfileHttpService.getCurrentUserDescription().subscribe((userData: any) => {
          this.userData = userData;
        });
      } else {
        this._userProfileHttpService.getUserDescription(this.id).subscribe((userData: any) => {
          this.userData = userData;
        });
      }
    });
  }

  pushCommentToComments(comment: any): void {
    this.userData.userComments.push(comment);
  }

  getImageUrl(): any {
    if (this.userData.user.image) {
      return this._userService.BACKURL + this.userData.user.image;
    } else {
      return this._userService.BACKURL + 'Resources/public_content/profile/no_image.jpg';
    }
  }

  doesUserHaveImage(): boolean {
    return this.userData.image !== '';
  }
}
