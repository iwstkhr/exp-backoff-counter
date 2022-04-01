# exp-backoff-counter
An exponential backoff counter using rxjs.

## Install
```
npm install https://github.com/iwstkhr/exp-backoff-counter.git
```

## Usage
```typescript
import { ExpBackoffCounter } from '@iwstkhr/exp-backoff-counter';

const counter = new ExpBackoffCounter();
counter.counter$.subscribe(value => console.warn(value));
counter.next(2);
// Output
// 3
// 2
// 1
// 0
```

## License
MIT
