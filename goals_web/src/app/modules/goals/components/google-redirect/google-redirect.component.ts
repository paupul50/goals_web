import { UserService } from './../../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-google-redirect',
  templateUrl: './google-redirect.component.html',
  styleUrls: ['./google-redirect.component.css']
})
export class GoogleRedirectComponent {

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this.saveTokenAndRedirect();

  }

  private saveTokenAndRedirect(): void {
    this._activatedRoute.fragment.subscribe((params: string) => {
      const newParams = params.split('&');
      let token;
      newParams.forEach(element => {
        const valueAndKey = element.split('=');
        if (valueAndKey[0] === 'access_token') {
          token = valueAndKey[1];
        }
      });
      this._userService.setGoogleAccess(token).subscribe(() => {
        this._userService.setIsGoogleLogged();
        this._router.navigate(['/goals/today']);
      });
    });
  }
}
