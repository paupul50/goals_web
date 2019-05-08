import { GoalsService } from '../../../services/goals/goals.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutService } from 'src/app/modules/workout/services/workout/workout.service';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {
  goalCategory = '0';
  workoutId: any;
  isWorkoutsLoaded = false;
  // goalTypeForm: FormGroup;
  workouts = [];
  goalType = '0';

  goalNameForm: FormGroup;
  numberForm: FormGroup;

  typeNotValid = true;
  constructor(private _formBuilder: FormBuilder, private _goalsService: GoalsService,
    private _router: Router, private _workoutService: WorkoutService) {
    this._workoutService.getUserUnusedWorkouts().subscribe((workouts: any[]) => {
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
  }

  ngOnInit() {
    this.goalNameForm = this._formBuilder.group({
      goalNameControl: ['', Validators.required]
    });

    this.numberForm = this._formBuilder.group({
      numberControl: ['', [Validators.required]]
    });

    // this.goalTypeForm = this._formBuilder.group({
    //   goalTypeControl: [this.goalType, Validators.required]
    // });
  }

  // temp(stuff) {
  //   console.log('stuff', stuff);
  // }
  setRandomGoalType(): void {
    this.goalType = '201';
  }
  onCategoryChange(): void {
    console.log('pasikeite');
    if (this.goalCategory !== '3') {
      this.goalType = '0';
    }
    this.workoutId = null;
  }

  onGoalTypeChange(): void {
    this.workoutId = null;
  }

  isCreateStepDisabled() {
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
      this._goalsService.createUserGoal(this.goalType, this.goalNameForm.value.goalNameControl, {
        WorkoutId: this.workoutId,
        GoalNumberValue: this.numberForm.value.numberControl,
        GoalStringValue: ''
      }).subscribe(anything => this._router.navigate(['/goals']));
    }
  }
}
