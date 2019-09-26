import { UserService } from './../user.service';
import { LoadingBarService } from './../loading-bar/loading-bar.service';
import { SnackbarService } from 'src/app/shared/services/message-snackbar/snackbar.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private _snackboxService: SnackbarService,
    private _loadingBarService: LoadingBarService,
    private _userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingBarService.changeLoadingState(true);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._loadingBarService.changeLoadingState(false);
          if (event.status !== 200) {
            switch (event.status) {
              case 201: {
                this._snackboxService.openSnackBar('Sėkmingai sukurta.');
                break;
              }
              case 204: {
                // this._snackboxService.openSnackBar('Nėra turinio.');
                break;
              }
              case 400: {
                this._snackboxService.openSnackBar('Neteisingi duomenys.');
                break;
              }
              case 500: {
                this._snackboxService.openSnackBar('Bandykite dar kartą.');
                break;
              }
              case 6000: {
                this._snackboxService.openSnackBar('Treniruotė susieta su tikslu.');
                break;
              }
              default: {
                const message = 'Statuso kodas: ' + event.status;
                this._snackboxService.openSnackBar(message);
                break;
              }
            }
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this._loadingBarService.changeLoadingState(false);
        if (error.status) {
          if (error.status === 401) {
            this._userService.logout();
          } else if (400) {
            this._snackboxService.openSnackBar('Neteisingi duomenys.');
          } else {
            const message = 'Klaidos kodas: ' + error.status;
            this._snackboxService.openSnackBar(message);
          }
        } else {
          const message = 'Nepasiekiami duomenys. Pabandykite dar kartą';
          this._snackboxService.openSnackBar(message);
        }

        return throwError(error);
      }));
  }
}
