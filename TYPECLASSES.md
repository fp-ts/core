| Typeclass                | member(s)                                 | extends                    |
| ------------------------ | ----------------------------------------- | -------------------------- |
| **Alternative**          | `counit`, `coproductAll`                  | **Coproduct**              |
| **Applicative**          | `unit`, `productAll`                      | **Product**                |
| **Bicovariant**          | `mapBoth`                                 |                            |
| **Bounded**              | `maximum`, `minimum`                      | **Sortable**               |
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
| **Invariant**            | `invmap`                                  |                            |
| **Monad**                |                                           | **Pointed**, **FlatMap**   |
| **Monoid**               | `empty`, `combineAll`                     | **Semigroup**              |
| **Of**                   | `of`                                      |                            |
| **Pointed**              |                                           | **Covariant**, **Of**      |
| **Product**              | `product`, `productMany`                  | **Covariant**              |
| **Semigroup**            | `combine`, `combineMany`                  |                            |
| **TotalOrder**           | `compare`                                 |                            |
| **Traversable**          | `traverse`                                |                            |
| **TraversableWithIndex** | `traverseWihtIndex`                       |                            |
