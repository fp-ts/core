/**
 * `TraversableFilterable` represents data structures which can be _partitioned_ with effects in some `Monoidal` functor.
 *
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/data/Either"
import type { Option } from "@fp-ts/core/data/Option"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import { flow, pipe } from "@fp-ts/core/internal/Function"
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
 * @since 1.0.0
 */
export const traversePartitionMap = <T extends TypeLambda>(
  Traversable: Traversable<T>,
  Covariant: Covariant<T>,
  Compactable: Compactable<T>
): TraversableFilterable<T>["traversePartitionMap"] =>
  (Applicative) =>
    (f) =>
      flow(
        Traversable.traverse(Applicative)(f),
        Applicative.map(compactable.separate(Covariant, Compactable))
      )

/**
 * @since 1.0.0
 */
export const traverseFilterMap = <T extends TypeLambda>(
  Traversable: Traversable<T>,
  Compactable: Compactable<T>
): TraversableFilterable<T>["traverseFilterMap"] =>
  (Monoidal) => (f) => flow(Traversable.traverse(Monoidal)(f), Monoidal.map(Compactable.compact))

/**
 * @since 1.0.0
 */
export const traverseFilter = <T extends TypeLambda>(
  TraversableFilterable: TraversableFilterable<T>
) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, B>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>) =>
    (predicate) =>
      TraversableFilterable.traverseFilterMap(Applicative)((b) =>
        pipe(
          predicate(b),
          Applicative.map((ok) => (ok ? option.some(b) : option.none))
        )
      )

/**
 * @since 1.0.0
 */
export const traversePartition = <T extends TypeLambda>(
  TraversableFilterable: TraversableFilterable<T>
) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<B extends A, S, R, O, E, A = B>(
    predicate: (a: A) => Kind<F, S, R, O, E, boolean>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, B>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, B>]>) =>
    (predicate) =>
      TraversableFilterable.traversePartitionMap(Applicative)((b) =>
        pipe(
          predicate(b),
          Applicative.map((ok) => (ok ? either.right(b) : either.left(b)))
        )
      )
