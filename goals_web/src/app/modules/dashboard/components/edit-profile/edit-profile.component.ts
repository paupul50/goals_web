import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../Services/user-profile/user-profile.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userData: any;
  selectedFile: File;
  imgURL: any;
  userForm: FormGroup;
  isLoaded = false;

  constructor(
    private _userProfileService: UserProfileService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {
    this._userProfileService.getCurrentUserDescription().subscribe((userData: any) => {
      this.userData = userData;
      console.log(userData);
      this.setFormControls();
    });
  }

  setFormControls(): void {
    this.userForm = this._formBuilder.group({
      firstname: [this.userData.user.firstname, Validators.required],
      lastname: [this.userData.user.lastname, Validators.required],
      description: [this.userData.user.description, Validators.required]
    });
    if (this.userData.user.image) {
      this.imgURL = this._userService.BACKURL + this.userData.user.image;
    }

    this.isLoaded = true;
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(event);
    const reader = new FileReader();
    // reader.readAsDataURL(this.selectedFile);
    // reader.onload = (_event) => {
    //   this.imgURL = reader.result;
    // };
    console.log(this.selectedFile);
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.selectedFile);
      this._userProfileService.editCurrentUserDescription({
        Firstname: this.userForm.value.firstname,
        Lastname: this.userForm.value.lastname,
        Description: this.userForm.value.description,

      }, this.selectedFile).subscribe((result: any) => {
        this._router.navigate(['/profile']);
      });
    }
  }

  ngOnInit() {


  }

}
