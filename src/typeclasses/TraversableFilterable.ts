/**
 * `TraversableFilterable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.
 *
 * @since 3.0.0
 */
import { flow, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import * as _ from "@fp-ts/core/internal"
import type { Option } from "@fp-ts/core/Option"
import type { Result } from "@fp-ts/core/Result"
import type { Applicative } from "@fp-ts/core/typeclasses/Applicative"
import type { Compactable } from "@fp-ts/core/typeclasses/Compactable"
import * as compactable from "@fp-ts/core/typeclasses/Compactable"
import type { Functor } from "@fp-ts/core/typeclasses/Functor"
import type { Traversable } from "@fp-ts/core/typeclasses/Traversable"

/**
 * @category model
 * @since 3.0.0
 */
export interface TraversableFilterable<T extends TypeLambda> extends TypeClass<T> {
  readonly traversePartitionMap: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B, C>(
    f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
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
 * @since 3.0.0
 */
export const traversePartitionMap = <T extends TypeLambda>(
  Traversable: Traversable<T>,
  Functor: Functor<T>,
  Compactable: Compactable<T>
): TraversableFilterable<T>["traversePartitionMap"] =>
  (Applicative) =>
    (f) =>
      flow(
        Traversable.traverse(Applicative)(f),
        Applicative.map(compactable.separate(Functor, Compactable))
      )

/**
 * @since 3.0.0
 */
export const traverseFilterMap = <T extends TypeLambda>(
  Traversable: Traversable<T>,
  Compactable: Compactable<T>
): TraversableFilterable<T>["traverseFilterMap"] =>
  (Applicative) =>
    (f) => flow(Traversable.traverse(Applicative)(f), Applicative.map(Compactable.compact))

/**
 * @since 3.0.0
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
          Applicative.map((ok) => (ok ? _.some(b) : _.none))
        )
      )

/**
 * @since 3.0.0
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
          Applicative.map((ok) => (ok ? _.succeed(b) : _.fail(b)))
        )
      )
