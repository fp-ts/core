/**
 * @since 1.0.0
 */
import type { TotalOrdering } from "@fp-ts/core/data/TotalOrdering"
import type { TypeLambda } from "@fp-ts/core/HKT"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import type * as invariant from "@fp-ts/core/typeclass/Invariant"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as nonEmptyProduct from "@fp-ts/core/typeclass/NonEmptyProduct"
import type * as product from "@fp-ts/core/typeclass/Product"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category type class
 * @since 1.0.0
 */
export interface TotalOrder<A> {
  readonly compare: (that: A) => (self: A) => TotalOrdering
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface TotalOrderTypeLambda extends TypeLambda {
  readonly type: TotalOrder<this["Target"]>
}

/**
 * Main constructor.
 *
 * @category constructors
 * @since 1.0.0
 */
export const fromCompare = <A>(compare: TotalOrder<A>["compare"]): TotalOrder<A> => ({
  compare: that => self => self === that ? 0 : compare(that)(self)
})

/**
 * Given a tuple of `Compare`s returns a `Compare` for the tuple.
 *
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...totalOrders: { [K in keyof A]: TotalOrder<A[K]> }
): TotalOrder<Readonly<A>> =>
  fromCompare(that =>
    self => {
      let i = 0
      for (; i < totalOrders.length - 1; i++) {
        const r = totalOrders[i].compare(that[i])(self[i])
        if (r !== 0) {
          return r
        }
      }
      return totalOrders[i].compare(that[i])(self[i])
    }
  )

/**
 * @since 1.0.0
 */
export const reverse = <A>(TotalOrder: TotalOrder<A>): TotalOrder<A> =>
  fromCompare(that => self => TotalOrder.compare(self)(that))

/**
 * @since 1.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: TotalOrder<A>): TotalOrder<B> => fromCompare((b2) => (b1) => self.compare(f(b2))(f(b1)))

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = <A>(): Semigroup<TotalOrder<A>> => ({
  combine: (totalOrder2) =>
    (totalOrder1) =>
      fromCompare(that =>
        self => {
          const out = totalOrder1.compare(that)(self)
          if (out !== 0) {
            return out
          }
          return totalOrder2.compare(that)(self)
        }
      ),
  combineMany: (collection) =>
    (self) =>
      fromCompare(a2 =>
        a1 => {
          let out = self.compare(a2)(a1)
          if (out !== 0) {
            return out
          }
          for (const totalOrder of collection) {
            out = totalOrder.compare(a2)(a1)
            if (out !== 0) {
              return out
            }
          }
          return out
        }
      )
})

const empty: TotalOrder<unknown> = fromCompare(() => () => 0)

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = <A>(): Monoid<TotalOrder<A>> =>
  monoid.fromSemigroup(getSemigroup<A>(), empty)

/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant: contravariant.Contravariant<TotalOrderTypeLambda> = {
  contramap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<TotalOrderTypeLambda> = {
  imap: contravariant.imap(Contravariant)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const NonEmptyProduct: nonEmptyProduct.NonEmptyProduct<TotalOrderTypeLambda> = {
  ...Invariant,
  product: that => self => tuple(self, that),
  productMany: collection => self => tuple(self, ...collection)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product.Product<TotalOrderTypeLambda> = {
  ...NonEmptyProduct,
  of: () => empty,
  productAll: <A>(collection: Iterable<TotalOrder<A>>) => tuple<Array<A>>(...collection)
}

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThan = <A>(TotalOrder: TotalOrder<A>) =>
  (that: A) => (self: A) => TotalOrder.compare(that)(self) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThan = <A>(TotalOrder: TotalOrder<A>) =>
  (that: A) => (self: A) => TotalOrder.compare(that)(self) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A>(TotalOrder: TotalOrder<A>) =>
  (that: A) => (self: A) => TotalOrder.compare(that)(self) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A>(TotalOrder: TotalOrder<A>) =>
  (that: A) => (self: A) => TotalOrder.compare(that)(self) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const min = <A>(TotalOrder: TotalOrder<A>) =>
  (that: A) => (self: A): A => self === that || TotalOrder.compare(that)(self) < 1 ? self : that

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const max = <A>(TotalOrder: TotalOrder<A>) =>
  (that: A) => (self: A): A => self === that || TotalOrder.compare(that)(self) > -1 ? self : that

/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 1.0.0
 */
export const clamp = <A>(TotalOrder: TotalOrder<A>) =>
  (minimum: A, maximum: A) => (a: A) => min(TotalOrder)(max(TotalOrder)(a)(minimum))(maximum)

/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 1.0.0
 */
export const between = <A>(TotalOrder: TotalOrder<A>) =>
  (minimum: A, maximum: A) =>
    (a: A): boolean => !lessThan(TotalOrder)(minimum)(a) && !greaterThan(TotalOrder)(maximum)(a)
