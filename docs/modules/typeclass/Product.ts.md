---
title: typeclass/Product.ts
nav_order: 38
parent: Modules
---

## Product overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Product (interface)](#product-interface)
- [utils](#utils)
  - [struct](#struct)
  - [tuple](#tuple)

---

# type class

## Product (interface)

**Signature**

```ts
export interface Product<F extends TypeLambda> extends SemiProduct<F>, Of<F> {
  readonly productAll: <R, O, E, A>(collection: Iterable<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Array<A>>
}
```

Added in v1.0.0

# utils

## struct

**Signature**

```ts
export declare const struct: <F extends any>(
  F: Product<F>
) => <R extends { readonly [x: string]: any }>(fields: R) => any
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <F extends any>(F: Product<F>) => <T extends readonly any[]>(...components: T) => any
```

Added in v1.0.0
