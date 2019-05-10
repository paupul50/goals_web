import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupGoalService } from '../../../services/group/group-goal/group-goal.service';
import { WorkoutService } from 'src/app/modules/workout/services/workout/workout.service';

@Component({
  selector: 'app-create-group-goal',
  templateUrl: './create-group-goal.component.html',
  styleUrls: ['./create-group-goal.component.css']
})
export class CreateGroupGoalComponent {
  isWorkoutsLoaded = false;
  workouts: any[];
  constructor(private _workoutService: WorkoutService) {

    this._workoutService.getGroupUnusedWorkouts().subscribe((workouts: any[]) => {
      this.workouts = workouts;
      this.isWorkoutsLoaded = true;
    });
  }
}
