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
    private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this._userProfileService.getCurrentUserDescription().subscribe((userData: any) => {
          this.userData = userData;
        });
      } else {
        this._userProfileService.getUserDescription(this.id).subscribe((userData: any) => {
          this.userData = userData;
        });
      }
    });
  }

  pushCommentToComments(comment: any) {
    this.userData.comments.push(comment);
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
