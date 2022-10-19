/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/data/Either"
import type { Option } from "@fp-ts/core/data/Option"
import type { Predicate } from "@fp-ts/core/data/Predicate"
import type { Refinement } from "@fp-ts/core/data/Refinement"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import { flow, pipe } from "@fp-ts/core/internal/Function"
import * as option from "@fp-ts/core/internal/Option"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category models
 * @since 1.0.0
 */
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}

/**
 * Returns a default `filterMap` composition.
 *
 * @since 1.0.0
 */
export const filterMapComposition = <F extends TypeLambda, G extends TypeLambda>(
  CovariantF: Covariant<F>,
  FilterableG: Filterable<G>
): (<A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>) => {
  return (f) => CovariantF.map(FilterableG.filterMap(f))
}

/**
 * @since 1.0.0
 */
export const filter: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): <S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>
} = <F extends TypeLambda>(Filterable: Filterable<F>) =>
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>) =>
    Filterable.filterMap((b) => (predicate(b) ? option.some(b) : option.none))

/**
 * @since 1.0.0
 */
export const partitionMap = <F extends TypeLambda>(Filterable: Filterable<F>) =>
  <A, B, C>(f: (a: A) => Either<B, C>) =>
    <S, R, O, E>(
      self: Kind<F, S, R, O, E, A>
    ): readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>] => {
      return [
        pipe(self, Filterable.filterMap(flow(f, either.getLeft))),
        pipe(self, Filterable.filterMap(flow(f, either.getRight)))
      ]
    }

/**
 * @since 1.0.0
 */
export const partition: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
} = <F extends TypeLambda>(Filterable: Filterable<F>) => {
  const partitionMap_ = partitionMap(Filterable)
  return <B extends A, A = B>(
    predicate: Predicate<A>
  ): (<S, R, O, E>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]) =>
    partitionMap_((b) => (predicate(b) ? either.right(b) : either.left(b)))
}
