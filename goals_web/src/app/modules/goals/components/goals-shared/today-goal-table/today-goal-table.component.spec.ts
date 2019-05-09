/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodayGoalTableComponent } from './today-goal-table.component';

describe('TodayGoalTableComponent', () => {
  let component: TodayGoalTableComponent;
  let fixture: ComponentFixture<TodayGoalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayGoalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayGoalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
