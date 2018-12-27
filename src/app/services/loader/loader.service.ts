import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromLoader, selectLoader, loaderActions } from '@app/state';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class LoaderService {
  public loader$: Observable<fromLoader.State> = this.store.select(selectLoader);

  constructor(private store: Store<fromLoader.State>) {
  }

  get pendingRequests$(): Observable<string[]> {
    return this.loader$.pipe(
      pluck('pendingRequests')
    );
  }

  get isLoading$(): Observable<boolean> {
    return this.loader$.pipe(
      pluck('loading')
    );
  }

  load(url: string = 'MANUAL') {
    this.store.dispatch(new loaderActions.AddRequest(url));
  }

  finish(url: string = 'MANUAL') {
    setTimeout(() => {
      this.store.dispatch(new loaderActions.HttpSuccess());
      this.store.dispatch(new loaderActions.DelRequest(url));
    }, 500);
  }

  reset() {
    this.store.dispatch(new loaderActions.ResetLoader());
  }
}
