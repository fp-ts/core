---
title: FirstSuccessOf.ts
nav_order: 13
parent: Modules
---

## FirstSuccessOf overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [FirstSuccessOf (interface)](#firstsuccessof-interface)

---

# type class

## FirstSuccessOf (interface)

**Signature**

```ts
export interface FirstSuccessOf<F extends TypeLambda> extends TypeClass<F> {
  readonly firstSuccessOf: <S, R1, O1, E1, A, Tail extends ReadonlyArray<Kind<F, S, any, any, any, any>>>(
    head: Kind<F, S, R1, O1, E1, A>,
    ...tail: Tail
  ) => Kind<
    F,
    S,
    R1 & ([Tail[number]] extends [Kind<F, S, infer R, any, any, any>] ? R : never),
    O1 | ([Tail[number]] extends [Kind<F, S, any, infer O2, any, any>] ? O2 : never),
    E1 | ([Tail[number]] extends [Kind<F, S, any, any, infer E2, any>] ? E2 : never),
    A | ([Tail[number]] extends [Kind<F, S, any, any, any, infer B>] ? B : never)
  >

  readonly firstSuccessOfIterable: <S, R1, O1, E1, A1, Tail extends Kind<F, S, any, any, any, any>>(
    head: Kind<F, S, R1, O1, E1, A1>,
    tail: Iterable<Tail>
  ) => Kind<
    F,
    S,
    R1 & ([Tail] extends [Kind<F, S, infer R, any, any, any>] ? R : never),
    O1 | ([Tail] extends [Kind<F, S, any, infer O, any, any>] ? O : never),
    E1 | ([Tail] extends [Kind<F, S, any, any, infer E, any>] ? E : never),
    A1 | ([Tail] extends [Kind<F, S, any, any, any, infer A>] ? A : never)
  >
}
```

Added in v3.0.0
