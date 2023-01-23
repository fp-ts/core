---
title: ReadonlyRecord.ts
nav_order: 13
parent: Modules
---

## ReadonlyRecord overview

This module provides utility functions for working with records in TypeScript.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [getters](#getters)
  - [get](#get)
- [models](#models)
  - [ReadonlyRecord (interface)](#readonlyrecord-interface)
- [utils](#utils)
  - [modifyOption](#modifyoption)
  - [replaceOption](#replaceoption)

---

# getters

## get

This function provides a safe way to read a value at a particular key from a record.

**Signature**

```ts
export declare const get: (key: string) => <A>(self: ReadonlyRecord<A>) => any
```

Added in v1.0.0

# models

## ReadonlyRecord (interface)

**Signature**

```ts
export interface ReadonlyRecord<A> {
  readonly [x: string]: A
}
```

Added in v1.0.0

# utils

## modifyOption

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

**Signature**

```ts
export declare const modifyOption: <A, B>(key: string, f: (a: A) => B) => (self: ReadonlyRecord<A>) => any
```

Added in v1.0.0

## replaceOption

**Signature**

```ts
export declare const replaceOption: <B>(key: string, b: B) => <A>(self: ReadonlyRecord<A>) => any
```

Added in v1.0.0
