# Introduction

The functional abstractions in `@fp-ts/core` can be broadly divided into two categories.

- Abstractions For Concrete Types - These abstractions define properties of concrete types, such as `number` and `string`, as well as ways of combining those values.
- Abstractions For Parameterized Types - These abstractions define properties of parameterized types such as `ReadonlyArray` and `Option` and ways of combining them.

# Concrete Types

|                 | member(s)                  | extends         |
| --------------- | -------------------------- | --------------- |
| **Associative** | `combine`<br>`combineMany` |                 |
| **Monoid**      | `unit`<br>`combineAll`     | **Associative** |
| **TotalOrder**  | `compare`                  |                 |

# Parameterized Types

|                           | member(s)                                     | extends                                 |
| ------------------------- | --------------------------------------------- | --------------------------------------- |
| **Alt**                   | `coproductMany`                               | **CoproductSemigroupal**, **Covariant** |
| **Alternative**           | `zero`<br>`coproductAll`                      | **Coproduct**                           |
| **Applicative**           | `productAll`                                  | **Product**, **Of**                     |
| **Apply**                 | `productMany`                                 | **ProductSemigroupal**, **Covariant**   |
| **Associative**           | `combine`<br>`combineMany`                    |                                         |
| **Bicovariant**           | `bimap`                                       |                                         |
| **BoundedTotalOrder**     | `maximum`<br>`minimum`                        | **Sortable**                            |
| **Category**              | `identity`                                    | **Composable**                          |
| **Chainable**             |                                               | **Covariant**, **FlatMap**              |
| **Comonad**               | `extract`                                     | **Extendable**                          |
| **Compactable**           | `compact`                                     |                                         |
| **Composable**            | `compose`                                     |                                         |
| **Contravariant**         | `contramap`                                   |                                         |
| **Covariant**             | `map`                                         |                                         |
| **CovariantWithIndex**    | `mapWithIndex`                                |                                         |
| **Extendable**            | `extend`                                      | **Covariant**                           |
| **Filterable**            | `filterMap`                                   |                                         |
| **FilterableWithIndex**   | `filterMapWithIndex`                          |                                         |
| **FlatMap**               | `flatMap`                                     |                                         |
| **Foldable**              | `reduce`<br>`reduceRight`                     |                                         |
| **FoldableWithIndex**     | `reduceWithIndex`<br>`reduceRightWithIndex`   |                                         |
| **Invariant**             | `imap`                                        |                                         |
| **Monad**                 |                                               | **Pointed**, **FlatMap**                |
| **Monoid**                | `unit`<br>`combineAll`                        | **Associative**                         |
| **Of**                    | `of`                                          |                                         |
| **Pointed**               |                                               | **Covariant**, **Of**                   |
| **SemigroupalCoproduct**  | `coproduct`                                   |                                         |
| **SemigroupalProduct**    | `product`                                     |                                         |
| **TotalOrder**            | `compare`                                     |                                         |
| **Traversable**           | `traverse`                                    |                                         |
| **TraversableFilterable** | `traversePartitionMap`<br>`traverseFilterMap` |                                         |
| **TraversableWithIndex**  | `traverseWihtIndex`                           |                                         |
