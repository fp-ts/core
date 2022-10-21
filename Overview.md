# Introduction

The functional abstractions in `@fp-ts/core` can be broadly divided into two categories.

- Abstractions For Concrete Types - These abstractions define properties of concrete types, such as `number` and `string`, as well as ways of combining those values.
- Abstractions For Parameterized Types - These abstractions define properties of parameterized types such as `ReadonlyArray` and `Option` and ways of combining them.

# Concrete Types

|                       | member(s)                  | extends        |
| --------------------- | -------------------------- | -------------- |
| **BoundedTotalOrder** | `maximum`<br>`minimum`     | **TotalOrder** |
| **Semigroup**         | `combine`<br>`combineMany` |                |
| **Monoid**            | `unit`<br>`combineAll`     | **Semigroup**  |
| **TotalOrder**        | `compare`                  |                |

**Graph**

```
digraph ConcreteTypes {
    "BoundedTotalOrder" -> "TotalOrder"
    "Monoid" -> "Semigroup"
}
```

# Parameterized Types

|                           | member(s)                                     | extends                                |
| ------------------------- | --------------------------------------------- | -------------------------------------- |
| **Alternative**           |                                               | **Coproduct**, **NonEmptyAlternative** |
| **Applicative**           |                                               | **Product**, **NonEmptyApplicative**   |
| **Bicovariant**           | `bimap`                                       |                                        |
| **Chainable**             |                                               | **Covariant**, **FlatMap**             |
| **Comonad**               | `extract`                                     | **Extendable**                         |
| **Compactable**           | `compact`                                     |                                        |
| **Contravariant**         | `contramap`                                   |                                        |
| **Coproduct**             | `zero`<br>`coproductAll`                      |                                        |
| **Covariant**             | `map`                                         |                                        |
| **CovariantWithIndex**    | `mapWithIndex`                                |                                        |
| **Extendable**            | `extend`                                      | **Covariant**                          |
| **Filterable**            | `filterMap`                                   |                                        |
| **FilterableWithIndex**   | `filterMapWithIndex`                          |                                        |
| **FlatMap**               | `flatMap`                                     |                                        |
| **Foldable**              | `reduce`<br>`reduceRight`                     |                                        |
| **FoldableWithIndex**     | `reduceWithIndex`<br>`reduceRightWithIndex`   |                                        |
| **Invariant**             | `imap`                                        |                                        |
| **Monad**                 |                                               | **Pointed**, **FlatMap**               |
| **Monoid**                | `empty`<br>`combineAll`                       | **Semigroup**                          |
| **NonEmptyAlternative**   |                                               | **NonEmptyCoproduct**, **Covariant**   |
| **NonEmptyApplicative**   |                                               | **NonEmptyProduct**, **Covariant**     |
| **NonEmptyCoproduct**     | `coproduct`<br>`coproductMany`                | **Invariant**                          |
| **NonEmptyProduct**       | `product`<br>`productMany`                    |                                        |
| **NonEmptyTraversable**   | `nonEmptyTraverse`                            |                                        |
| **Of**                    | `of`                                          |                                        |
| **Pointed**               |                                               | **Covariant**, **Of**                  |
| **Product**               | `productAll`                                  | **NonEmptyProduct**, **Of**            |
| **Semigroup**             | `combine`<br>`combineMany`                    |                                        |
| **Traversable**           | `traverse`                                    |                                        |
| **TraversableFilterable** | `traversePartitionMap`<br>`traverseFilterMap` |                                        |
| **TraversableWithIndex**  | `traverseWihtIndex`                           |                                        |

**Graph**

```
digraph ParameterizedTypes {
    "NonEmptyAlternative" -> "NonEmptyCoproduct"
    "NonEmptyAlternative" -> "Covariant"
    "Alternative" -> "Coproduct"
    "Alternative" -> "NonEmptyAlternative"
    "Applicative" -> "Product"
    "Applicative" -> "NonEmptyApplicative"
    "Product" -> "Of"
    "NonEmptyApplicative" -> "NonEmptyProduct"
    "NonEmptyApplicative" -> "Covariant"
    "Chainable" -> "Covariant"
    "Chainable" -> "FlatMap"
    "Comonad" -> "Extendable"
    "Extendable" -> "Covariant"
    "Monad" -> "Pointed"
    "Monad" -> "FlatMap"
    "Pointed" -> "Of"
    "Pointed" -> "Covariant"
    "Product" -> "NonEmptyProduct"
    "Coproduct" -> "NonEmptyCoproduct"
    "NonEmptyProduct" -> "Invariant"
}
```

# Data Types

Additionaly `@fp-ts/core` exports a few data types (types only, implementations are in `@fp-ts/data`)

- `Either`
- `NonEmptyReadonlyArray`
- `Option`
- `Predicate`
- `Refinement`
- `TotalOrdering`
