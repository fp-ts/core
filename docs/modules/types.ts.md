---
title: types.ts
nav_order: 29
parent: Modules
---

## types overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [UnionToIntersection (type alias)](#uniontointersection-type-alias)
  - [UnionToTuple (type alias)](#uniontotuple-type-alias)

---

# utils

## UnionToIntersection (type alias)

**Signature**

```ts
export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never
```

Added in v3.0.0

## UnionToTuple (type alias)

**Signature**

```ts
export type UnionToTuple<Union> = UnionToIntersection<
  Union extends unknown ? (distributed: Union) => void : never
> extends (merged: infer Intersection) => void
  ? readonly [...UnionToTuple<Exclude<Union, Intersection>>, Intersection]
  : []
```

Added in v3.0.0
