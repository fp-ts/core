# Data overview

## tuples

This section covers the various modules and combinators that work with tuples.

| Module      | Name          | Given                                   | To                                     |
| ----------- | ------------- | --------------------------------------- | -------------------------------------- |
| Equivalence | tuple         | `[Equivalence<A>, Equivalence<B>, ...]` | `Equivalence<readonly [A, B, ...]>`    |
| Order       | tuple         | `[Order<A>, Order<B>, ...]`             | `Order<readonly [A, B, ...]>`          |
| Semigroup   | tuple         | `[Semigroup<A>, Semigroup<B>, ...]`     | `Semigroup<[A, B, ...]>`               |
| Monoid      | tuple         | `[Monoid<A>, Monoid<B>, ...]`           | `Monoid<[A, B, ...]>`                  |
| SemiProduct | nonEmptyTuple | `[F<A>, F<B>, ...]` (cannot be empty)   | `F<[A, B, ...]>`                       |
| Product     | tuple         | `[F<A>, F<B>, ...]`                     | `F<[A, B, ...]>`                       |
| Either      | tuple         | `[Either<E1, A>, Either<E2, B>, ...]`   | `Either<E1 \| E2 \| ..., [A, B, ...]>` |
| Option      | tuple         | `[Option<A>, Option<B>, ...]`           | `Option<[A, B, ...]>`                  |
| Predicate   | tuple         | `[Predicate<A>, Predicate<B>, ...]`     | `Predicate<readonly [A, B, ...]>`      |
| These       | tuple         | `[These<E1, A>, These<E2, B>, ...]`     | `These<E1 \| E2 \| ..., [A, B, ...]>`  |

## arrays

This section covers the various modules and combinators that work with arrays.

| Module        | Name          | Given            | To                              |
| ------------- | ------------- | ---------------- | ------------------------------- |
| Equivalence   | array         | `Equivalence<A>` | `Equivalence<ReadonlyArray<A>>` |
| Order         | array         | `Order<A>`       | `Order<ReadonlyArray<A>>`       |
| Semigroup     | array         | `A`              | `Semigroup<Array<A>>`           |
| Semigroup     | readonlyArray | `A`              | `Semigroup<ReadonlyArray<A>>`   |
| Monoid        | array         | `A`              | `Monoid<Array<A>>`              |
| Monoid        | readonlyArray | `A`              | `Monoid<ReadonlyArray<A>>`      |
| ReadonlyArray | getSemigroup  | `A`              | `Semigroup<ReadonlyArray<A>>`   |
| ReadonlyArray | getMonoid     | `A`              | `Monoid<ReadonlyArray<A>>`      |

## structs

This section covers the various modules and combinators that work with structs.

| Module      | Name           | Given                                           | To                                        |
| ----------- | -------------- | ----------------------------------------------- | ----------------------------------------- |
| Equivalence | struct         | `{ a: Equivalence<A>, b: Equivalence<B>, ... }` | `Equivalence<{ a: A, b: B, ... }>`        |
| Order       | NA             | NA                                              | NA                                        |
| Semigroup   | struct         | `{ a: Semigroup<A>, b: Semigroup<B>, ... }`     | `Semigroup<{ a: A, b: B, ... }>`          |
| Monoid      | struct         | `{ a: Monoid<A>, b: Monoid<B>, ... }`           | `Monoid<{ a: A, b: B, ... }>`             |
| SemiProduct | nonEmptyStruct | `{ a: F<A>, b: F<B>, ... }` (cannot be empty)   | `F<{ a: A, b: B, ... }>`                  |
| Product     | struct         | `{ a: F<A>, b: F<B>, ... }`                     | `F<{ a: A, b: B, ... }>`                  |
| Either      | struct         | `{ a: Either<E1, A>, b: Either<E2, B>, ... }`   | `Either<E1 \| E2 \| ..., { a: A, b: B }>` |
| Option      | struct         | `{ a: Option<A>, b: Option<B>, ... }`           | `Option<{ a: A, b: B }>`                  |
| Predicate   | struct         | `{ a: Predicate<A>, b: Predicate<B>, ... }`     | `Predicate<Readonly<{ a: A, b: B }>>`     |
| These       | struct         | `{ a: These<E1, A>, b: These<E2, B>, ... }`     | `These<E1 \| E2 \| ..., { a: A, b: B }>`  |

## strings

| Module      | Name        | Given | To                            |
| ----------- | ----------- | ----- | ----------------------------- |
| Equivalence | string      |       | `Equivalence<string>`         |
| Order       | string      |       | `Order<string>`               |
| Semigroup   | string      |       | `Semigroup<string>`           |
| Monoid      | string      |       | `Monoid<string>`              |
| Predicate   | isString    |       | `Refinement<unknown, string>` |
| String      | Equivalence |       | `Equivalence<string>`         |
| String      | Order       |       | `Order<string>`               |
| String      | Semigroup   |       | `Semigroup<string>`           |
| String      | Monoid      |       | `Monoid<string>`              |
| String      | isString    |       | `Refinement<unknown, string>` |

## numbers

| Module      | Name              | Given | To                            |
| ----------- | ----------------- | ----- | ----------------------------- |
| Equivalence | number            |       | `Equivalence<number>`         |
| Order       | number            |       | `Order<number>`               |
| Bounded     | number            |       | `Bounded<number>`             |
| Semigroup   | numberSum         |       | `Semigroup<number>`           |
| Semigroup   | numberMultiply    |       | `Semigroup<number>`           |
| Monoid      | numberSum         |       | `Monoid<number>`              |
| Monoid      | numberMultiply    |       | `Monoid<number>`              |
| Predicate   | isNumber          |       | `Refinement<unknown, number>` |
| Number      | Equivalence       |       | `Equivalence<number>`         |
| Number      | Order             |       | `Order<number>`               |
| Number      | SemigroupSum      |       | `Semigroup<number>`           |
| Number      | SemigroupMultiply |       | `Semigroup<number>`           |
| Number      | MonoidSum         |       | `Monoid<number>`              |
| Number      | MonoidMultiply    |       | `Monoid<number>`              |
| Number      | isNumber          |       | `Refinement<unknown, number>` |
