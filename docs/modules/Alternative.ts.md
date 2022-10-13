---
title: Alternative.ts
nav_order: 1
parent: Modules
---

## Alternative overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Alternative (interface)](#alternative-interface)
- [utils](#utils)
  - [firstSuccessOf](#firstsuccessof)

---

# type class

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F extends TypeLambda> extends OrElse<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly never: <S>() => Kind<F, S, unknown, never, never, never>
}
```

Added in v3.0.0

# utils

## firstSuccessOf

Returns an effect that runs each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export declare const firstSuccessOf: <G extends any>(
  Alternative: Alternative<G>
) => <S, R, O, E, A>(collection: Iterable<any>) => any
```

Added in v3.0.0
