---
title: typeclasses/FromThese.ts
nav_order: 63
parent: Modules
---

## FromThese overview

The `FromThese` type class represents those data types which support errors and warnings.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [lifting](#lifting)
  - [liftThese](#liftthese)
- [model](#model)
  - [FromThese (interface)](#fromthese-interface)

---

# lifting

## liftThese

**Signature**

```ts
export declare const liftThese: <F extends any>(
  F: FromThese<F>
) => <A extends readonly unknown[], E, B>(f: (...a: A) => any) => <S>(...a: A) => any
```

Added in v3.0.0

# model

## FromThese (interface)

**Signature**

```ts
export interface FromThese<F extends TypeLambda> extends TypeClass<F> {
  readonly fromThese: <E, A, S>(fa: These<E, A>) => Kind<F, S, unknown, never, E, A>
}
```

Added in v3.0.0
