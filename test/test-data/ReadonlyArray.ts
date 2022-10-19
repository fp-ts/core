import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import type * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as covariantWithIndex from "@fp-ts/core/typeclass/CovariantWithIndex"
import type * as foldable from "@fp-ts/core/typeclass/Foldable"
import type * as foldableWithIndex from "@fp-ts/core/typeclass/FoldableWithIndex"
import * as product_ from "@fp-ts/core/typeclass/Product"
import type { TotalOrder } from "@fp-ts/core/typeclass/TotalOrder"
import type * as traverse_ from "@fp-ts/core/typeclass/Traversable"
import type * as traversableWithIndex from "@fp-ts/core/typeclass/TraversableWithIndex"
import * as O from "./Option"

export type NonEmptyReadonlyArray<A> = readonly [A, ...ReadonlyArray<A>]

export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Out"]>
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

export const Foldable: foldable.Foldable<ReadonlyArrayTypeLambda> = {
  reduce: (b, f) => self => self.reduce((b, a) => f(b, a), b),
  reduceRight: (b, f) => self => self.reduceRight((b, a) => f(b, a), b)
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

export const isNonEmpty = <A>(self: ReadonlyArray<A>): self is NonEmptyReadonlyArray<A> =>
  self.length > 0

export const head = <A>(
  self: ReadonlyArray<A>
): O.Option<A> => (isNonEmpty(self) ? O.some(self[0]) : O.none)

export const sort = <B>(Compare: TotalOrder<B>) =>
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
  <A, S, R, O, E, B>(f: (a: A, i: number) => Kind<F, S, R, O, E, B>) =>
    (self: Iterable<A>): Kind<F, S, R, O, E, ReadonlyArray<B>> =>
      Applicative.productAll(Array.from(self).map((a, i) => f(a, i)))

export const traverse = <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) =>
  <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, B>
  ): (self: ReadonlyArray<A>) => Kind<F, S, R, O, E, ReadonlyArray<B>> =>
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

export const Product: product_.Product<ReadonlyArrayTypeLambda> = product_.fromCovariant(
  Covariant,
  product
)
