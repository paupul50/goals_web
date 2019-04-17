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
  goalType = '0';
  workoutId: any;
  isWorkoutsLoaded = false;
  // goalTypeForm: FormGroup;
  workouts: any[];

  goalNameForm: FormGroup;

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

    // this.goalTypeForm = this._formBuilder.group({
    //   goalTypeControl: [this.goalType, Validators.required]
    // });
  }

  // temp(stuff) {
  //   console.log('stuff', stuff);
  // }

  isTypeDisabled() {
    if (this.goalType === '1') {
      this.workoutId = null;
      return false;
    }
    if (this.goalType === '2' && this.workoutId) {
      return false;
    }
    return true;
  }

  submit(): void {
    if (this.goalType === '1') {
      this._goalsService.createUserGoal('1', this.goalNameForm.value.goalNameControl)
        .subscribe(anything => this._router.navigate(['/goals']));
    }
    if (this.goalType === '2') {
      this._goalsService.createUserGoal('2', this.goalNameForm.value.goalNameControl, this.workoutId)
        .subscribe(anything => this._router.navigate(['/goals']));
    }
  }
}
