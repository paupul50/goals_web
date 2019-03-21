export class GoalProgress {
  id: number;
  isDone: boolean;
  createdAt: Date;
  isDummy: boolean;

  constructor(goalProgress: Partial<GoalProgress>) {
    Object.assign(this, goalProgress);
  }

}
