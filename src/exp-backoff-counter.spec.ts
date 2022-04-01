import { reduce, take } from 'rxjs';
import { ExpBackoffCounter } from './exp-backoff-counter';

describe('ExpBackoffCounter', () => {

  let expBackoffCounter: ExpBackoffCounter;

  beforeEach(() => {
    expBackoffCounter = new ExpBackoffCounter();
  });

  it('counter$', () => {
    const clock = jasmine.clock().install();
    expBackoffCounter.counter$
      .pipe(
        take(4),
        reduce((acc: number[], cur: number) => {
          acc.push(cur);
          return acc;
        }, []),
      )
      .subscribe(values => expect(values).toEqual([3, 2, 1, 0]));
    expBackoffCounter.next(2);
    clock.tick(4000);
  })

  it('next - 1', () => {
    spyOn(expBackoffCounter['counterSubject$'], 'next');
    expBackoffCounter.next();
    expect(expBackoffCounter['counterSubject$'].next).toHaveBeenCalledOnceWith(2);
  });

  it('next - 2', () => {
    spyOn(expBackoffCounter['counterSubject$'], 'next');
    expBackoffCounter.next(4);
    expect(expBackoffCounter['counterSubject$'].next).toHaveBeenCalledOnceWith(16);
  });

});
