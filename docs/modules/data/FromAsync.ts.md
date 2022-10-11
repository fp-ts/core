---
title: data/FromAsync.ts
nav_order: 8
parent: Modules
---

## FromAsync overview

Lift a computation from the `Async` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [sleep](#sleep)
- [lifting](#lifting)
  - [liftAsync](#liftasync)
- [model](#model)
  - [FromAsync (interface)](#fromasync-interface)
- [sequencing](#sequencing)
  - [flatMapAsync](#flatmapasync)
- [utils](#utils)
  - [delay](#delay)

---

# constructors

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: <F extends any>(FromAsync: FromAsync<F>) => <S>(duration: number) => any
```

Added in v3.0.0

# lifting

## liftAsync

**Signature**

```ts
export declare const liftAsync: <F extends any>(
  FromAsync: FromAsync<F>
) => <A extends readonly unknown[], B>(f: (...a: A) => any) => <S>(...a: A) => any
```

Added in v3.0.0

# model

## FromAsync (interface)

**Signature**

```ts
export interface FromAsync<F extends TypeLambda> extends FromSync<F> {
  readonly fromAsync: <A, S>(fa: Async<A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# sequencing

## flatMapAsync

**Signature**

```ts
export declare const flatMapAsync: <F extends any>(
  FromAsync: FromAsync<F>,
  Flattenable: any
) => <A, B>(f: (a: A) => any) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

# utils

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: <F extends any>(
  FromAsync: FromAsync<F>,
  Flattenable: any
) => (duration: number) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0
