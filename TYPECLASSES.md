| Typeclass              | member(s)                                 | extends                  |
| ---------------------- | ----------------------------------------- | ------------------------ |
| `Bifunctor             | `mapBoth`                                 |                          |
| `Bounded               | `maximum`, `minimum`                      | `Sortable`               |
| `Category `            | `id`                                      | `Composable`             |
| `CategoryKind`         | `idKind`                                  | `ComposableKind`         |
| `Comonad`              | `extract`                                 | `Extendable`             |
| `Composable`           | `compose`                                 |                          |
| `ComposableKind`       | `composeKind`                             |                          |
| `Contravariant`        | `contramap`                               |                          |
| `Extendable`           | `extend`                                  | `Functor`                |
| `FlatMap`              | `flatMap`                                 | `Functor`                |
| `Foldable`             | `reduce`, `reduceRight`                   |                          |
| `FoldableWithIndex`    | `reduceWithIndex`, `reduceRightWithIndex` |                          |
| `Functor`              | `map`                                     |                          |
| `Invariant`            | `imap`                                    |                          |
| `Monad`                |                                           | `Succeed`, `FlatMap`     |
| `Monoid`               | `empty`, `combineAll`                     | `Semigroup`              |
| `Monoidal`             | `zipAllWith`                              | `Semigroupal`, `Succeed` |
| `MonoidKind`           | `emptyKind`, `combineKindAll`             | `SemigroupKind`          |
| `Semigroup`            | `combine`, `combineMany`                  |                          |
| `Semigroupal`          | `zipWith`, `zipManyWith`                  | `Functor`                |
| `SemigroupKind`        | `combineKind`, `combineKindMany`          | `Functor`                |
| `Show`                 | `show`                                    |                          |
| `Sortable`             | `compare`                                 |                          |
| `Succeed`              | `succeed`                                 |                          |
| `Traversable`          | `traverse`                                |                          |
| `TraversableWithIndex` | `traverseWihtIndex`                       |                          |
