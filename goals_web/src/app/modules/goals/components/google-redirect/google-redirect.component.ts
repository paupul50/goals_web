import { UserService } from './../../../../shared/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-redirect',
  templateUrl: './google-redirect.component.html',
  styleUrls: ['./google-redirect.component.css']
})
export class GoogleRedirectComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this._activatedRoute.fragment.subscribe((params: string) => {
      const newParams = params.split('&');
      // const kitas = new URLSearchParams(params);
      let firstParam;
      let secondParam;
      newParams.forEach(element => {
        const valueAndKey = element.split('=');
        // console.log(valueAndKey);
        if (valueAndKey[0] === 'access_token') {
          firstParam = valueAndKey[1];

        }
        if (valueAndKey[0] === 'state') { // nereikia!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          secondParam = valueAndKey[1];
        }
      });
      const paramObject = {
        access_token: firstParam,
        state: secondParam
      };
      this._userService.setGoogleAccess(paramObject).subscribe(() => {
        this._userService.setIsGoogleLogged();
        this._router.navigate(['/goals/today']);
      });
    });
  }

  ngOnInit() {
  }

}
