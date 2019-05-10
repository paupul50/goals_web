import { GoalsHttpService } from '../../../services/goals/goals-http.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {
  @Input() isGroupGoal: boolean;
  @Input() workouts: any[];

  goalCategory = '0';
  goalType = '0';
  workoutId: any;
  goalNameForm: FormGroup;
  numberForm: FormGroup;
  typeNotValid = true;

  constructor(private _formBuilder: FormBuilder, private _goalsHttpService: GoalsHttpService,
    private _router: Router) {
  }

  ngOnInit() {
    this.goalNameForm = this._formBuilder.group({
      goalNameControl: ['', Validators.required]
    });

    this.numberForm = this._formBuilder.group({
      numberControl: ['', [Validators.required]]
    });
  }
  setRandomGoalType(): void {
    this.goalType = '201';
  }

  onCategoryChange(): void {
    if (this.goalCategory !== '3') {
      this.goalType = '0';
    }
    this.workoutId = null;
  }

  onGoalTypeChange(): void {
    this.workoutId = null;
  }

  isCreateStepDisabled(): boolean {
    if (this.goalCategory !== '0' && this.goalType !== '0') {
      // jeigu treniruote
      if (this.goalType === '1' && this.workoutId) {
        return false;
      }
      // jeigu tikslas su skaiciumi
      if ((this.goalType === '2' || this.goalType === '3' || this.goalType === '102') && this.numberForm.valid === true) {
        return false;
      }
      // jeigu nieko nereikia tikslui kurti
      if ((this.goalType === '201' && this.goalCategory === '3') || this.goalType === '101') {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }

  submit(): void {
    if (!this.isCreateStepDisabled()) {
      this._goalsHttpService.createUserGoal(this.goalType, this.goalNameForm.value.goalNameControl, {
        WorkoutId: Number(this.workoutId),
        GoalNumberValue: Number(this.numberForm.value.numberControl),
        GoalStringValue: '',
        IsGroupGoal: this.isGroupGoal
      }).subscribe(() => {
        this.isGroupGoal ? this._router.navigate(['/goals/group']) : this._router.navigate(['/goals']);
      });
    }
  }
}
