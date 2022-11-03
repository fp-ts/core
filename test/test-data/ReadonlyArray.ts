import type { compactable, filterable } from "@fp-ts/core"
import { semiProduct, traversableFilterable } from "@fp-ts/core"
import type { Option } from "@fp-ts/core/data/Option"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as foldable from "@fp-ts/core/typeclass/Foldable"
import type * as nonEmptyApplicative from "@fp-ts/core/typeclass/NonEmptyApplicative"
import type * as of_ from "@fp-ts/core/typeclass/Of"
import type { Order } from "@fp-ts/core/typeclass/Order"
import type * as traverse_ from "@fp-ts/core/typeclass/Traversable"
import type * as covariantWithIndex from "../limbo/CovariantWithIndex"
import * as filterableWithIndex from "../limbo/FilterableWithIndex"
import * as foldableWithIndex from "../limbo/FoldableWithIndex"
import type * as traversableWithIndex from "../limbo/TraversableWithIndex"
import type { NonEmptyReadonlyArray } from "./NonEmptyReadonlyArray"
import * as nonEmptyReadonlyArray from "./NonEmptyReadonlyArray"
import * as O from "./Option"

export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Target"]>
}

export const map = <A, B>(f: (a: A) => B) =>
  (self: ReadonlyArray<A>): ReadonlyArray<B> => self.map(a => f(a))

export const mapWithIndex = <A, B>(f: (a: A, i: number) => B) =>
  (self: ReadonlyArray<A>): ReadonlyArray<B> => self.map((a, i) => f(a, i))

export const Covariant: covariant.Covariant<ReadonlyArrayTypeLambda> = covariant.make(map)

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
  reduce: foldableWithIndex.reduce(FoldableWithIndex)
}

export const isNonEmpty: <A>(self: ReadonlyArray<A>) => self is NonEmptyReadonlyArray<A> =
  nonEmptyReadonlyArray.isNonEmpty

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
    (self: Iterable<A>): Kind<F, R, O, E, ReadonlyArray<B>> => {
      const fbs: Array<Kind<F, R, O, E, B>> = []
      let i = 0
      for (const a of self) {
        fbs.push(f(a, i++))
      }
      return Applicative.productAll(fbs)
    }

export const traverse = <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) =>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): (self: ReadonlyArray<A>) => Kind<F, R, O, E, ReadonlyArray<B>> =>
    traverseWithIndex(Applicative)(f)

export const Traversable: traverse_.Traversable<ReadonlyArrayTypeLambda> = {
  traverse,
  sequence: F => self => pipe(self, traverse(F)(identity))
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

export const Of: of_.Of<ReadonlyArrayTypeLambda> = {
  of: a => [a]
}

const SemiProduct: semiProduct.SemiProduct<ReadonlyArrayTypeLambda> = {
  imap: Covariant.imap,
  product,
  productMany: semiProduct.productMany(Covariant, product)
}

export const NonEmptyApplicative: nonEmptyApplicative.NonEmptyApplicative<ReadonlyArrayTypeLambda> =
  {
    ...Covariant,
    ...SemiProduct
  }

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
