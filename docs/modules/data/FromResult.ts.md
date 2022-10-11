---
title: data/FromResult.ts
nav_order: 11
parent: Modules
---

## FromResult overview

The `FromResult` type class represents those data types which support typed errors.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [conversions](#conversions)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
- [filtering](#filtering)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [lifting](#lifting)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftResult](#liftresult)
- [model](#model)
  - [FromResult (interface)](#fromresult-interface)
- [sequencing](#sequencing)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapResult](#flatmapresult)

---

# conversions

## fromNullable

**Signature**

```ts
export declare const fromNullable: <F extends any>(
  FromResult: FromResult<F>
) => <E>(onNullable: E) => <A, S>(a: A) => any
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <F extends any>(
  FromResult: FromResult<F>
) => <E>(onNone: E) => <A, S>(self: any) => any
```

Added in v3.0.0

# filtering

## filter

**Signature**

```ts
export declare const filter: <F extends any>(
  FromResult: FromResult<F>,
  Flattenable: any
) => {
  <C extends A, B extends A, E2, A = C>(refinement: any, onFalse: E2): <S, R, O, E1>(self: any) => any
  <B extends A, E2, A = B>(predicate: any, onFalse: E2): <S, R, O, E1>(self: any) => any
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <F extends any>(
  FromResult: FromResult<F>,
  Flattenable: any
) => <A, B, E>(f: (a: A) => any, onNone: E) => <S, R, O>(self: any) => any
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends any>(
  FromResult: FromResult<F>,
  Flattenable: any
) => {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): <S, R, O>(self: any) => readonly [any, any]
  <B extends A, E, A = B>(predicate: any, onFalse: E): <S, R, O>(self: any) => readonly [any, any]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <F extends any>(
  FromResult: FromResult<F>,
  Flattenable: any
) => <A, B, C, E>(f: (a: A) => any, onEmpty: E) => <S, R, O>(self: any) => readonly [any, any]
```

Added in v3.0.0

# lifting

## liftNullable

**Signature**

```ts
export declare const liftNullable: <F extends any>(
  FromResult: FromResult<F>
) => <A extends readonly unknown[], B, E>(f: (...a: A) => B | null | undefined, onNullable: E) => <S>(...a: A) => any
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <F extends any>(
  FromResult: FromResult<F>
) => <A extends readonly unknown[], B, E>(f: (...a: A) => any, onNone: E) => <S>(...a: A) => any
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: <F extends any>(
  FromResult: FromResult<F>
) => {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): <S>(c: C) => any
  <B extends A, E, A = B>(predicate: any, onFalse: E): <S>(b: B) => any
}
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <F extends any>(
  FromResult: FromResult<F>
) => <A extends readonly unknown[], E, B>(f: (...a: A) => any) => <S>(...a: A) => any
```

Added in v3.0.0

# model

## FromResult (interface)

**Signature**

```ts
export interface FromResult<F extends TypeLambda> extends TypeClass<F> {
  readonly fromResult: <E, A, S>(fa: Result<E, A>) => Kind<F, S, unknown, never, E, A>
}
```

Added in v3.0.0

# sequencing

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <M extends any>(
  FromResult: FromResult<M>,
  Flattenable: any
) => <A, B, E2>(f: (a: A) => B | null | undefined, onNullable: E2) => <S, R, O, E1>(self: any) => any
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <F extends any>(
  FromResult: FromResult<F>,
  Flattenable: any
) => <A, B, E2>(f: (a: A) => any, onNone: E2) => <S, R, O, E1>(self: any) => any
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <M extends any>(
  FromResult: FromResult<M>,
  Flattenable: any
) => <A, E2, B>(f: (a: A) => any) => <S, R, O, E1>(self: any) => any
```

Added in v3.0.0
