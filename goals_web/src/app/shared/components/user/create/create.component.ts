import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form: FormGroup;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _snackbarService: SnackbarService
  ) {
    this.addControls();
  }

  addControls() {
    this.form = this.fb.group({
      'firstname': ['kazkas', Validators.required],
      'surname': ['kazkas', Validators.required],
      'email': ['kazkas@gmail.com', Validators.compose([Validators.required, Validators.email])],
      'password': ['kazkas', Validators.required]
    });
  }
  onSubmit() {
    // jeigu error nera
    if (this.form.valid) {
      this.userService.createUser(this.form.value.email,
        this.form.value.password, this.form.value.firstname, this.form.value.surname).subscribe((response: any) => {
          this.router.navigate(['/login']);
        });
    }
  }

}
