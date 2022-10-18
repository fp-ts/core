| Typeclass                | member(s)                                 | extends                  |
| ------------------------ | ----------------------------------------- | ------------------------ |
| **Bifunctor**            | `mapBoth`                                 |                          |
| **Bounded**              | `maximum`, `minimum`                      | **Sortable**             |
| **Category**             | `id`                                      | **Composable**           |
| **CategoryKind**         | `idKind`                                  | **ComposableKind**       |
| **Comonad**              | `extract`                                 | **Extendable**           |
| **Composable**           | `compose`                                 |                          |
| **ComposableKind**       | `composeKind`                             |                          |
| **Contravariant**        | `contramap`                               |                          |
| **Extendable**           | `extend`                                  | **Functor**              |
| **Coproduct**            | `coproduct`, `coproductMany`              | **Functor**              |
| **CoproductWithCounit**  | `counit`, `coproductAll`                  | **Coproduct**            |
| **FlatMap**              | `flatMap`                                 | **Functor**              |
| **Foldable**             | `reduce`, `reduceRight`                   |                          |
| **FoldableWithIndex**    | `reduceWithIndex`, `reduceRightWithIndex` |                          |
| **Functor**              | `map`                                     |                          |
| **Invariant**            | `imap`                                    |                          |
| **Monad**                |                                           | **Succeed**, **FlatMap** |
| **Monoid**               | `empty`, `combineAll`                     | **Semigroup**            |
| **Of**                   | `of`                                      |                          |
| **Pointed**              |                                           | **Functor**, **Of**      |
| **Product**              | `product`, `productMany`                  | **Functor**              |
| **ProductWithUnit**      | `productAll`                              | **Product**              |
| **Semigroup**            | `combine`, `combineMany`                  |                          |
| **Sortable**             | `compare`                                 |                          |
| **Traversable**          | `traverse`                                |                          |
| **TraversableWithIndex** | `traverseWihtIndex`                       |                          |
