# Introduction

The functional abstractions in `@fp-ts/core` can be broadly divided into two categories.

- Abstractions For Concrete Types - These abstractions define properties of concrete types, such as `number` and `string`, as well as ways of combining those values.
- Abstractions For Parameterized Types - These abstractions define properties of parameterized types such as `ReadonlyArray` and `Option` and ways of combining them.

# Concrete Types

|               | member(s)                  | extends       |
| ------------- | -------------------------- | ------------- |
| **Bounded**   | `maxBound`<br>`minBound`   | **Order**     |
| **Semigroup** | `combine`<br>`combineMany` |               |
| **Monoid**    | `empty`<br>`combineAll`    | **Semigroup** |
| **Order**     | `compare`                  |               |

**Graph**

```
digraph ConcreteTypes {
    "Bounded" -> "Order"
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
| **Contravariant**         | `contramap`                                   | **Invariant**                          |
| **Coproduct**             | `zero`<br>`coproductAll`                      |                                        |
| **Covariant**             | `map`                                         | **Invariant**                          |
| **Extendable**            | `extend`                                      | **Covariant**                          |
| **Filterable**            | `filterMap`                                   |                                        |
| **FlatMap**               | `flatMap`                                     |                                        |
| **Foldable**              | `reduce`<br>`reduceRight`                     |                                        |
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
    "Covariant" -> "Invariant"
    "Contravariant" -> "Invariant"
}
```

# Data Types

Additionaly `@fp-ts/core` exports a few data types (types only, implementations are in `@fp-ts/data`)

- `Either`
- `NonEmptyReadonlyArray`
- `Option`
- `Predicate`
- `Refinement`
- `Ordering`

# Derived functions

**Applicative**

| Name         | Given       | To             |
| ------------ | ----------- | -------------- |
| `liftMonoid` | `Monoid<A>` | `Monoid<F<A>>` |

**Bicovariant**

| Name      | Given      | To                     |
| --------- | ---------- | ---------------------- |
| `mapLeft` | `E1 => E2` | `F<E1, A> => F<E2, A>` |
| `mapLeft` | `A => B`   | `F<A> => F<B>`         |

**Bounded**

| Name      | Given        | To           |
| --------- | ------------ | ------------ |
| `clamp`   | `A`          | `A`          |
| `reverse` | `Bounded<A>` | `Bounded<A>` |

**Chainable**

| Name             | Given                               | To                     |
| ---------------- | ----------------------------------- | ---------------------- |
| `tap`            | `F<A>`, `A => F<B>`                 | `F<A>`                 |
| `andThenDiscard` | `F<A>`, `F<B>`                      | `F<A>`                 |
| `bind`           | `F<A>`, `name: string`, `A => F<B>` | `F<A & { [name]: B }>` |

**Compactable**

| Name       | Given             | To             |
| ---------- | ----------------- | -------------- |
| `separate` | `F<Either<A, B>>` | `[F<A>, F<B>]` |

**Covariant**

| Name             | Given               | To        |
| ---------------- | ------------------- | --------- |
| `mapComposition` | `F<G<A>>`, `A => B` | `F<G<B>>` |
| `flap`           | `A`, `F<A => B>`    | `F<B>`    |
| `as`             | `F<A>`, `B`         | `F<B>`    |
| `asUnit`         | `F<A>`              | `F<void>` |

**Filterable**

| Name                   | Given                       | To             |
| ---------------------- | --------------------------- | -------------- |
| `filterMapComposition` | `F<G<A>>`, `A => Option<B>` | `F<G<B>>`      |
| `filter`               | `F<A>`, `A => boolean`      | `F<A>`         |
| `partitionMap`         | `F<A>`, `A => Either<B, C>` | `[F<B>, F<C>]` |
| `partition`            | `F<A>`, `A => boolean`      | `[F<A>, F<A>]` |

**FlatMap**

| Name             | Given                    | To          |
| ---------------- | ------------------------ | ----------- |
| `flatten`        | `F<F<A>>`                | `F<A>`      |
| `andThen`        | `F<A>`, `F<B>`           | `F<B>`      |
| `composeKleisli` | `A => F<B>`, `B => F<C>` | `A => F<C>` |

**Foldable**

| Name                     | Given                         | To                 |
| ------------------------ | ----------------------------- | ------------------ |
| `reduceComposition`      | `F<G<A>>`, `B`, `(B, A) => B` | `B`                |
| `reduceRightComposition` | `F<G<A>>`, `B`, `(B, A) => B` | `B`                |
| `foldMap`                | `F<A>`, `Monoid<M>`, `A => M` | `M`                |
| `toReadonlyArray`        | `F<A>`                        | `ReadonlyArray<A>` |
| `toReadonlyArrayWith`    | `F<A>`, `A => B`              | `ReadonlyArray<B>` |

**Invariant**

| Name     | Given                  | To                 |
| -------- | ---------------------- | ------------------ |
| `bindTo` | `F<A>`, `name: string` | `F<{ [name]: A }>` |
| `tupled` | `F<A>`                 | `F<[A]>`           |

**Monoid**

| Name      | Given                       | To                         |
| --------- | --------------------------- | -------------------------- |
| `min`     | `Bounded<A>`                | `Monoid<A>`                |
| `max`     | `Bounded<A>`                | `Monoid<A>`                |
| `reverse` | `Monoid<A>`                 | `Monoid<A>`                |
| `struct`  | `Record<string, Monoid<_>>` | `Monoid<Record<string, _>` |
| `tuple`   | `ReadonlyArray<Monoid<_>>`  | `Monoid<ReadonlyArray<_>`  |

**NonEmptyApplicative**

| Name             | Given               | To                           |
| ---------------- | ------------------- | ---------------------------- |
| `liftSemigroup`  | `Semigroup<A>`      | `Semigroup<F<A>>`            |
| `ap`             | `F<A => B>`, `F<A>` | `F<B>`                       |
| `andThenDiscard` | `F<A>`, `F<B>`      | `F<A>`                       |
| `andThen`        | `F<A>`, `F<B>`      | `F<B>`                       |
| `lift2`          | `(A, B) => C`       | `(F<A>, F<B>) => F<C>`       |
| `lift3`          | `(A, B, C) => D`    | `(F<A>, F<B>, F<C>) => F<D>` |
