---
title: OrElse.ts
nav_order: 26
parent: Modules
---

## OrElse overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [OrElse (interface)](#orelse-interface)

---

# model

## OrElse (interface)

Returns an effect that runs the first effect and in case of failure, runs
each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export interface OrElse<F extends TypeLambda> extends TypeClass<F> {
  readonly orElse: <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>
  readonly firstSuccessOf: <S, R1, O1, E1, A, R2, O2, E2, B>(
    startWith: Kind<F, S, R1, O1, E1, A>,
    collection: Iterable<Kind<F, S, R2, O2, E2, B>>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>
}
```

Added in v3.0.0
