import { semiProduct } from "@fp-ts/core"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as foldable from "@fp-ts/core/typeclass/Foldable"
import type * as of_ from "@fp-ts/core/typeclass/Of"
import type { Order } from "@fp-ts/core/typeclass/Order"
import type * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import type * as traverse_ from "@fp-ts/core/typeclass/Traversable"
import type * as covariantWithIndex from "../limbo/CovariantWithIndex"
import * as foldableWithIndex from "../limbo/FoldableWithIndex"
import type * as traversableWithIndex from "../limbo/TraversableWithIndex"
import type { NonEmptyArray } from "./NonEmptyArray"
import * as nonEmptyArray from "./NonEmptyArray"
import * as O from "./Option"
import type { Option } from "./Option"

export interface ArrayTypeLambda extends TypeLambda {
  type: Array<this["Target"]>
}

export const map = <A, B>(f: (a: A) => B) => (self: Array<A>): Array<B> => self.map(a => f(a))

export const mapWithIndex = <A, B>(f: (a: A, i: number) => B) =>
  (self: Array<A>): Array<B> => self.map((a, i) => f(a, i))

export const Covariant: covariant.Covariant<ArrayTypeLambda> = covariant.make(map)

export const CovariantWithIndex: covariantWithIndex.CovariantWithIndex<
  ArrayTypeLambda,
  number
> = {
  mapWithIndex: (f) => (self) => self.map((a, i) => f(a, i))
}

export const reduceWithIndex = <A, B>(
  b: B,
  f: (b: B, a: A, i: number) => B
) => (self: Array<A>) => self.reduce((b, a, i) => f(b, a, i), b)

export const reduceRightWithIndex = <A, B>(b: B, f: (b: B, a: A, i: number) => B) =>
  (self: Array<A>): B => self.reduceRight((b, a, i) => f(b, a, i), b)

export const FoldableWithIndex: foldableWithIndex.FoldableWithIndex<
  ArrayTypeLambda,
  number
> = {
  reduceWithIndex,
  reduceRightWithIndex
}

export const Foldable: foldable.Foldable<ArrayTypeLambda> = {
  reduce: foldableWithIndex.reduce(FoldableWithIndex)
}

export const isNonEmpty: <A>(self: Array<A>) => self is NonEmptyArray<A> = nonEmptyArray.isNonEmpty

export const head = <A>(
  self: Array<A>
): O.Option<A> => (isNonEmpty(self) ? O.some(self[0]) : O.none)

export const sort = <B>(Compare: Order<B>) =>
  <A extends B>(as: Array<A>): Array<A> =>
    as.length <= 1 ? as : as.slice().sort((a1, a2) => Compare.compare(a2)(a1))

export function concat<B>(
  that: NonEmptyArray<B>
): <A>(self: Array<A>) => NonEmptyArray<A | B>
export function concat<B>(
  that: Array<B>
): <A>(self: NonEmptyArray<A>) => NonEmptyArray<A | B>
export function concat<B>(
  that: Array<B>
): <A>(self: NonEmptyArray<A>) => Array<A | B> {
  return <A>(self: NonEmptyArray<A | B>) => self.concat(that)
}

export const traverseWithIndex = <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) =>
  <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>) =>
    (self: Iterable<A>): Kind<F, R, O, E, Array<B>> => {
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
  ): (self: Array<A>) => Kind<F, R, O, E, Array<B>> => traverseWithIndex(Applicative)(f)

export const Traversable: traverse_.Traversable<ArrayTypeLambda> = {
  traverse,
  sequence: F => self => pipe(self, traverse(F)(identity))
}

export const TraversableWithIndex: traversableWithIndex.TraversableWithIndex<
  ArrayTypeLambda,
  number
> = {
  traverseWithIndex
}

export const product = <B>(that: Array<B>) =>
  <A>(self: Array<A>): Array<[A, B]> => {
    const out: Array<[A, B]> = []
    for (const a of self) {
      for (const b of that) {
        out.push([a, b])
      }
    }
    return out
  }

export const Of: of_.Of<ArrayTypeLambda> = {
  of: a => [a]
}

const SemiProduct: semiProduct.SemiProduct<ArrayTypeLambda> = {
  imap: Covariant.imap,
  product,
  productMany: semiProduct.productMany(Covariant, product)
}

export const SemiApplicative: semiApplicative.SemiApplicative<ArrayTypeLambda> = {
  ...Covariant,
  ...SemiProduct
}

export const filterMapWithIndex = <A, B>(f: (a: A, i: number) => Option<B>) =>
  (fa: Array<A>): Array<B> => {
    const out: Array<B> = []
    for (let i = 0; i < fa.length; i++) {
      const optionB = f(fa[i], i)
      if (O.isSome(optionB)) {
        out.push(optionB.value)
      }
    }
    return out
  }
