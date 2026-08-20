---
title: Rx.js Fundamentals | Frontend Masters
description: Course notes for Rx.js Fundamentals by Steve Kinney.
publishDate: 2026-08-15
---
# RxJS Operators Notes

## Operators

Operators are functions used to transform, filter, combine, or otherwise work with values emitted by an Observable.

They are commonly chained using `.pipe()`:

```ts
source$
  .pipe(
    operator1(),
    operator2(),
    operator3()
  )
  .subscribe();
```

`pipe()` receives one or more operators and applies them in order.

> The order of operators matters because each operator receives the output of the previous one.

---

## Filtering and Selecting Values

### `take`

Emits only a specific number of values and then completes.

```ts
source$.pipe(
  take(3)
);
```

This takes the first three emitted values.

---

### `skip`

Ignores a specific number of values from the beginning.

Documentation:

https://rxjs.dev/api/operators/skip

```ts
source$.pipe(
  skip(2)
);
```

This ignores the first two emitted values.

---

### `takeWhile`

Emits values while a condition remains true.

```ts
source$.pipe(
  takeWhile(value => value < 10)
);
```

As soon as the condition becomes false, the Observable completes.

---

### `skipWhile`

Ignores values while a condition is true.

Once the condition becomes false, it starts emitting values normally.

```ts
source$.pipe(
  skipWhile(value => value < 10)
);
```

---

### `filter`

Works similarly to `Array.prototype.filter()`.

Documentation:

https://rxjs.dev/api/operators/filter

```ts
source$.pipe(
  filter(value => value > 10)
);
```

Only values matching the condition are emitted.

---

## Transforming Values

### `map`

Works similarly to `Array.prototype.map()`.

Documentation:

https://rxjs.dev/api/operators/map

```ts
source$.pipe(
  map(value => value * 2)
);
```

Each emitted value is transformed before continuing through the stream.

---

### `mapTo`

Maps every emitted value to the same fixed value.

```ts
source$.pipe(
  mapTo("completed")
);
```

> In newer RxJS code, `map(() => value)` is generally preferred.

---

### `reduce`

Accumulates values and emits only the final result when the source Observable completes.

```ts
source$.pipe(
  reduce((total, value) => total + value, 0)
);
```

If the source emits:

```text
1 → 2 → 3
```

`reduce` emits:

```text
6
```

only after the source completes.

---

### `scan`

Similar to `reduce`, but emits the accumulated result after every value.

```ts
source$.pipe(
  scan((total, value) => total + value, 0)
);
```

If the source emits:

```text
1 → 2 → 3
```

`scan` emits:

```text
1 → 3 → 6
```

---

### `tap`

Performs a side effect without changing the emitted value.

Useful for:

- Logging
- Debugging
- Updating external state
- Observing intermediate values

```ts
source$.pipe(
  tap(value => console.log(value))
);
```

The same value continues through the stream.

---

# Combining Operators

## `takeUntil`

Emits values until another Observable emits.

```ts
source$.pipe(
  takeUntil(stop$)
);
```

When `stop$` emits, `source$` completes.

A common Angular use case is stopping subscriptions when a component is destroyed.

---

## `skipUntil`

Ignores values until another Observable emits.

```ts
source$.pipe(
  skipUntil(start$)
);
```

Once `start$` emits, values from `source$` begin passing through.

---

# Manipulating Time

## `delay`

Delays emitted values by a specified amount of time.

```ts
source$.pipe(
  delay(1000)
);
```

The values are emitted one second later.

---

## `throttleTime`

Allows one value through and then ignores subsequent values for a specified period.

```ts
source$.pipe(
  throttleTime(1000)
);
```

Conceptually:

```text
emit one value
↓
ignore values for 1 second
↓
allow another value
```

Useful for high-frequency events such as:

- Scroll events
- Mouse movement
- Repeated button clicks

---

## `debounceTime`

Waits until values stop arriving for a specified amount of time before emitting the latest one.

```ts
searchInput$.pipe(
  debounceTime(300)
);
```

Very useful for:

