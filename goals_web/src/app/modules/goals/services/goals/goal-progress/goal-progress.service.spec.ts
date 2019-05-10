/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoalProgressService } from './goal-progress.service';

describe('Service: GoalProgress', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalProgressService]
    });
  });

  it('should ...', inject([GoalProgressService], (service: GoalProgressService) => {
    expect(service).toBeTruthy();
  }));
});
