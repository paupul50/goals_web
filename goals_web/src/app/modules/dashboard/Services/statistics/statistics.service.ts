import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private _http: HttpClient, private _userService: UserService) { }

  getCurrentUserDescription(): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/statistics', { headers: this._userService.getHeaders() });
  }
}
