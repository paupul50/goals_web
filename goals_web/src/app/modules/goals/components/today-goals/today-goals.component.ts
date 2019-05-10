import { GroupGoalProgressHttpService } from '../../services/group/group-goal-progress/group-goal-progress-http.service';
import { GoalsHttpService } from '../../services/goals/goals-http.service';
import { Component } from '@angular/core';
import { GoalWithProgressModel } from '../../models/goal-with-progress.model';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { UserService } from 'src/app/shared/services/user.service';
import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';
@Component({
  selector: 'app-today-goals',
  templateUrl: './today-goals.component.html',
  styleUrls: ['./today-goals.component.css']
})
export class TodayGoalsComponent {
  isGroupGoalsLoaded = false;
  isGoalsLoaded = false;

  goalsObject: GoalWithProgressModel[] = [];
  groupGoalsObject: any[];

  constructor(
    private _goalsHttpService: GoalsHttpService,
    private _groupGoalProgressHttpService: GroupGoalProgressHttpService,
    private oauthService: OAuthService,
    public userService: UserService,
    private _snackbarService: SnackbarService) {
    this.setupGoogleAuth();
  }

  private setupGoogleAuth(): void {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      redirectUri: this.userService.BACKURL + 'goals/today/success',
      clientId: '688983539905-2gcgd6oodn76un7l6gp0okkfr7qip9pa.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/fitness.activity.read',
      strictDiscoveryDocumentValidation: false,
      responseType: 'code token',
    };
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.oidc = true;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.setGoalsProgressData();
  }

  private setGoalsProgressData(): void {
    this.setGroupGoalsProgress();
    this.setGoalsProgress();
  }

  private setGoalsProgress(): void {
    this._goalsHttpService.getUserTodayGoalWithProgress().subscribe((goalWithProgress: any[]) => {
      this.goalsObject = goalWithProgress;
      this.isGoalsLoaded = true;
    });
  }

  private setGroupGoalsProgress(): void {
    this._groupGoalProgressHttpService.getTodayUserGroupGoalsProgress().subscribe((goalWithProgress: any) => {
      this.groupGoalsObject = goalWithProgress;
      this.isGroupGoalsLoaded = true;
    });
  }

  loginWithGoogle(): void {
    try {
      this.oauthService.initImplicitFlow();
    } catch (error) {
      this._snackbarService.openSnackBar('Klaida.');
    }
  }

  synchroniseGoogleData(): void {
    this._goalsHttpService.synchroniseGoogleData().subscribe((response: any) => {
      if (response.error) {
        this._snackbarService.openSnackBar('Klaida:' + response.error);
        this.userService.removeIsGoogleLogged();
      } else {
        this._snackbarService.openSnackBar('Duomenys susinchronizuoti.');
        location.reload();
      }
    });
  }
}
