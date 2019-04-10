/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkoutCreateService } from './workout-create.service';

describe('Service: WorkoutCreate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutCreateService]
    });
  });

  it('should ...', inject([WorkoutCreateService], (service: WorkoutCreateService) => {
    expect(service).toBeTruthy();
  }));
});
