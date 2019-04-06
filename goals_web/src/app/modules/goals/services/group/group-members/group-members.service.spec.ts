/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupMembersService } from './group-members.service';

describe('Service: GroupMembers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupMembersService]
    });
  });

  it('should ...', inject([GroupMembersService], (service: GroupMembersService) => {
    expect(service).toBeTruthy();
  }));
});
