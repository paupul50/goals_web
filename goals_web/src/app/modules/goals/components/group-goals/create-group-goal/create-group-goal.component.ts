import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupGoalService } from '../../../services/group/group-goal/group-goal.service';
import { WorkoutService } from 'src/app/shared/services/workout/workout.service';

@Component({
  selector: 'app-create-group-goal',
  templateUrl: './create-group-goal.component.html',
  styleUrls: ['./create-group-goal.component.css']
})
export class CreateGroupGoalComponent implements OnInit {
  goalNameForm: FormGroup;

  goalType = '0';
  workoutId: any;
  isWorkoutsLoaded = false;
  // goalTypeForm: FormGroup;
  workouts: any[];
  constructor(private _formBuilder: FormBuilder, private _groupGoalService: GroupGoalService
    , private _workoutService: WorkoutService, private _router: Router) {

    this._workoutService.getGroupUnusedWorkouts().subscribe((workouts: any[]) => {
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
  }

  ngOnInit() {
    this.goalNameForm = this._formBuilder.group({
      goalNameControl: ['', Validators.required]
    });
  }

  submit(): void {



      if (this.goalType === '1') {
        this._groupGoalService.createGroupGoal('1', this.goalNameForm.value.goalNameControl)
        .subscribe(anything => this._router.navigate(['/goals/group']));
      }
      if (this.goalType === '2') {
        this._groupGoalService.createGroupGoal('2', this.goalNameForm.value.goalNameControl, this.workoutId)
        .subscribe(anything => this._router.navigate(['/goals/group']));
      }
  }


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
}
