---
title: internal/Either.ts
nav_order: 5
parent: Modules
---

## Either overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getLeft](#getleft)
  - [getRight](#getright)
  - [isLeft](#isleft)
  - [isRight](#isright)
  - [left](#left)
  - [right](#right)

---

# utils

## getLeft

**Signature**

```ts
export declare const getLeft: <E, A>(self: any) => any
```

Added in v1.0.0

## getRight

**Signature**

```ts
export declare const getRight: <E, A>(self: any) => any
```

Added in v1.0.0

## isLeft

**Signature**

```ts
export declare const isLeft: <E, A>(self: any) => self is any
```

Added in v1.0.0

## isRight

**Signature**

```ts
export declare const isRight: <E, A>(self: any) => self is any
```

Added in v1.0.0

## left

**Signature**

```ts
export declare const left: <E>(e: E) => any
```

Added in v1.0.0

## right

**Signature**

```ts
export declare const right: <A>(a: A) => any
```

Added in v1.0.0
