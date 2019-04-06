/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupGoalProgressService } from './group-goal-progress.service';

describe('Service: GroupGoalProgress', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupGoalProgressService]
    });
  });

  it('should ...', inject([GroupGoalProgressService], (service: GroupGoalProgressService) => {
    expect(service).toBeTruthy();
  }));
});
