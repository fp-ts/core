/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/Either"
import { dual, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import * as option from "@fp-ts/core/internal/Option"
import type { Option } from "@fp-ts/core/Option"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category models
 * @since 1.0.0
 */
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}

/**
 * Returns a default `filterMap` composition.
 *
 * @since 1.0.0
 */
export const filterMapComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Covariant<F>,
  G: Filterable<G>
) =>
  <A, B>(
    f: (a: A) => Option<B>
  ): <FR, FO, FE, GR, GO, GE>(
    self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
  ) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>> => F.map(G.filterMap(f))

/**
 * @since 1.0.0
 */
export const filter: <F extends TypeLambda>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): <R, O, E>(
    self: Kind<F, R, O, E, C>
  ) => Kind<F, R, O, E, B>
  <B extends A, A = B>(
    predicate: (a: A) => boolean
  ): <R, O, E>(self: Kind<F, R, O, E, B>) => Kind<F, R, O, E, B>
  <R, O, E, C extends A, B extends A, A = C>(
    self: Kind<F, R, O, E, C>,
    refinement: (a: A) => a is B
  ): Kind<F, R, O, E, B>
  <R, O, E, B extends A, A = B>(
    self: Kind<F, R, O, E, B>,
    predicate: (a: A) => boolean
  ): Kind<F, R, O, E, B>
} = <F extends TypeLambda>(Filterable: Filterable<F>) =>
  dual<
    <A>(
      predicate: (a: A) => boolean
    ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, A>,
    <R, O, E, A>(self: Kind<F, R, O, E, A>, predicate: (a: A) => boolean) => Kind<F, R, O, E, A>
  >(
    2,
    <R, O, E, A>(self: Kind<F, R, O, E, A>, predicate: (a: A) => boolean): Kind<F, R, O, E, A> =>
      pipe(self, Filterable.filterMap((b) => (predicate(b) ? option.some(b) : option.none)))
  )

/**
 * @since 1.0.0
 */
export const partitionMap = <F extends TypeLambda>(F: Filterable<F>) =>
  <A, B, C>(f: (a: A) => Either<B, C>) =>
    <R, O, E>(
      self: Kind<F, R, O, E, A>
    ): [Kind<F, R, O, E, B>, Kind<F, R, O, E, C>] => {
      return [
        pipe(self, F.filterMap((a) => either.getLeft(f(a)))),
        pipe(self, F.filterMap((a) => either.getRight(f(a))))
      ]
    }

/**
 * @since 1.0.0
 */
export const partition: <F extends TypeLambda>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): <R, O, E>(
    self: Kind<F, R, O, E, C>
  ) => [Kind<F, R, O, E, C>, Kind<F, R, O, E, B>]
  <B extends A, A = B>(predicate: (a: A) => boolean): <R, O, E>(
    self: Kind<F, R, O, E, B>
  ) => [Kind<F, R, O, E, B>, Kind<F, R, O, E, B>]
} = <F extends TypeLambda>(Filterable: Filterable<F>) =>
  <B extends A, A = B>(
    predicate: (a: A) => boolean
  ): (<R, O, E>(
    self: Kind<F, R, O, E, B>
  ) => [Kind<F, R, O, E, B>, Kind<F, R, O, E, B>]) =>
    partitionMap(Filterable)((b) => (predicate(b) ? either.right(b) : either.left(b)))
