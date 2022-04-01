import { BehaviorSubject, EMPTY, interval, Observable, of, share } from 'rxjs';
import { scan, switchMap, takeWhile } from 'rxjs/operators';

export class ExpBackoffCounter {

  private readonly counterSubject$ = new BehaviorSubject<number>(0);

  /**
   * Get a hot observable which streams a counter value.
   *
   * @remarks
   * Make sure that this observable will be unsubscribed when it is not needed.
   */
  get counter$(): Observable<number> {
    return this.counterSubject$.asObservable().pipe(
      switchMap(count => count <= 0 ? EMPTY : of(count)),
      switchMap(count => interval(1000).pipe(
        scan(acc => acc - 1, count),
        takeWhile(value => value >= 0),
      )),
      share(),
    );
  }

  /**
   * Stream a counter value.
   *
   * @param count Specify a starting value, otherwise the previous starting value + 1
   */
  next(count?: number): void {
    if (count == null) {
      this.counterSubject$.next(2 ** (this.counterSubject$.value + 1));
    } else {
      this.counterSubject$.next(2 ** count);
    }
  }

}
