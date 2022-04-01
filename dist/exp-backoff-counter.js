"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpBackoffCounter = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ExpBackoffCounter = /** @class */ (function () {
    function ExpBackoffCounter() {
        this.counterSubject$ = new rxjs_1.BehaviorSubject(0);
    }
    Object.defineProperty(ExpBackoffCounter.prototype, "counter$", {
        /**
         * Get a hot observable which streams a counter value.
         *
         * @remarks
         * Make sure that this observable will be unsubscribed when it is not needed.
         */
        get: function () {
            return this.counterSubject$.asObservable().pipe((0, operators_1.switchMap)(function (count) { return count <= 0 ? rxjs_1.EMPTY : (0, rxjs_1.of)(count); }), (0, operators_1.switchMap)(function (count) { return (0, rxjs_1.interval)(1000).pipe((0, operators_1.scan)(function (acc) { return acc - 1; }, count), (0, operators_1.takeWhile)(function (value) { return value >= 0; })); }), (0, rxjs_1.share)());
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Stream a counter value.
     *
     * @param count Specify a starting value, otherwise the previous starting value + 1
     */
    ExpBackoffCounter.prototype.next = function (count) {
        if (count == null) {
            this.counterSubject$.next(Math.pow(2, (this.counterSubject$.value + 1)));
        }
        else {
            this.counterSubject$.next(Math.pow(2, count));
        }
    };
    return ExpBackoffCounter;
}());
exports.ExpBackoffCounter = ExpBackoffCounter;
//# sourceMappingURL=exp-backoff-counter.js.map