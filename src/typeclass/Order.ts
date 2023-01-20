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
  readonly compare: (self: A, that: A) => -1 | 0 | 1
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface OrderTypeLambda extends TypeLambda {
  readonly type: Order<this["Target"]>
}

/**
 * @category instances
 * @since 1.0.0
 */
export const string: Order<string> = {
  compare: (self, that) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @category instances
 * @since 1.0.0
 */
export const number: Order<number> = {
  compare: (self, that) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @category instances
 * @since 1.0.0
 */
export const boolean: Order<boolean> = {
  compare: (self, that) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @category instances
 * @since 1.0.0
 */
export const bigint: Order<bigint> = {
  compare: (self, that) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * Main constructor.
 *
 * @category constructors
 * @since 1.0.0
 */
export const fromCompare = <A>(compare: Order<A>["compare"]): Order<A> => ({
  compare: (self, that) => self === that ? 0 : compare(self, that)
})

/**
 * This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
 * The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
 * It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
 * of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<any>>(
  ...orders: { readonly [K in keyof A]: Order<A[K]> }
): Order<Readonly<A>> =>
  fromCompare((self, that) => {
    let i = 0
    for (; i < orders.length - 1; i++) {
      const r = orders[i].compare(self[i], that[i])
      if (r !== 0) {
        return r
      }
    }
    return orders[i].compare(self[i], that[i])
  })

/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category combinators
 * @since 1.0.0
 */
export const array = <A>(O: Order<A>): Order<ReadonlyArray<A>> =>
  fromCompare((self, that) => {
    const aLen = self.length
    const bLen = that.length
    const len = Math.min(aLen, bLen)
    for (let i = 0; i < len; i++) {
      const o = O.compare(self[i], that[i])
      if (o !== 0) {
        return o
      }
    }
    return number.compare(aLen, bLen)
  })

/**
 * @since 1.0.0
 */
export const reverse = <A>(O: Order<A>): Order<A> =>
  fromCompare((self, that) => O.compare(that, self))

/**
 * @since 1.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Order<A>): Order<B> => fromCompare((b1, b2) => self.compare(f(b1), f(b2)))

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = <A>(): Semigroup<Order<A>> => ({
  combine: (O1, O2) =>
    fromCompare((self, that) => {
      const out = O1.compare(self, that)
      if (out !== 0) {
        return out
      }
      return O2.compare(self, that)
    }),
  combineMany: (self, collection) =>
    fromCompare((a1, a2) => {
      let out = self.compare(a1, a2)
      if (out !== 0) {
        return out
      }
      for (const O of collection) {
        out = O.compare(a1, a2)
        if (out !== 0) {
          return out
        }
      }
      return out
    })
})

const empty: Order<unknown> = fromCompare(() => 0)

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
  product: tuple,
  productMany: (self, collection) => tuple(self, ...collection)
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
export const lessThan = <A>(O: Order<A>) => (that: A) => (self: A) => O.compare(self, that) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThan = <A>(O: Order<A>) => (that: A) => (self: A) => O.compare(self, that) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A>(O: Order<A>) =>
  (that: A) => (self: A) => O.compare(self, that) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A>(O: Order<A>) =>
  (that: A) => (self: A) => O.compare(self, that) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const min = <A>(O: Order<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(self, that) < 1 ? self : that

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const max = <A>(O: Order<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(self, that) > -1 ? self : that

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
