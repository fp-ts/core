| Typeclass                | member(s)                                 | extends                    |
| ------------------------ | ----------------------------------------- | -------------------------- |
| **Alternative**          | `counit`, `coproductAll`                  | **Coproduct**              |
| **Applicative**          | `unit`, `productAll`                      | **Product**                |
| **Associative**          | `combine`, `combineMany`                  |                            |
| **Bicovariant**          | `bimap`                                   |                            |
| **BoundedTotalOrder**    | `maximum`, `minimum`                      | **Sortable**               |
| **Category**             | `id`                                      | **Composable**             |
| **Chainable**            |                                           | **Covariant**, **FlatMap** |
| **Comonad**              | `extract`                                 | **Extendable**             |
| **Composable**           | `compose`                                 |                            |
| **Contravariant**        | `contramap`                               |                            |
| **Coproduct**            | `coproduct`, `coproductMany`              | **Covariant**              |
| **Covariant**            | `map`                                     |                            |
| **CovariantWithIndex**   | `mapWithIndex`                            |                            |
| **Extendable**           | `extend`                                  | **Covariant**              |
| **FlatMap**              | `flatMap`                                 |                            |
| **Foldable**             | `reduce`, `reduceRight`                   |                            |
| **FoldableWithIndex**    | `reduceWithIndex`, `reduceRightWithIndex` |                            |
| **Invariant**            | `imap`                                    |                            |
| **Monad**                |                                           | **Pointed**, **FlatMap**   |
| **Monoid**               | `unit`, `combineAll`                      | **Associative**            |
| **Of**                   | `of`                                      |                            |
| **Pointed**              |                                           | **Covariant**, **Of**      |
| **Product**              | `product`, `productMany`                  | **Covariant**              |
| **TotalOrder**           | `compare`                                 |                            |
| **Traversable**          | `traverse`                                |                            |
| **TraversableWithIndex** | `traverseWihtIndex`                       |                            |
