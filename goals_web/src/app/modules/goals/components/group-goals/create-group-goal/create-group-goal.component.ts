import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupGoalService } from '../../../services/group/group-goal/group-goal.service';

@Component({
  selector: 'app-create-group-goal',
  templateUrl: './create-group-goal.component.html',
  styleUrls: ['./create-group-goal.component.css']
})
export class CreateGroupGoalComponent implements OnInit {
  goalNameForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _groupGoalService: GroupGoalService, private _router: Router) { }

  ngOnInit() {
    this.goalNameForm = this._formBuilder.group({
      goalNameControl: ['', Validators.required]
    });
  }

  submit(): void {
    this._groupGoalService.createGroupGoal(this.goalNameForm.value.goalNameControl)
      .subscribe(anything => this._router.navigate(['/goals/group']));
  }

}
