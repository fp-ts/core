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

This project represents the next major iteration of [`fp-ts`](https://github.com/gcanti/fp-ts) and it's objective is a reconciliation with [`Effect`](https://github.com/Effect-TS) in order to unify the ecosystems.

The [`Effect`](https://github.com/Effect-TS) project will reduce it's scope to simply being an effect system and will delegate to `fp-ts org` all the lower level abstractions such as typeclasses and common data structures.

The objective of the `fp-ts org` in github and in npm (`@fp-ts`) is to simplify structure and management of the project, have smaller and better scoped packages.

Our "current" idea (that is well open for changes) is for `fp-ts org` to have:

- `@fp-ts/core` with the new `HKT` implementation and the most common typeclasses such as `Monad`
- `@fp-ts/data` with `Result` (aka Either), `ReadonlyArray`, `List` and the most common data structures together with data related typeclasses (i.e. `Compactable`, etc)
- `@fp-ts/optics` with an optic implementation that will provide also optics for structures in `@fp-ts/data`
- `@fp-ts/codec` with a concrete codec such as `io-ts` again for all the structures in `@fp-ts/data`

And for [`Effect`](https://github.com/Effect-TS) to have:

- `@effect/core` with the effect system
- `@effect/query` with the query impl
- `@effect/*` every other effect based impl

Note that [`Effect`](https://github.com/Effect-TS) will not have base structures like `Option` / `Result` / `List` and typeclasses like `Monad` / `Functor` and [`fp-ts`](https://github.com/fp-ts) will not have effect execution modules like `Task` / `IO` as both projects are made to be the same ecosystem and each answer a specific set of needs in the best way possible.

# Installation

To install the **pre-alpha** version:

```
npm install @fp-ts/core
```

# Documentation

- [API Reference](https://fp-ts.github.io/core/)

# License

The MIT License (MIT)
