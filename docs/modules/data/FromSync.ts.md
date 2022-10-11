---
title: data/FromSync.ts
nav_order: 15
parent: Modules
---

## FromSync overview

Lift a computation from the `Sync` effect.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [lifting](#lifting)
  - [liftSync](#liftsync)
- [logging](#logging)
  - [log](#log)
- [model](#model)
  - [FromSync (interface)](#fromsync-interface)
- [sequencing](#sequencing)
  - [flatMapSync](#flatmapsync)

---

# lifting

## liftSync

**Signature**

```ts
export declare const liftSync: <F extends any>(
  FromSync: FromSync<F>
) => <A extends readonly unknown[], B>(f: (...a: A) => any) => <S>(...a: A) => any
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: <M extends any>(FromSync: FromSync<M>) => <A extends readonly unknown[], S>(...x: A) => any
```

Added in v3.0.0

# model

## FromSync (interface)

**Signature**

```ts
export interface FromSync<F extends TypeLambda> extends TypeClass<F> {
  readonly fromSync: <A, S>(fa: Sync<A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# sequencing

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <M extends any>(
  FromSync: FromSync<M>,
  M: any
) => <A, B>(f: (a: A) => any) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0
