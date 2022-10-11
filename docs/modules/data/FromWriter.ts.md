---
title: data/FromWriter.ts
nav_order: 15
parent: Modules
---

## FromWriter overview

The `FromWriter` type class represents those data types which support accumulators.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [lifting](#lifting)
  - [liftWriter](#liftwriter)
- [model](#model)
  - [FromWriter (interface)](#fromwriter-interface)

---

# lifting

## liftWriter

**Signature**

```ts
export declare const liftWriter: <F extends any>(
  F: FromWriter<F>
) => <A extends readonly unknown[], E, B>(f: (...a: A) => any) => <S>(...a: A) => any
```

Added in v3.0.0

# model

## FromWriter (interface)

**Signature**

```ts
export interface FromWriter<F extends TypeLambda> extends TypeClass<F> {
  readonly fromWriter: <E, A, S>(fa: Writer<E, A>) => Kind<F, S, unknown, never, E, A>
}
```

Added in v3.0.0
