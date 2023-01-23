<h3 align="center">
  <a href="https://fp-ts.github.io/core/">
    <img src="./docs/fp-ts-logo.png">
  </a>
</h3>

<p align="center">
Functional programming in TypeScript
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fp-ts/core">
    <img src="https://img.shields.io/npm/dm/@fp-ts/core.svg" alt="npm downloads" height="20">
  </a>
</p>

# Typed functional programming in TypeScript

This project represents the next major iteration of [`fp-ts`](https://github.com/gcanti/fp-ts) and it's objective is a reconciliation with [`@effect`](https://github.com/Effect-TS) in order to unify the ecosystems.

The [`@effect`](https://github.com/Effect-TS) project will reduce it's scope to simply being an effect system and will delegate to `fp-ts org` all the lower level abstractions such as typeclasses and common data structures.

The objective of the `fp-ts org` in github and in npm (`@fp-ts`) is to simplify structure and management of the project, have smaller and better scoped packages.

Our "current" idea (that is well open for changes) is for `fp-ts org` to have:

- The [`@fp-ts/core`](https://github.com/fp-ts/core) library features a new implementation of the Higher Kinded Type (HKT) pattern, including common typeclasses such as `Monad` and widely-used data types like `Option`, `Either`, and `ReadonlyArray`
- [`@fp-ts/schema`](https://github.com/fp-ts/schema) offers schema validation with static type inference, including decoders for data structures in `@fp-ts/core` and `@effect/data`
- [`@fp-ts/optic`](https://github.com/fp-ts/optic) provides optics for structures in both `@fp-ts/core` and `@effect/data`

For those using [`fp-ts`](https://github.com/gcanti/fp-ts) v2 and its ecosystem, roughly these are the equivalents:

- [`fp-ts`](https://github.com/gcanti/fp-ts) -> [`@fp-ts/core`](https://github.com/fp-ts/core) + [`@effect/*` packages](https://github.com/Effect-TS)
- [`io-ts`](https://github.com/gcanti/io-ts) -> [`@fp-ts/schema`](https://github.com/fp-ts/schema)
- [`monocle-ts`](https://github.com/gcanti/monocle-ts) -> [`@fp-ts/optic`](https://github.com/fp-ts/optic)

Note that `@fp-ts/core` will not contain any effect system (e.g. `Task`, `TaskEither`, `ReaderTaskEither`) since the handling of effects is entirely delegated to the packages contained in [`@effect/*`](https://github.com/Effect-TS).

# Installation

To install the **alpha** version:

```
npm install @fp-ts/core
```

# Documentation

- [Typeclass overview](./typeclass.md)
- [Data overview](./data.md)
- [The `Option` data type](./Option.md)
- [The `Either` data type](./Either.md)
- [API Reference](https://fp-ts.github.io/core/)

# License

The MIT License (MIT)
