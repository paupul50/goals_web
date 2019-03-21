import { Component, OnInit } from '@angular/core';
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
  formSubmited: boolean;
  changeReceived: boolean;
  submitLoading: boolean;
  noError: boolean;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.addControls();
  }

  addControls() {
    this.form = this.fb.group({
      'firstname': ['', Validators.required],
      'surname': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required]
    });
  }
  onSubmit() {
    // jeigu error nera
    this.formSubmited = true;
    if (this.form.valid) {
      this.submitLoading = true;
      this.userService.createUser(this.form.value.email,
         this.form.value.password, this.form.value.firstname, this.form.value.surname).subscribe((response: any) => {
          this.router.navigate(['/login']);
        // this.noError = true;
        // this.changeReceived = true;
        // this.submitLoading = false;
        // setTimeout(() => {
        //   this.formSubmited = false;
        //   this.changeReceived = false;
        // }, 3000);
      }, (err) => {
        this.noError = false;
        this.changeReceived = true;
        this.form.reset();
        this.submitLoading = false;
        setTimeout(() => {
          this.formSubmited = false;
          this.changeReceived = false;
        }, 3000);
      });
    }
  }

}
