import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../Services/user-profile/user-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userData: any;

  constructor(private _userProfileService: UserProfileService) {
    this._userProfileService.getCurrentUserDescription().subscribe((userData: any) => {
      this.userData = userData;
      console.log(userData);
    });
  }

  ngOnInit() {
  }

}
