# Data overview

## tuples

This section covers the various modules and combinators that work with tuples.

| Module      | Name          | Given                                   | To                                     |
| ----------- | ------------- | --------------------------------------- | -------------------------------------- |
| Equivalence | tuple         | `[Equivalence<A>, Equivalence<B>, ...]` | `Equivalence<readonly [A, B, ...]>`    |
| Order       | tuple         | `[Order<A>, Order<B>, ...]`             | `Order<readonly [A, B, ...]>`          |
| Semigroup   | tuple         | `[Semigroup<A>, Semigroup<B>, ...]`     | `Semigroup<[A, B, ...]>`               |
| Monoid      | tuple         | `[Monoid<A>, Monoid<B>, ...]`           | `Monoid<[A, B, ...]>`                  |
| SemiProduct | nonEmptyTuple | `[F<A>, F<B>, ...]`                     | `F<[A, B, ...]>`                       |
| Product     | tuple         | `[F<A>, F<B>, ...]` (can be empty)      | `F<[A, B, ...]>`                       |
| Either      | tuple         | `[Either<E1, A>, Either<E2, B>, ...]`   | `Either<E1 \| E2 \| ..., [A, B, ...]>` |
| Option      | tuple         | `[Option<A>, Option<B>, ...]`           | `Option<[A, B, ...]>`                  |
| Predicate   | tuple         | `[Predicate<A>, Predicate<B>, ...]`     | `Predicate<readonly [A, B, ...]>`      |
| These       | tuple         | `[These<E1, A>, These<E2, B>, ...]`     | `These<E1 \| E2 \| ..., [A, B, ...]>`  |

## arrays

This section covers the various modules and combinators that work with arrays.

| Module      | Name          | Given            | To                              |
| ----------- | ------------- | ---------------- | ------------------------------- |
| Equivalence | array         | `Equivalence<A>` | `Equivalence<ReadonlyArray<A>>` |
| Order       | array         | `Order<A>`       | `Order<ReadonlyArray<A>>`       |
| Semigroup   | array         | `A`              | `Semigroup<Array<A>>`           |
| Semigroup   | readonlyArray | `A`              | `Semigroup<ReadonlyArray<A>>`   |
