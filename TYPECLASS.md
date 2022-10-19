| Typeclass                 | member(s)                                   | extends                    |
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
