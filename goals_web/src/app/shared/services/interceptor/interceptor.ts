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
    private _loadingBarService: LoadingBarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingBarService.changeLoadingState(true);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._loadingBarService.changeLoadingState(false);
          if (event.status !== 200) {
            const message = 'Statuso kodas: ' + event.status;
            this._snackboxService.openSnackBar(message);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this._loadingBarService.changeLoadingState(false);
        const message = 'Klaidos kodas: ' + error.status;
        this._snackboxService.openSnackBar(message);
        return throwError(error);
      }));
  }
}
