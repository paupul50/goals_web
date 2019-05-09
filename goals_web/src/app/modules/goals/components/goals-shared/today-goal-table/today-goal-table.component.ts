import { Component, OnInit, Input } from '@angular/core';
import { GoalProgressService } from '../../../services/goals/goal-progress/goal-progress.service';
import { GroupGoalProgressService } from '../../../services/group/group-goal-progress/group-goal-progress.service';
import { GoalWithProgressModel } from '../../../models/goal-with-progress.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-today-goal-table',
  templateUrl: './today-goal-table.component.html',
  styleUrls: ['./today-goal-table.component.css']
})
export class TodayGoalTableComponent implements OnInit {
  @Input() goalsObject: any[] = [];
  @Input() isGroup: boolean;
  displayedColumns: string[] = ['goal', 'isDone', 'goalProgress'];

  numberForm: FormGroup;
  constructor(
    private _goalProgressService: GoalProgressService,
    private _groupGoalProgressService: GroupGoalProgressService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.numberForm = this._formBuilder.group({
      numberControl: ['', [Validators.required]]
    });
  }

  isWorkoutEdit(goalType: number) {
    return goalType === 1 ? true : false;
  }
  isNumberEdit(goalType: number) {
    return goalType === 102 ? true : false;
  }
  isStandartEdit(goalType: number) {
    return goalType === 101 ? true : false;
  }
  isNumberUneditable(goalType: number) {
    return goalType === 2 || goalType === 3 ? true : false;
  }


  changeGoalProgressState(element: any): void {
    console.log(element);
    element.goalProgress.goalNumberValue = Number(this.numberForm.value.numberControl);
    this._goalProgressService.updateProgressState(element.goalProgress, this.isGroup).subscribe((isDone: boolean) => {
      element.goalProgress.isDone = isDone;
    });
  }

  // changeGroupProgressState(element: any): void {
  //   if (element.goal.goalType === 1) {
  //     this._groupGoalProgressService.updateGroupGoalProgressState(element.GroupGoalProgress)
  //       .subscribe((progress: any) => {
  //         element.GroupGoalProgress.isDone = progress.isDone;
  //       });
  //   }
  // }
}
;
