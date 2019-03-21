import { Goal } from './goal.model';
import { GoalProgress } from './goal-progress.model';

export class GoalWithProgressModel {
  goal: Goal;
  goalProgressCollection: GoalProgress[] = [];

  constructor(goalWithProgressModel: Partial<GoalWithProgressModel>) {
    Object.assign(this, goalWithProgressModel);
 }
}
