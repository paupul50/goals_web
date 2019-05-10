import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.addControls();
  }

  addControls(): void {
    this.form = this.fb.group({
      'firstname': ['kazkas', Validators.required],
      'surname': ['kazkas', Validators.required],
      'email': ['kazkas@gmail.com', Validators.compose([Validators.required, Validators.email])],
      'username': ['kazkas', Validators.required],
      'password': ['kazkas', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.userService.createUser({
        Email: this.form.value.email,
        Username: this.form.value.username,
        Password: this.form.value.password,
        Firstname: this.form.value.firstname,
        Lastname: this.form.value.surname
      }).subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }

}
