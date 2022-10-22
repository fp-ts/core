import type { compactable, filterable } from "@fp-ts/core"
import { filterableWithIndex, traversableFilterable } from "@fp-ts/core"
import type { NonEmptyReadonlyArray } from "@fp-ts/core/data/NonEmptyReadonlyArray"
import type { Option } from "@fp-ts/core/data/Option"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { identity } from "@fp-ts/core/internal/Function"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import type * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as covariantWithIndex from "@fp-ts/core/typeclass/CovariantWithIndex"
import type * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as foldableWithIndex from "@fp-ts/core/typeclass/FoldableWithIndex"
import * as nonEmptyApplicative from "@fp-ts/core/typeclass/NonEmptyApplicative"
import type { Order } from "@fp-ts/core/typeclass/Order"
import type * as traverse_ from "@fp-ts/core/typeclass/Traversable"
import type * as traversableWithIndex from "@fp-ts/core/typeclass/TraversableWithIndex"
import * as O from "./Option"

export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Target"]>
}

export const map = <A, B>(f: (a: A) => B) =>
  (self: ReadonlyArray<A>): ReadonlyArray<B> => self.map(a => f(a))

export const mapWithIndex = <A, B>(f: (a: A, i: number) => B) =>
  (self: ReadonlyArray<A>): ReadonlyArray<B> => self.map((a, i) => f(a, i))

export const Covariant: covariant.Covariant<ReadonlyArrayTypeLambda> = {
  map
}

export const CovariantWithIndex: covariantWithIndex.CovariantWithIndex<
  ReadonlyArrayTypeLambda,
  number
> = {
  mapWithIndex: (f) => (self) => self.map((a, i) => f(a, i))
}

export const reduceWithIndex = <A, B>(
  b: B,
  f: (b: B, a: A, i: number) => B
) => (self: ReadonlyArray<A>) => self.reduce((b, a, i) => f(b, a, i), b)

export const reduceRightWithIndex = <A, B>(b: B, f: (b: B, a: A, i: number) => B) =>
  (self: ReadonlyArray<A>): B => self.reduceRight((b, a, i) => f(b, a, i), b)

export const FoldableWithIndex: foldableWithIndex.FoldableWithIndex<
  ReadonlyArrayTypeLambda,
  number
> = {
  reduceWithIndex,
  reduceRightWithIndex
}

export const Foldable: foldable.Foldable<ReadonlyArrayTypeLambda> = {
  reduce: foldableWithIndex.reduce(FoldableWithIndex),
  reduceRight: foldableWithIndex.reduceRight(FoldableWithIndex)
}

export const isNonEmpty = <A>(self: ReadonlyArray<A>): self is NonEmptyReadonlyArray<A> =>
  self.length > 0

export const head = <A>(
  self: ReadonlyArray<A>
): O.Option<A> => (isNonEmpty(self) ? O.some(self[0]) : O.none)

export const sort = <B>(Compare: Order<B>) =>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
    as.length <= 1 ? as : as.slice().sort((a1, a2) => Compare.compare(a2)(a1))

export function concat<B>(
  that: NonEmptyReadonlyArray<B>
): <A>(self: ReadonlyArray<A>) => NonEmptyReadonlyArray<A | B>
export function concat<B>(
  that: ReadonlyArray<B>
): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A | B>
export function concat<B>(
  that: ReadonlyArray<B>
): <A>(self: NonEmptyReadonlyArray<A>) => ReadonlyArray<A | B> {
  return <A>(self: NonEmptyReadonlyArray<A | B>) => self.concat(that)
}

export const traverseWithIndex = <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) =>
  <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>) =>
    (self: Iterable<A>): Kind<F, R, O, E, ReadonlyArray<B>> =>
      Applicative.productAll(Array.from(self).map((a, i) => f(a, i)))

export const traverse = <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) =>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): (self: ReadonlyArray<A>) => Kind<F, R, O, E, ReadonlyArray<B>> =>
    traverseWithIndex(Applicative)((a) => f(a))

export const Traverse: traverse_.Traversable<ReadonlyArrayTypeLambda> = {
  traverse
}

export const TraversableWithIndex: traversableWithIndex.TraversableWithIndex<
  ReadonlyArrayTypeLambda,
  number
> = {
  traverseWithIndex
}

export const product = <B>(that: ReadonlyArray<B>) =>
  <A>(self: ReadonlyArray<A>): ReadonlyArray<readonly [A, B]> => {
    const out: Array<readonly [A, B]> = []
    for (const a of self) {
      for (const b of that) {
        out.push([a, b])
      }
    }
    return out
  }

export const NonEmptyApplicative: nonEmptyApplicative.NonEmptyApplicative<ReadonlyArrayTypeLambda> =
  nonEmptyApplicative
    .fromCovariant(
      Covariant,
      product
    )

export const filterMapWithIndex = <A, B>(f: (a: A, i: number) => Option<B>) =>
  (fa: ReadonlyArray<A>): ReadonlyArray<B> => {
    const out: Array<B> = []
    for (let i = 0; i < fa.length; i++) {
      const optionB = f(fa[i], i)
      if (O.isSome(optionB)) {
        out.push(optionB.value)
      }
    }
    return out
  }

export const FilterableWithIndex: filterableWithIndex.FilterableWithIndex<
  ReadonlyArrayTypeLambda,
  number
> = {
  filterMapWithIndex
}

export const filterMap: <A, B>(
  f: (a: A) => Option<B>
) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = filterableWithIndex.filterMap(FilterableWithIndex)

export const compact: <A>(fa: ReadonlyArray<Option<A>>) => ReadonlyArray<A> =
  /*#__PURE__*/ filterMap(identity)

export const Compactable: compactable.Compactable<ReadonlyArrayTypeLambda> = {
  compact
}

export const Filterable: filterable.Filterable<ReadonlyArrayTypeLambda> = {
  filterMap
}

export const Traversable: traverse_.Traversable<ReadonlyArrayTypeLambda> = {
  traverse
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const traverseFilterMap = traversableFilterable.traverseFilterMap(
  { ...Traversable, ...Compactable }
)

/**
 * @category filtering
 * @since 1.0.0
 */
export const traversePartitionMap = traversableFilterable
  .traversePartitionMap({ ...Traversable, ...Covariant, ...Compactable })

/**
 * @category instances
 * @since 1.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<
  ReadonlyArrayTypeLambda
> = {
  traverseFilterMap,
  traversePartitionMap
}
