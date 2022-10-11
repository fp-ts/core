---
title: data/FromReader.ts
nav_order: 10
parent: Modules
---

## FromReader overview

Lift a computation from the `Reader` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [lifting](#lifting)
  - [liftReader](#liftreader)
- [model](#model)
  - [FromReader (interface)](#fromreader-interface)
- [sequencing](#sequencing)
  - [flatMapReader](#flatmapreader)

---

# constructors

## ask

**Signature**

```ts
export declare function ask<F extends TypeLambda>(F: FromReader<F>): <S, R>() => Kind<F, S, R, never, never, R>
```

Added in v3.0.0

## asks

**Signature**

```ts
export declare function asks<F extends TypeLambda>(
  F: FromReader<F>
): <R, A, S>(f: (r: R) => A) => Kind<F, S, R, never, never, A>
```

Added in v3.0.0

# lifting

## liftReader

**Signature**

```ts
export declare const liftReader: <F extends any>(
  F: FromReader<F>
) => <A extends readonly unknown[], R, B>(f: (...a: A) => any) => <S>(...a: A) => any
```

Added in v3.0.0

# model

## FromReader (interface)

**Signature**

```ts
export interface FromReader<F extends TypeLambda> extends TypeClass<F> {
  readonly fromReader: <R, A, S>(fa: Reader<R, A>) => Kind<F, S, R, never, never, A>
}
```

Added in v3.0.0

# sequencing

## flatMapReader

**Signature**

```ts
export declare const flatMapReader: <M extends any>(
  F: FromReader<M>,
  M: any
) => <A, R2, B>(f: (a: A) => any) => <S, R1, O, E>(self: any) => any
```

Added in v3.0.0
