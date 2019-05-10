import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileHttpService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  getCurrentUserDescription(): Observable<any> {
    return this._http.get(this._userService.BACKURL + 'api/userDescription',
      { headers: this._userService.getHeaders() }).pipe(
        map(progress => {
          return progress;
        })
      );
  }
  getUserDescription(id): Observable<any> {
    const body = JSON.stringify({
      Username: id,
    });
    return this._http.post(this._userService.BACKURL + 'api/userDescription/other', body,
      { headers: this._userService.getHeaders() });
  }
  editCurrentUserDescription(editObject: any, selectedFile: File): Observable<any> {
    const uploadData = new FormData();
    if (selectedFile) {
      uploadData.append('File', selectedFile, selectedFile.name);
    } else {
      uploadData.append('File', null, '');
    }
    uploadData.append('Firstname', editObject.Firstname);
    uploadData.append('Lastname', editObject.Lastname);
    uploadData.append('Description', editObject.Description);

    return this._http.post(this._userService.BACKURL + 'api/userDescription/edit', uploadData,
      { headers: this._userService.getAuthHeader() });
  }
}
