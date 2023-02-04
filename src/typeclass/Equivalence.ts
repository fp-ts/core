/**
 * This module provides an implementation of the `Equivalence` type class, which defines a binary relation
 * that is reflexive, symmetric, and transitive. In other words, it defines a notion of equivalence between values of a certain type.
 * These properties are also known in mathematics as an "equivalence relation".
 *
 * @since 1.0.0
 */
import { dual } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { ReadonlyRecord } from "@fp-ts/core/ReadonlyRecord"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import type * as invariant from "@fp-ts/core/typeclass/Invariant"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as product from "@fp-ts/core/typeclass/Product"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Equivalence<A> {
  (that: A): (self: A) => boolean
  (self: A, that: A): boolean
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface EquivalenceTypeLambda extends TypeLambda {
  readonly type: Equivalence<this["Target"]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <A>(isEquivalent: (self: A, that: A) => boolean): Equivalence<A> =>
  dual(2, (self: A, that: A): boolean => self === that || isEquivalent(self, that))

/**
 * Return an `Equivalence` that uses strict equality (===) to compare values
 *
 * @since 1.0.0
 * @category constructors
 */
export const strict: <A>() => Equivalence<A> = () => dual(2, (x, y) => x === y)

/**
 * @category instances
 * @since 1.0.0
 */
export const string: Equivalence<string> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const number: Equivalence<number> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const boolean: Equivalence<boolean> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const bigint: Equivalence<bigint> = strict()

/**
 * @category instances
 * @since 1.0.0
 */
export const symbol: Equivalence<symbol> = strict()

/**
 * Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
 * by applying each `Equivalence` to the corresponding element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<any>>(
  ...equivalences: { readonly [K in keyof A]: Equivalence<A[K]> }
): Equivalence<Readonly<A>> =>
  make((x, y) => equivalences.every((equivalence, i) => equivalence(x[i], y[i])))

/**
 * Given an `Equivalence` of type `A`, returns a new `Equivalence` of type `ReadonlyArray<A>`.
 * The returned `Equivalence` compares arrays by first checking their length and then applying the provided `Equivalence` to each element.
 * If all comparisons return true, the arrays are considered equal.
 *
 * @category combinators
 * @since 1.0.0
 */
export const array = <A>(
  equivalence: Equivalence<A>
): Equivalence<ReadonlyArray<A>> =>
  make((x, y) => x.length === y.length && x.every((a, i) => equivalence(a, y[i])))

/**
 * Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
 * by applying each `Equivalence` to the corresponding property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct = <A>(
  equivalences: { [K in keyof A]: Equivalence<A[K]> }
): Equivalence<{ readonly [K in keyof A]: A[K] }> =>
  make((x, y) => {
    for (const key in equivalences) {
      if (!equivalences[key](x[key], y[key])) {
        return false
      }
    }
    return true
  })

/**
 * Given an `Equivalence` of type `A`, returns a new `Equivalence` of type `{ readonly [x: string]: A }`.
 * The returned `Equivalence` compares records by first checking their number of keys and then applying the provided `Equivalence` to each value.
 * If all comparisons return true, the records are considered equal.
 *
 * @category combinators
 * @since 1.0.0
 */
export const record = <A>(
  equivalence: Equivalence<A>
): Equivalence<ReadonlyRecord<A>> =>
  make((x, y) => {
    const keys = Object.keys(x)
    if (Object.keys(y).length !== keys.length) {
      return false
    }
    for (const key of keys) {
      if (!equivalence(x[key], y[key])) {
        return false
      }
    }
    return true
  })

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = <A>(): Semigroup<Equivalence<A>> =>
  semigroup.make(
    (self, that) => make((x, y) => self(x, y) && that(x, y)),
    (self, collection) =>
      make((x, y) => {
        if (!self(x, y)) {
          return false
        }
        for (const equivalence of collection) {
          if (!equivalence(x, y)) {
            return false
          }
        }
        return true
      })
  )

const empty: Equivalence<unknown> = dual(2, (_x, _y) => true)

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = <A>(): Monoid<Equivalence<A>> =>
  monoid.fromSemigroup(getSemigroup<A>(), empty)

/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant: contravariant.Contravariant<EquivalenceTypeLambda> = contravariant.make(
  <A, B>(self: Equivalence<A>, f: (b: B) => A): Equivalence<B> => make((x, y) => self(f(x), f(y)))
)

/**
 * @category combinators
 * @since 1.0.0
 */
export const contramap: {
  <B, A>(f: (b: B) => A): (self: Equivalence<A>) => Equivalence<B>
  <A, B>(self: Equivalence<A>, f: (b: B) => A): Equivalence<B>
} = Contravariant.contramap

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<EquivalenceTypeLambda> = {
  imap: Contravariant.imap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<EquivalenceTypeLambda> = semiProduct.make(
  Invariant,
  tuple,
  (self, collection) => tuple(self, ...collection)
)
/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product.Product<EquivalenceTypeLambda> = {
  of: () => empty,
  imap: Invariant.imap,
  product: SemiProduct.product,
  productMany: SemiProduct.productMany,
  productAll: <A>(collection: Iterable<Equivalence<A>>) => tuple<Array<A>>(...collection)
}
