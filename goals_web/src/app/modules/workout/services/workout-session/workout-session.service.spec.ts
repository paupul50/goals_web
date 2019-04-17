/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkoutSessionService } from './workout-session.service';

describe('Service: WorkoutSession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutSessionService]
    });
  });

  it('should ...', inject([WorkoutSessionService], (service: WorkoutSessionService) => {
    expect(service).toBeTruthy();
  }));
});