- Search bars
- Autocomplete
- Form inputs
- Avoiding unnecessary server requests

Example:

```text
User types: h
User types: he
User types: hel
User types: hello

wait 300 ms...

emit: "hello"
```

`debounceTime` is useful when you want to wait until the user has stopped typing before making an API request.

---

# Merging Timelines

## `merge`

Combines multiple Observables into a single Observable.

Values are emitted whenever any source Observable emits.

```ts
merge(x$, y$);
```

Example:

```text
x$:  ----A------B-----
y$:  --1----2---------3

merge:
     --1-A--2---B-----3
```

The order depends on when each source emits.

---

## `concat`

Subscribes to Observables one after another.

The next Observable starts only after the previous one completes.

```ts
concat(x$, y$);
```

Conceptually:

```text
x$ completes
↓
then y$ starts
```

Use this when order matters.

---

## `race`

Subscribes to multiple Observables and keeps only the first Observable that emits.

```ts
race(x$, y$);
```

Once one source emits first, the others are unsubscribed.

Conceptually:

```text
x$ ─────A────
y$ ──1───────

winner: y$

result:
──1──────────
```

---

## `forkJoin`

Waits for all source Observables to complete and then emits their final values together.

```ts
forkJoin({
  user: user$,
  settings: settings$
});
```

Example output:

```ts
{
  user: lastUserValue,
  settings: lastSettingsValue
}
```

This is similar to `Promise.all()`.

Important:

- Every Observable must complete.
- Only the last emitted value from each Observable is returned.

A common use case is executing multiple independent HTTP requests and waiting for all of them.

---

# Higher-Order Observables

A higher-order Observable is an Observable that emits other Observables.

Conceptually:

```ts
Observable<Observable<T>>
```

Operators such as `mergeAll`, `concatAll`, `mergeMap`, `concatMap`, `switchMap`, and `exhaustMap` help flatten these nested Observables.

---

## `mergeAll`

Takes inner Observables and subscribes to all of them concurrently.

```ts
source$.pipe(
  mergeAll()
);
```

Conceptually:

```text
Observable<Observable<T>>
        ↓
      mergeAll
        ↓
Observable<T>
```

All inner streams can run at the same time.

---

## `mergeMap`

Maps each source value to an Observable and merges all resulting Observables concurrently.

It is conceptually similar to `flatMap` for arrays.

```ts
source$.pipe(
  mergeMap(value => apiCall(value))
);
```

Use `mergeMap` when:

- Multiple inner operations can run concurrently.
- You do not want previous operations to be cancelled.
- The order of completion does not matter.

Example:

```text
source:
A ---- B ---- C

mergeMap:
request A ─────────── complete
request B ───── complete
request C ───────── complete
```

All requests can exist at the same time.

---

## `concatAll`

Subscribes to each inner Observable sequentially.

It waits for the current inner Observable to complete before subscribing to the next one.

```ts
source$.pipe(
  concatAll()
);
```

---

## `concatMap`

Maps each source value to an Observable and executes the resulting Observables one at a time, in order.

```ts
source$.pipe(
  concatMap(value => apiCall(value))
);
```

Use `concatMap` when:

- Order matters.
- Requests must execute sequentially.
- A new operation must wait for the previous one.

Conceptually:

```text
A request
↓ completes
B request
↓ completes
C request
```

---

## `switchMap`

Maps each value to an Observable.

When a new source value arrives, `switchMap` unsubscribes from the previous inner Observable and switches to the new one.

```ts
search$.pipe(
  switchMap(query => searchApi(query))
);
```

Mental model:

> "Something new happened. Forget the previous operation and switch to the latest one."

Example:

```text
query "a"
    ↓
request A starts

query "ab"
    ↓
request A is cancelled
request AB starts

query "abc"
    ↓
request AB is cancelled
request ABC starts
```

Very useful for:

- Search/autocomplete
- Route parameter changes
- Requests where only the latest result matters

---

## `exhaustMap`

Maps a value to an Observable and ignores new source emissions while the current inner Observable is still running.

