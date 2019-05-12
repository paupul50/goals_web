import { Component, OnInit, Input } from '@angular/core';
import { GoalProgressHttpService } from '../../../services/goals/goal-progress/goal-progress-http.service';
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
    private _goalProgressHttpService: GoalProgressHttpService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.numberForm = this._formBuilder.group({
      numberControl: ['', [Validators.required]]
    });
  }

  isWorkoutEdit(goalType: number): boolean {
    return goalType === 1 ? true : false;
  }
  isNumberEdit(goalType: number): boolean {
    return goalType === 102 ? true : false;
  }
  isStandartEdit(goalType: number): boolean {
    return goalType === 101 || goalType === 201 ? true : false;
  }
  isNumberUneditable(goalType: number): boolean {
    return goalType === 2 || goalType === 3 ? true : false;
  }

  changeGoalProgressState(element: any): void {
    element.goalProgress.goalNumberValue = Number(this.numberForm.value.numberControl);
    this._goalProgressHttpService.updateProgressState(element.goalProgress, this.isGroup).subscribe((isDone: boolean) => {
      element.goalProgress.isDone = isDone;
    });
  }
}
