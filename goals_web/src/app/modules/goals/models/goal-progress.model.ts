export class GoalProgress {
  id: number;
  isDone: boolean;
  createdAt: Date;
  isDummy: boolean;
  numberValue: Number;
  stringValue: string;
  constructor(goalProgress: Partial<GoalProgress>) {
    Object.assign(this, goalProgress);
  }

}
