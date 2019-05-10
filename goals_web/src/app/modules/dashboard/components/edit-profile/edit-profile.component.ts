import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserProfileHttpService } from '../../Services/user-profile/user-profile-http.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  userData: any;
  selectedFile: File;
  imgURL: any;
  userForm: FormGroup;
  isLoaded = false;

  constructor(
    private _userProfileHttpService: UserProfileHttpService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _snackbarService: SnackbarService
  ) {
    this.initializeUserDescription();
  }

  private initializeUserDescription(): void {
    this._userProfileHttpService.getCurrentUserDescription().subscribe((userData: any) => {
      this.userData = userData;
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
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this._userProfileHttpService.editCurrentUserDescription({
        Firstname: this.userForm.value.firstname,
        Lastname: this.userForm.value.lastname,
        Description: this.userForm.value.description,

      }, this.selectedFile).subscribe(() => {
        this._router.navigate(['/dashboard/profile']);
      });
    } else {
      this._snackbarService.openSnackBar('Neteisingi duomenys.');
    }
  }

}
