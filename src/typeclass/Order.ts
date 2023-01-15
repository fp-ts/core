/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import type * as invariant from "@fp-ts/core/typeclass/Invariant"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as product from "@fp-ts/core/typeclass/Product"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import type * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Order<A> {
  readonly compare: (that: A) => (self: A) => -1 | 0 | 1
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface OrderTypeLambda extends TypeLambda {
  readonly type: Order<this["Target"]>
}

/**
 * Main constructor.
 *
 * @category constructors
 * @since 1.0.0
 */
export const fromCompare = <A>(compare: Order<A>["compare"]): Order<A> => ({
  compare: that => self => self === that ? 0 : compare(that)(self)
})

/**
 * Given a tuple of `Compare`s returns a `Compare` for the tuple.
 *
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<any>>(
  ...orders: { readonly [K in keyof A]: Order<A[K]> }
): Order<Readonly<A>> =>
  fromCompare(that =>
    self => {
      let i = 0
      for (; i < orders.length - 1; i++) {
        const r = orders[i].compare(that[i])(self[i])
        if (r !== 0) {
          return r
        }
      }
      return orders[i].compare(that[i])(self[i])
    }
  )

/**
 * @since 1.0.0
 */
export const reverse = <A>(O: Order<A>): Order<A> =>
  fromCompare(that => self => O.compare(self)(that))

/**
 * @since 1.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Order<A>): Order<B> => fromCompare((b2) => (b1) => self.compare(f(b2))(f(b1)))

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = <A>(): Semigroup<Order<A>> => ({
  combine: (O2) =>
    (O1) =>
      fromCompare(that =>
        self => {
          const out = O1.compare(that)(self)
          if (out !== 0) {
            return out
          }
          return O2.compare(that)(self)
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
          for (const O of collection) {
            out = O.compare(a2)(a1)
            if (out !== 0) {
              return out
            }
          }
          return out
        }
      )
})

const empty: Order<unknown> = fromCompare(() => () => 0)

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = <A>(): Monoid<Order<A>> => monoid.fromSemigroup(getSemigroup<A>(), empty)

/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant: contravariant.Contravariant<OrderTypeLambda> = contravariant.make(
  contramap
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<OrderTypeLambda> = {
  imap: Contravariant.imap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<OrderTypeLambda> = {
  imap: Contravariant.imap,
  product: that => self => tuple(self, that),
  productMany: collection => self => tuple(self, ...collection)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product.Product<OrderTypeLambda> = {
  ...SemiProduct,
  of: () => empty,
  productAll: <A>(collection: Iterable<Order<A>>) => tuple<Array<A>>(...collection)
}

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThan = <A>(O: Order<A>) => (that: A) => (self: A) => O.compare(that)(self) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThan = <A>(O: Order<A>) => (that: A) => (self: A) => O.compare(that)(self) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A>(O: Order<A>) =>
  (that: A) => (self: A) => O.compare(that)(self) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A>(O: Order<A>) =>
  (that: A) => (self: A) => O.compare(that)(self) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const min = <A>(O: Order<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(that)(self) < 1 ? self : that

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const max = <A>(O: Order<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(that)(self) > -1 ? self : that

/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 1.0.0
 */
export const clamp = <A>(O: Order<A>) =>
  (minimum: A, maximum: A) => (a: A) => min(O)(max(O)(a)(minimum))(maximum)

/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 1.0.0
 */
export const between = <A>(O: Order<A>) =>
  (minimum: A, maximum: A) =>
    (a: A): boolean => !lessThan(O)(minimum)(a) && !greaterThan(O)(maximum)(a)
