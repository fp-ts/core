| Typeclass                | member(s)                                 | extends                  |
| ------------------------ | ----------------------------------------- | ------------------------ |
| **Alternative**          | `counit`, `coproductAll`                  | **Coproduct**            |
| **Applicative**          | `productAll`                              | **Product**              |
| **Bifunctor**            | `mapBoth`                                 |                          |
| **Bounded**              | `maximum`, `minimum`                      | **Sortable**             |
| **Category**             | `id`                                      | **Composable**           |
| **Chainable**            |                                           | **Functor**, **FlatMap** |
| **Comonad**              | `extract`                                 | **Extendable**           |
| **Composable**           | `compose`                                 |                          |
| **Contravariant**        | `contramap`                               |                          |
| **Extendable**           | `extend`                                  | **Functor**              |
| **Coproduct**            | `coproduct`, `coproductMany`              | **Functor**              |
| **FlatMap**              | `flatMap`                                 |                          |
| **Foldable**             | `reduce`, `reduceRight`                   |                          |
| **FoldableWithIndex**    | `reduceWithIndex`, `reduceRightWithIndex` |                          |
| **Functor**              | `map`                                     |                          |
| **Invariant**            | `imap`                                    |                          |
| **Monad**                |                                           | **Succeed**, **FlatMap** |
| **Monoid**               | `empty`, `combineAll`                     | **Semigroup**            |
| **Of**                   | `of`                                      |                          |
| **Pointed**              |                                           | **Functor**, **Of**      |
| **Product**              | `product`, `productMany`                  | **Functor**              |
| **Semigroup**            | `combine`, `combineMany`                  |                          |
| **Sortable**             | `compare`                                 |                          |
| **Traversable**          | `traverse`                                | **Functor**              |
| **TraversableWithIndex** | `traverseWihtIndex`                       | **FunctorWithIndex**     |