```ts
submit$.pipe(
  exhaustMap(() => saveForm())
);
```

Mental model:

> "I'm already doing something. Ignore everything else until I'm finished."

Example:

```text
click 1 → request starts
click 2 → ignored
click 3 → ignored

request completes

click 4 → new request starts
```

Useful for preventing duplicate actions such as:

- Multiple form submissions
- Repeated login requests
- Repeated payment button clicks

---

# Combining Latest Values

## `combineLatestAll`

Used with an Observable that emits other Observables.

Once every inner Observable has emitted at least once, it emits an array containing the latest value from each one.

```ts
source$.pipe(
  combineLatestAll()
);
```

Whenever any inner Observable emits again, a new combined array is emitted.

---

## `combineLatestWith`

Combines the latest value from the source Observable with the latest values from other Observables.

```ts
user$.pipe(
  combineLatestWith(settings$)
);
```

Once every Observable has emitted at least once:

```ts
[user, settings]
```

is emitted whenever any source emits a new value.

---

# `NEVER` vs `EMPTY`

## `EMPTY`

`EMPTY` emits no values and completes immediately.

```ts
EMPTY
```

Conceptually:

```text
|
complete immediately
```

Useful when you need an Observable that does nothing and completes.

---

## `NEVER`

`NEVER` emits no values and never completes.

```ts
NEVER
```

Conceptually:

```text
-----------------------------
```

It stays subscribed forever unless something unsubscribes from it.

---

# Flattening Operator Cheat Sheet

| Operator | Concurrent? | Keeps order? | Cancels previous? | Ignores new values? |
|---|---:|---:|---:|---:|
| `mergeMap` | Yes | No | No | No |
| `concatMap` | No | Yes | No | No |
| `switchMap` | No | Latest only | Yes | No |
| `exhaustMap` | No | Current only | No | Yes |

## Mental Models

### `mergeMap`

> "Do everything."

### `concatMap`

> "Do everything, but one at a time."

### `switchMap`

> "Only the latest operation matters."

### `exhaustMap`

> "I'm busy. Ignore new requests until I'm done."


--- 

# Rx.js Fundamentals | Frontend Masters

### Observables

**Basic Observables Overview**

