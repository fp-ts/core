---
title: typeclasses/FromOption.ts
nav_order: 59
parent: Modules
---

## FromOption overview

The `FromResult` type class represents those data types which support untyped errors.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [conversions](#conversions)
  - [fromNullable](#fromnullable)
- [lifting](#lifting)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
- [model](#model)
  - [FromOption (interface)](#fromoption-interface)
- [sequencing](#sequencing)
  - [flatMapNullable](#flatmapnullable)

---

# conversions

## fromNullable

**Signature**

```ts
export declare const fromNullable: <F extends any>(F: FromOption<F>) => <A, S>(a: A) => any
```

Added in v3.0.0

# lifting

## liftNullable

**Signature**

```ts
export declare const liftNullable: <F extends any>(
  F: FromOption<F>
) => <A extends readonly unknown[], B>(f: (...a: A) => B | null | undefined) => <S, R, O, E>(...a: A) => any
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <F extends any>(
  F: FromOption<F>
) => <A extends readonly unknown[], B>(f: (...a: A) => any) => <S>(...a: A) => any
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: <F extends any>(
  F: FromOption<F>
) => {
  <C extends A, B extends A, A = C>(refinement: any): <S>(c: C) => any
  <B extends A, A = B>(predicate: any): <S>(b: B) => any
}
```

Added in v3.0.0

# model

## FromOption (interface)

**Signature**

```ts
export interface FromOption<F extends TypeLambda> extends TypeClass<F> {
  readonly fromOption: <A, S>(fa: Option<A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# sequencing

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <F extends any>(
  F: FromOption<F>,
  C: any
) => <A, B>(f: (a: A) => B | null | undefined) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0
