import { Observable } from 'rxjs';
export declare class ExpBackoffCounter {
    private readonly counterSubject$;
    /**
     * Get a hot observable which streams a counter value.
     *
     * @remarks
     * Make sure that this observable will be unsubscribed when it is not needed.
     */
    get counter$(): Observable<number>;
    /**
     * Stream a counter value.
     *
     * @param count Specify a starting value, otherwise the previous starting value + 1
     */
    next(count?: number): void;
}
