import { GoalsService } from '../../../services/goals/goals.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {
  goalNameForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _goalsService: GoalsService, private _router: Router) { }

  ngOnInit() {
    this.goalNameForm = this._formBuilder.group({
      goalNameControl: ['', Validators.required]
    });
  }

  submit(): void {
    this._goalsService.createUserGoal(this.goalNameForm.value.goalNameControl)
      .subscribe(anything => this._router.navigate(['/goals']));
  }
}
