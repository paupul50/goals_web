import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {
  private _isLoadingSubject = new Subject<boolean>();

  constructor() { }

  getIsLoadingObservable(): Observable<boolean> {
    return this._isLoadingSubject.asObservable();
  }

  changeLoadingState(isLoading: boolean): void {
    // console.log(isLoading);
    this._isLoadingSubject.next(isLoading);
  }
}
