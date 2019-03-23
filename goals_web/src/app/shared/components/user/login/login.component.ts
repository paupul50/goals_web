import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.addControls();
  }

  addControls() {
    this.form = this.fb.group({
      'email': ['kazkas@gmail.com', Validators.compose([Validators.required, Validators.email])],
      'password': ['kazkas', Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.userService.login(this.form.value.email, this.form.value.password).subscribe((result: any) => {
        if (result === true) {
          this.router.navigate(['/home']);
        }
      });
    }
  }


}
