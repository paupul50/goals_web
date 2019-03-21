export class Goal {
  id: number;
  createdAt: Date;
  name: string;

  constructor(goal: Partial<Goal>) {
    Object.assign(this, goal);
  }
}
