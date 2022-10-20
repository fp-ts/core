# Introduction

The functional abstractions in `@fp-ts/core` can be broadly divided into two categories.

- Abstractions For Concrete Types - These abstractions define properties of concrete types, such as `number` and `string`, as well as ways of combining those values.
- Abstractions For Parameterized Types - These abstractions define properties of parameterized types such as `ReadonlyArray` and `Option` and ways of combining them.

# Concrete Types

|                 | member(s)                | extends         |
| --------------- | ------------------------ | --------------- |
| **Associative** | `combine`, `combineMany` |                 |
| **Monoid**      | `unit`, `combineAll`     | **Associative** |
| **TotalOrder**  | `compare`                |                 |

# Parameterized Types

|                           | member(s)                                   | extends                    |
| ------------------------- | ------------------------------------------- | -------------------------- |
| **Alternative**           | `zero`, `coproductAll`                      | **Coproduct**              |
| **Applicative**           | `productAll`                                | **Product**, **Of**        |
| **Associative**           | `combine`, `combineMany`                    |                            |
| **Bicovariant**           | `bimap`                                     |                            |
| **BoundedTotalOrder**     | `maximum`, `minimum`                        | **Sortable**               |
| **Category**              | `identity`                                  | **Composable**             |
| **Chainable**             |                                             | **Covariant**, **FlatMap** |
| **Comonad**               | `extract`                                   | **Extendable**             |
| **Compactable**           | `compact`                                   |                            |
| **Composable**            | `compose`                                   |                            |
| **Contravariant**         | `contramap`                                 |                            |
| **Coproduct**             | `coproduct`, `coproductMany`                | **Covariant**              |
| **Covariant**             | `map`                                       |                            |
| **CovariantWithIndex**    | `mapWithIndex`                              |                            |
| **Extendable**            | `extend`                                    | **Covariant**              |
| **Filterable**            | `filterMap`                                 |                            |
| **FilterableWithIndex**   | `filterMapWithIndex`                        |                            |
| **FlatMap**               | `flatMap`                                   |                            |
| **Foldable**              | `reduce`, `reduceRight`                     |                            |
| **FoldableWithIndex**     | `reduceWithIndex`, `reduceRightWithIndex`   |                            |
| **Invariant**             | `imap`                                      |                            |
| **Monad**                 |                                             | **Pointed**, **FlatMap**   |
| **Monoid**                | `unit`, `combineAll`                        | **Associative**            |
| **Of**                    | `of`                                        |                            |
| **Pointed**               |                                             | **Covariant**, **Of**      |
| **Product**               | `product`, `productMany`                    | **Covariant**              |
| **TotalOrder**            | `compare`                                   |                            |
| **Traversable**           | `traverse`                                  |                            |
| **TraversableFilterable** | `traversePartitionMap`, `traverseFilterMap` |                            |
| **TraversableWithIndex**  | `traverseWihtIndex`                         |                            |
