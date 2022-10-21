/**
 * `TraversableFilterable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/data/Either"
import type { Option } from "@fp-ts/core/data/Option"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import { pipe } from "@fp-ts/core/internal/Function"
import * as option from "@fp-ts/core/internal/Option"
import type { Applicative } from "@fp-ts/core/typeclass/Applicative"
import * as compactable from "@fp-ts/core/typeclass/Compactable"
import type { Compactable } from "@fp-ts/core/typeclass/Compactable"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { Traversable } from "@fp-ts/core/typeclass/Traversable"

/**
 * @category models
 * @since 1.0.0
 */
export interface TraversableFilterable<T extends TypeLambda> extends TypeClass<T> {
  readonly traversePartitionMap: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B, C>(
    f: (a: A) => Kind<F, S, R, O, E, Either<B, C>>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, C>]>

  readonly traverseFilterMap: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Option<B>>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

/**
 * Returns a default `traversePartitionMap` implementation.
 *
 * @since 1.0.0
 */
export const traversePartitionMap = <T extends TypeLambda>(
  F: Traversable<T> & Covariant<T> & Compactable<T>
): TraversableFilterable<T>["traversePartitionMap"] =>
  (Applicative) =>
    f =>
      ta =>
        pipe(
          ta,
          F.traverse(Applicative)(f),
          Applicative.map(compactable.separate(F))
        )

/**
 * Returns a default `traverseFilterMap` implementation.
 *
 * @since 1.0.0
 */
export const traverseFilterMap = <T extends TypeLambda>(
  F: Traversable<T> & Compactable<T>
): TraversableFilterable<T>["traverseFilterMap"] =>
  (Applicative) => f => ta => pipe(ta, F.traverse(Applicative)(f), Applicative.map(F.compact))

/**
 * @since 1.0.0
 */
export const traverseFilter = <T extends TypeLambda>(
  F: TraversableFilterable<T>
) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, B>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>) =>
    (predicate) =>
      F.traverseFilterMap(Applicative)(b =>
        pipe(
          predicate(b),
          Applicative.map(keep => (keep ? option.some(b) : option.none))
        )
      )

/**
 * @since 1.0.0
 */
export const traversePartition = <T extends TypeLambda>(
  F: TraversableFilterable<T>
) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, B>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, B>]>) =>
    (predicate) =>
      F.traversePartitionMap(Applicative)(b =>
        pipe(
          predicate(b),
          Applicative.map((keep) => (keep ? either.right(b) : either.left(b)))
        )
      )
