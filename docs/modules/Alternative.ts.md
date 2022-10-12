---
title: Alternative.ts
nav_order: 2
parent: Modules
---

## Alternative overview

TODO: description

`Alternative` instances should satisfy the following laws in addition to the `Alt` laws:

1. Left identity: `none |> orElse(fa) <-> fa`
2. Right identity: `fa |> orElse(none) <-> fa`
3. Annihilation1: `none |> map(f) <-> none`
4. Distributivity: `fab |> orElse(gab) |> ap(fa) <-> fab |> ap(fa) |> orElse(gab |> A.ap(fa))`
5. Annihilation2: `none |> ap(fa) <-> none`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Alternative (interface)](#alternative-interface)
- [utils](#utils)
  - [firstSuccessOf](#firstsuccessof)

---

# model

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F extends TypeLambda> extends Alt<F> {
  readonly none: <S>() => Kind<F, S, unknown, never, never, never>
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
