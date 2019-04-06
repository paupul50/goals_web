/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupGoalService } from './group-goal.service';

describe('Service: GroupGoal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupGoalService]
    });
  });

  it('should ...', inject([GroupGoalService], (service: GroupGoalService) => {
    expect(service).toBeTruthy();
  }));
});
