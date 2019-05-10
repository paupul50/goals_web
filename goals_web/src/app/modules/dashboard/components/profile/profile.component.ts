import { UserService } from './../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../Services/user-profile/user-profile.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  userData: any;
  commentTarget = 'profile';
  constructor(private _userProfileService: UserProfileService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService) {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this._userProfileService.getCurrentUserDescription().subscribe((userData: any) => {
          this.userData = userData;
          console.log(this.userData);
        });
      } else {
        this._userProfileService.getUserDescription(this.id).subscribe((userData: any) => {
          this.userData = userData;
          console.log(this.userData);
        });
      }

    });
  }

  pushCommentToComments(comment: any) {
    this.userData.userComments.push(comment);
  }

  getImageUrl() {
    console.log(this._userService.BACKURL + this.userData.user.image);
    return this._userService.BACKURL + this.userData.user.image;
  }

  doesUserHaveImage(): boolean {
    return this.userData.image !== '';
  }

  ngOnInit() {
  }

}



// id: string;
// userGoal = new Goal({});
// constructor(private _activatedRoute: ActivatedRoute, private _goalsService: GoalsService, private _router: Router) {
//   this._activatedRoute.params.subscribe((params: Params) => {
//     this.id = params['id'];
//     this._goalsService.getUserGoal(this.id).subscribe((userGoal: Goal) => {
//       this.userGoal = userGoal;
//     });
//   });
// }