[00:00:43](https://master.dev/courses/rx-js/basic-observables-overview?t=43)
Here's a link to documentation on [of](https://rxjs.dev/api/index/function/of)

[00:02:46](https://master.dev/courses/rx-js/basic-observables-overview?t=166)
Here's a link to documentation on [from](https://rxjs.dev/api/index/function/from)

[00:07:38](https://master.dev/courses/rx-js/basic-observables-overview?t=458)
Here's a link to the [course website](https://rxjs-fundamentals.netlify.app/)

[00:07:45](https://master.dev/courses/rx-js/basic-observables-overview?t=465)
Here's a link to the [course repo](https://github.com/stevekinney/rxjs-fundamentals#readme)

### Intervals & Timers

**Intervals & Timers**

[00:00:07](https://master.dev/courses/rx-js/intervals-timers?t=7)
Here's a link to documentation on [interval](https://rxjs.dev/api/index/function/interval)

[00:03:06](https://master.dev/courses/rx-js/intervals-timers?t=186)
Here's a link to documentation on [timer](https://rxjs.dev/api/index/function/timer)

### Operators

**Operators**

[00:03:53](https://master.dev/courses/rx-js/operators?t=233)
Here's a link to documentation on [take](https://rxjs.dev/api/operators/take)

[00:04:40](https://master.dev/courses/rx-js/operators?t=280)
Here's a link to documentation on [skip](https://rxjs.dev/api/operators/skip)

[00:04:49](https://master.dev/courses/rx-js/operators?t=289)
Here are links to documentation on [takeWhile](https://rxjs.dev/api/operators/takeWhile) and [skipWhile](https://rxjs.dev/api/operators/skipWhile)

[00:08:54](https://master.dev/courses/rx-js/operators?t=534)
Here's a link to documentation on [filter](https://rxjs.dev/api/operators/filter)

[00:09:12](https://master.dev/courses/rx-js/operators?t=552)
Here's a link to documentation on [map](https://rxjs.dev/api/operators/map)

[00:09:49](https://master.dev/courses/rx-js/operators?t=589)
Here's a link to documentation on [mapTo](https://rxjs.dev/api/operators/mapTo)

[00:10:12](https://master.dev/courses/rx-js/operators?t=612)
Here's a link to documentation on [reduce](https://rxjs.dev/api/operators/reduce)

[00:10:43](https://master.dev/courses/rx-js/operators?t=643)
Here's a link to documentation on [scan](https://rxjs.dev/api/operators/scan)

[00:11:32](https://master.dev/courses/rx-js/operators?t=692)
Here's a link to documentation on [tap](https://rxjs.dev/api/operators/tap)

**Combining Operators Exercise**

[00:00:03](https://master.dev/courses/rx-js/combining-operators-exercise?t=3)
Here are links to documentation on [takeUntil](https://rxjs.dev/api/operators/takeUntil) and [skip Until](https://rxjs.dev/api/operators/skipUntil)

### Manipulating Time

**Manipulating Time**

[00:01:39](https://master.dev/courses/rx-js/manipulating-time?t=99)
Here's a link to documentation on [delay](https://rxjs.dev/api/operators/delay)

[00:02:41](https://master.dev/courses/rx-js/manipulating-time?t=161)
Here's a link to documentation on [throttleTime](https://rxjs.dev/api/operators/throttleTime)

[00:03:25](https://master.dev/courses/rx-js/manipulating-time?t=205)
Here's a link to documentation on [debounceTime](https://rxjs.dev/api/operators/debounceTime)

### Higher Order Observables

**Higher Order Observables**

[00:03:30](https://master.dev/courses/rx-js/higher-order-observables?t=210)
Here's a link to documentation on [mergeAll](https://rxjs.dev/api/operators/mergeAll)

[00:03:57](https://master.dev/courses/rx-js/higher-order-observables?t=237)
Here's a link to documentation on [mergeMap](https://rxjs.dev/api/operators/mergeMap)

[00:04:25](https://master.dev/courses/rx-js/higher-order-observables?t=265)
Here are links to documentation on [concatAll](https://rxjs.dev/api/operators/concatAll) and [concatMap](https://rxjs.dev/api/operators/concatMap)

[00:07:28](https://master.dev/courses/rx-js/higher-order-observables?t=448)
Here's a link to documentation on [combineLastestAll](https://rxjs.dev/api/operators/combineLatestAll)

[00:08:27](https://master.dev/courses/rx-js/higher-order-observables?t=507)
Here's a link to documentation on [combineLastestWith](https://rxjs.dev/api/operators/combineLatestWith)

**Mapping**

[00:00:06](https://master.dev/courses/rx-js/mapping?t=6)
Here's a link to the [Mapping Exercise](https://rxjs-fundamentals.netlify.app/applications/mapping/index.html)

[00:03:09](https://master.dev/courses/rx-js/mapping?t=189)
Here's a link to documentation on [mergeMap](https://rxjs.dev/api/operators/mergeMap)

### Fetching from an API

**Fetching from an API**

[00:09:14](https://master.dev/courses/rx-js/fetching-from-an-api?t=554)
If this errors check to make sure auto complete didn't import a response

**catchError Operator & Retry**

[00:00:10](https://master.dev/courses/rx-js/catcherror-operator-retry?t=10)
Here's a link to documentation on [catchError](https://rxjs.dev/api/operators/catchError)

**Creating an API Data Stream**

[00:08:55](https://master.dev/courses/rx-js/creating-an-api-data-stream?t=535)
Make sure your flakiness value isn't causing errors

### Wrapping Up

**Wrapping Up**

[00:05:32](https://master.dev/courses/rx-js/wrapping-up?t=332)
Here's a link to check out [redux-observable](https://redux-observable.js.org/)

[00:12:09](https://master.dev/courses/rx-js/wrapping-up?t=729)
Here's a link to check out the [Rx.js docs](https://rxjs.dev/)


