---
title: Contravariant.ts
nav_order: 8
parent: Modules
---

## Contravariant overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Contravariant (interface)](#contravariant-interface)

---

# type class

## Contravariant (interface)

**Signature**

```ts
export interface Contravariant<F extends TypeLambda> extends TypeClass<F> {
  readonly contramap: <Q, R>(f: (q: Q) => R) => <S, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, Q, O, E, A>
}
```

Added in v1.0.0
