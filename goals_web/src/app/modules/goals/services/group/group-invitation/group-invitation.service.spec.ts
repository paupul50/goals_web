/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupInvitationService } from './group-invitation.service';

describe('Service: GroupInvitation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupInvitationService]
    });
  });

  it('should ...', inject([GroupInvitationService], (service: GroupInvitationService) => {
    expect(service).toBeTruthy();
  }));
});
