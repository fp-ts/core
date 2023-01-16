/**
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/Either"
import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import * as O from "@fp-ts/core/Option"
import type { Option } from "@fp-ts/core/Option"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { Filterable } from "@fp-ts/core/typeclass/Filterable"

/**
 * @category models
 * @since 1.0.0
 */
export interface FilterableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly filterMapWithIndex: <A, B>(
    f: (a: A, i: I) => Option<B>
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}

/**
 * Returns a default `filterMapWithIndex` composition.
 *
 * @since 1.0.0
 */
export const filterMapWithIndexComposition = <F extends TypeLambda, G extends TypeLambda, I>(
  F: Covariant<F>,
  G: FilterableWithIndex<G, I>
) =>
  <A, B>(
    f: (a: A, i: I) => Option<B>
  ): <FR, FO, FE, GR, GO, GE>(
    self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
  ) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>> => F.map(G.filterMapWithIndex(f))

/**
 * Returns a default `filterMap` implementation.
 *
 * @since 1.0.0
 */
export const filterMap = <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
): Filterable<F>["filterMap"] => (f) => F.filterMapWithIndex(f)

/**
 * @since 1.0.0
 */
export const filterWithIndex: <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A, i: I) => a is B): <R, O, E>(
    self: Kind<F, R, O, E, C>
  ) => Kind<F, R, O, E, B>
  <B extends A, A = B>(
    predicate: (a: A, i: I) => boolean
  ): <R, O, E>(self: Kind<F, R, O, E, B>) => Kind<F, R, O, E, B>
} = <F extends TypeLambda, I>(FilterableWithIndex: FilterableWithIndex<F, I>) =>
  <B extends A, A = B>(
    predicate: (a: A, i: I) => boolean
  ): (<R, O, E>(self: Kind<F, R, O, E, B>) => Kind<F, R, O, E, B>) =>
    FilterableWithIndex.filterMapWithIndex((
      b,
      i
    ) => (predicate(b, i) ? O.some(b) : O.none()))

/**
 * @since 1.0.0
 */
export const partitionMapWithIndex = <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) =>
  <A, B, C>(f: (a: A, i: I) => Either<B, C>) =>
    <R, O, E>(
      self: Kind<F, R, O, E, A>
    ): readonly [Kind<F, R, O, E, B>, Kind<F, R, O, E, C>] => {
      return [
        pipe(self, F.filterMapWithIndex((a, i) => E.getLeft(f(a, i)))),
        pipe(self, F.filterMapWithIndex((a, i) => E.getRight(f(a, i))))
      ]
    }

/**
 * @since 1.0.0
 */
export const partitionWithIndex: <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A, i: I) => a is B): <R, O, E>(
    self: Kind<F, R, O, E, C>
  ) => readonly [Kind<F, R, O, E, C>, Kind<F, R, O, E, B>]
  <B extends A, A = B>(predicate: (a: A, i: I) => boolean): <R, O, E>(
    self: Kind<F, R, O, E, B>
  ) => readonly [Kind<F, R, O, E, B>, Kind<F, R, O, E, B>]
} = <F extends TypeLambda, I>(FilterableWithIndex: FilterableWithIndex<F, I>) => {
  const partitionMapWithIndex_ = partitionMapWithIndex(FilterableWithIndex)
  return <B extends A, A = B>(
    predicate: (a: A, i: I) => boolean
  ): (<R, O, E>(
    self: Kind<F, R, O, E, B>
  ) => readonly [Kind<F, R, O, E, B>, Kind<F, R, O, E, B>]) =>
    partitionMapWithIndex_((b, i) => (predicate(b, i) ? E.right(b) : E.left(b)))
}
