---
title: Function.ts
nav_order: 4
parent: Modules
---

## Function overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [guards](#guards)
  - [isFunction](#isfunction)
- [type lambdas](#type-lambdas)
  - [FunctionTypeLambda (interface)](#functiontypelambda-interface)
- [utils](#utils)
  - [FunctionN (interface)](#functionn-interface)
  - [LazyArg (interface)](#lazyarg-interface)
  - [SK](#sk)
  - [absurd](#absurd)
  - [apply](#apply)
  - [compose](#compose)
  - [constFalse](#constfalse)
  - [constNull](#constnull)
  - [constTrue](#consttrue)
  - [constUndefined](#constundefined)
  - [constVoid](#constvoid)
  - [constant](#constant)
  - [dual](#dual)
  - [flip](#flip)
  - [flow](#flow)
  - [hole](#hole)
  - [identity](#identity)
  - [pipe](#pipe)
  - [tupled](#tupled)
  - [unsafeCoerce](#unsafecoerce)
  - [untupled](#untupled)

---

# guards

## isFunction

Tests if a value is a `function`.

**Signature**

```ts
export declare const isFunction: (input: unknown) => input is Function
```

**Example**

```ts
import { isFunction } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isFunction(isFunction), true)
assert.deepStrictEqual(isFunction('function'), false)
```

Added in v1.0.0

# type lambdas

## FunctionTypeLambda (interface)

**Signature**

```ts
export interface FunctionTypeLambda extends TypeLambda {
  readonly type: (a: this['In']) => this['Target']
}
```

Added in v1.0.0

# utils

## FunctionN (interface)

**Signature**

```ts
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
  (...args: A): B
}
```

**Example**

```ts
import { FunctionN } from '@fp-ts/core/Function'

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

Added in v1.0.0

## LazyArg (interface)

A lazy argument

**Signature**

```ts
export interface LazyArg<A> {
  (): A
}
```

Added in v1.0.0

## SK

The SK combinator, also known as the "S-K combinator" or "S-combinator", is a fundamental combinator in the
lambda calculus and the SKI combinator calculus.

This function is useful for discarding the first argument passed to it and returning the second argument.

**Signature**

```ts
export declare const SK: <A, B>(_: A, b: B) => B
```

**Example**

```ts
import { SK } from '@fp-ts/core/Function'

assert.deepStrictEqual(SK(0, 'hello'), 'hello')
```

Added in v1.0.0

## absurd

The `absurd` function is a stub for cases where a value of type `never` is encountered in your code,
meaning that it should be impossible for this code to be executed.

This function is particularly useful in functional programming, where it's often necessary to specify that certain cases are impossible.
By calling `absurd`, you can ensure that the type system correctly reflects that a certain value should never occur.

**Signature**

```ts
export declare const absurd: <A>(_: never) => A
```

Added in v1.0.0

## apply

Apply a function to a given value.

**Signature**

```ts
export declare const apply: <A>(a: A) => <B>(self: (a: A) => B) => B
```

**Example**

```ts
import { pipe, apply } from '@fp-ts/core/Function'
import { length } from '@fp-ts/core/String'

assert.deepStrictEqual(pipe(length, apply('hello')), 5)
```

Added in v1.0.0

## compose

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

**Signature**

```ts
export declare const compose: {
  <B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C
  <A, B, C>(self: (a: A) => B, bc: (b: B) => C): (a: A) => C
}
```

**Example**

```ts
import { compose } from '@fp-ts/core/Function'

const inc = (n: number) => n + 1
const square = (n: number) => n * n

assert.strictEqual(compose(inc, square)(2), 9)
```

Added in v1.0.0

## constFalse

A thunk that returns always `false`.

**Signature**

```ts
export declare const constFalse: LazyArg<boolean>
```

Added in v1.0.0

## constNull

A thunk that returns always `null`.

**Signature**

```ts
export declare const constNull: LazyArg<null>
```

Added in v1.0.0

## constTrue

A thunk that returns always `true`.

**Signature**

```ts
export declare const constTrue: LazyArg<boolean>
```

Added in v1.0.0

## constUndefined

A thunk that returns always `undefined`.

**Signature**

```ts
export declare const constUndefined: LazyArg<undefined>
```

Added in v1.0.0

## constVoid

A thunk that returns always `void`.

**Signature**

```ts
export declare const constVoid: LazyArg<void>
```

Added in v1.0.0

## constant

Creates a constant value that never changes.

This is useful when you want to pass a value to a higher-order function (a function that takes another function as its argument)
and want that inner function to always use the same value, no matter how many times it is called.

**Signature**

```ts
export declare const constant: <A>(value: A) => LazyArg<A>
```

Added in v1.0.0

## dual

Creates a function that can be used in a data-last (aka `pipe`able) or data-first style.

**Signature**

```ts
export declare const dual: <
  DataLast extends (...args: Array<any>) => any,
  DataFirst extends (...args: Array<any>) => any
>(
  dataFirstArity: Parameters<DataFirst>['length'],
  body: DataFirst
) => DataLast & DataFirst
```

**Example**

```ts
import { dual, pipe } from '@fp-ts/core/Function'

export const sum: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self + that)

assert.deepStrictEqual(sum(2, 3), 5)
assert.deepStrictEqual(pipe(2, sum(3)), 5)
```

Added in v1.0.0

## flip

Reverses the order of arguments for a curried function.

**Signature**

```ts
export declare const flip: <A extends unknown[], B extends unknown[], C>(
  f: (...a: A) => (...b: B) => C
) => (...b: B) => (...a: A) => C
```

**Example**

```ts
import { flip } from '@fp-ts/core/Function'

const f = (a: number) => (b: string) => a - b.length

assert.deepStrictEqual(flip(f)('aaa')(2), -1)
```

Added in v1.0.0

## flow

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

**Signature**

```ts
export declare function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
export declare function flow<A extends ReadonlyArray<unknown>, B, C>(
  ab: (...a: A) => B,
  bc: (b: B) => C
): (...a: A) => C
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J
```

**Example**

```ts
import { flow } from '@fp-ts/core/Function'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.deepStrictEqual(f('aaa'), 6)
```

Added in v1.0.0

## hole

Type hole simulation

**Signature**

```ts
export declare const hole: <T>() => T
```

Added in v1.0.0

## identity

**Signature**

```ts
export declare const identity: <A>(a: A) => A
```

Added in v1.0.0

## pipe

Pipes the value of an expression into a pipeline of functions.

**Signature**

```ts
export declare function pipe<A>(a: A): A
export declare function pipe<A, B>(a: A, ab: (a: A) => B): B
export declare function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export declare function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export declare function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export declare function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export declare function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export declare function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export declare function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K
): K
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L
): L
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M
): M
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N
): N
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O
): O
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P
): P
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q
): Q
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R
): R
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S
): S
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T
): T
```

**Example**

```ts
import { pipe } from '@fp-ts/core/Function'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

assert.deepStrictEqual(pipe('aaa', len, double), 6)
```

Added in v1.0.0

## tupled

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

**Signature**

```ts
export declare const tupled: <A extends readonly unknown[], B>(f: (...a: A) => B) => (a: A) => B
```

**Example**

```ts
import { tupled } from '@fp-ts/core/Function'

const add = tupled((x: number, y: number): number => x + y)

assert.deepStrictEqual(add([1, 2]), 3)
```

Added in v1.0.0

## unsafeCoerce

**Signature**

```ts
export declare const unsafeCoerce: <A, B>(a: A) => B
```

Added in v1.0.0

## untupled

Inverse function of `tupled`

**Signature**

```ts
export declare const untupled: <A extends readonly unknown[], B>(f: (a: A) => B) => (...a: A) => B
```

Added in v1.0.0
