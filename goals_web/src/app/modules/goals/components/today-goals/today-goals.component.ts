import { GroupGoalProgressService } from './../../services/group/group-goal-progress/group-goal-progress.service';
import { GoalProgressService } from '../../services/goals/goal-progress/goal-progress.service';
import { GoalsService } from './../../services/goals/goals.service';
import { Component, OnInit } from '@angular/core';
import { GoalWithProgressModel } from '../../models/goal-with-progress.model';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { UserService } from 'src/app/shared/services/user.service';
import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-today-goals',
  templateUrl: './today-goals.component.html',
  styleUrls: ['./today-goals.component.css']
})
export class TodayGoalsComponent implements OnInit {
  isGroupGoalsLoaded = false;
  isGoalsLoaded = false;
  displayedColumns: string[] = ['goal', 'goalProgress'];
  goalsObject: GoalWithProgressModel[] = [];
  groupGoalsObject: any;
  constructor(private _goalsService: GoalsService,
    private _goalProgressService: GoalProgressService,
    private _groupGoalProgressService: GroupGoalProgressService,
    private oauthService: OAuthService,
    public userService: UserService,
    private _snackbarService: SnackbarService) {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      redirectUri: 'http://localhost:4200/goals/today/success',

      clientId: '688983539905-2gcgd6oodn76un7l6gp0okkfr7qip9pa.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/fitness.activity.read',
      strictDiscoveryDocumentValidation: false,
      responseType: 'code token',
      // send_nonce: false
    };
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.oidc = true;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log(this.encode(this.userService.getCurrentUsername()));

    this.setGoalsProgressData();
  }

  private setGoalsProgressData(): void {
    this.setGroupGoalsProgress();
    this.setGoalsProgress();
  }

  private setGoalsProgress(): void {
    this._goalsService.getUserTodayGoalWithProgress().subscribe((goalWithProgress: any[]) => {
      this.goalsObject = goalWithProgress;
      console.log('mygoal progress', this.goalsObject);
      this.isGoalsLoaded = true;
    });
  }

  private setGroupGoalsProgress(): void {
    this._groupGoalProgressService.getTodayUserGroupGoalsProgress().subscribe((goalWithProgress: any) => {
      this.groupGoalsObject = goalWithProgress;
      console.log('groupgoal progress', this.groupGoalsObject);
      this.isGroupGoalsLoaded = true;
    });
  }

  ngOnInit() {
  }

  loginWithGoogle(): void {
    try {
      // this.oauthService.initImplicitFlow(this.encode(this.userService.getCurrentUsername()));
      this.oauthService.initImplicitFlow();
    } catch (error) {
      console.log(error);
    }
  }

  synchroniseGoogleData(): void {
    this._goalsService.synchroniseGoogleData().subscribe((response: any) => {
      console.log(response);
      if (response.error) {
        this._snackbarService.openSnackBar('Klaida:' + response.error);
        this.userService.removeIsGoogleLogged();
      } else {
        this._snackbarService.openSnackBar('duomenys susinchronizuoti.');
        location.reload();
      }
    });
  }

  private encode(valueToEncode: string): string {
    let encodedValue = btoa(valueToEncode);
    encodedValue = encodedValue.replace('/', '_').replace('+', '-');
    return encodedValue;
  }

  changeGoalProgressState(element: any): void {
    if (element.goal.goalType === 1) {
      this._goalProgressService.updateProgressState(element.goalProgress).subscribe((isDone: boolean) => {
        element.goalProgress.isDone = isDone;
      });
    }
  }

  changeGroupProgressState(element: any): void {
    if (element.goal.goalType === 1) {
      this._groupGoalProgressService.updateGroupGoalProgressState(element.GroupGoalProgress)
        .subscribe((progress: any) => {
          element.GroupGoalProgress.isDone = progress.isDone;
        });
    }
  }
}
