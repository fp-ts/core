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
| **Alt**                   | `coproductMany`                               | **SemigroupalCoproduct**, **Covariant** |
| **Alternative**           | `zero`<br>`coproductAll`                      | **MonoidalCoproduct**, **Covariant**    |
| **Applicative**           | `productAll`                                  | **MonoidalProduct**, **Pointed**        |
| **Apply**                 | `productMany`                                 | **SemigroupalProduct**, **Covariant**   |
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
| **Monoid**                | `unit`<br>`combineAll`                        | **Semigroup**                           |
| **MonoidalCoproduct**     | `zero`<br>`coproductAll`                      |                                         |
| **MonoidalProduct**       | `unit`<br>`productAll`                        |                                         |
| **Of**                    | `of`                                          |                                         |
| **Pointed**               |                                               | **Covariant**, **Of**                   |
| **Semigroup**             | `combine`<br>`combineMany`                    |                                         |
| **SemigroupalCoproduct**  | `coproduct`                                   |                                         |
| **SemigroupalProduct**    | `product`<br>`productMany`                    |                                         |
| **TotalOrder**            | `compare`                                     |                                         |
| **Traversable**           | `traverse`                                    |                                         |
| **TraversableFilterable** | `traversePartitionMap`<br>`traverseFilterMap` |                                         |
| **TraversableWithIndex**  | `traverseWihtIndex`                           |                                         |

## Graph

```
digraph G {
    "Alt" -> "SemigroupalCoproduct"
    "Alt" -> "Covariant"
    "Alternative" -> "MonoidalCoproduct"
    "Alternative" -> "Covariant"
    "Applicative" -> "MonoidalProduct"
    "Applicative" -> "Pointed"
    "Apply" -> "SemigroupalProduct"
    "Apply" -> "Covariant"
    "BoundedTotalOrder" -> "TotalOrder"
    "Category" -> "Composable"
    "Chainable" -> "Covariant"
    "Chainable" -> "FlatMap"
    "Comonad" -> "Extendable"
    "Extendable" -> "Covariant"
    "Monad" -> "Pointed"
    "Monad" -> "FlatMap"
    "Monoid" -> "Semigroup"
    "Pointed" -> "Of"
    "Pointed" -> "Covariant"
    "MonoidalProduct" -> "SemigroupalProduct"
    "MonoidalCoproduct" -> "SemigroupalCoproduct"
}
```
