/**
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/data/Either"
import type { Option } from "@fp-ts/core/data/Option"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import { pipe } from "@fp-ts/core/internal/Function"
import * as option from "@fp-ts/core/internal/Option"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { Filterable } from "@fp-ts/core/typeclass/Filterable"

/**
 * @category models
 * @since 1.0.0
 */
export interface FilterableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly filterMapWithIndex: <A, B>(
    f: (a: A, i: I) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
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
  ): <FS, FR, FO, FE, GS, GR, GO, GE>(
    self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
  ) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>> => F.map(G.filterMapWithIndex(f))

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
  <C extends A, B extends A, A = C>(refinement: (a: A, i: I) => a is B): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(
    predicate: (a: A, i: I) => boolean
  ): <S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>
} = <F extends TypeLambda, I>(FilterableWithIndex: FilterableWithIndex<F, I>) =>
  <B extends A, A = B>(
    predicate: (a: A, i: I) => boolean
  ): (<S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>) =>
    FilterableWithIndex.filterMapWithIndex((
      b,
      i
    ) => (predicate(b, i) ? option.some(b) : option.none))

/**
 * @since 1.0.0
 */
export const partitionMapWithIndex = <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) =>
  <A, B, C>(f: (a: A, i: I) => Either<B, C>) =>
    <S, R, O, E>(
      self: Kind<F, S, R, O, E, A>
    ): readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>] => {
      return [
        pipe(self, F.filterMapWithIndex((a, i) => either.getLeft(f(a, i)))),
        pipe(self, F.filterMapWithIndex((a, i) => either.getRight(f(a, i))))
      ]
    }

/**
 * @since 1.0.0
 */
export const partitionWithIndex: <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A, i: I) => a is B): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, A = B>(predicate: (a: A, i: I) => boolean): <S, R, O, E>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
} = <F extends TypeLambda, I>(FilterableWithIndex: FilterableWithIndex<F, I>) => {
  const partitionMapWithIndex_ = partitionMapWithIndex(FilterableWithIndex)
  return <B extends A, A = B>(
    predicate: (a: A, i: I) => boolean
  ): (<S, R, O, E>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]) =>
    partitionMapWithIndex_((b, i) => (predicate(b, i) ? either.right(b) : either.left(b)))
}
