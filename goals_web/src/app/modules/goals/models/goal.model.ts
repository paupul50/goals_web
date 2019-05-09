export class Goal {
  id: number;
  createdAt: Date;
  name: string;
  type: number;
  numberValue: number;

  constructor(goal: Partial<Goal>) {
    Object.assign(this, goal);
  }
}
