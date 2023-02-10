/**
 * @since 1.0.0
 */
import { dual } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type * as invariant from "@fp-ts/core/typeclass/Invariant"
import type { Order } from "@fp-ts/core/typeclass/Order"
import type * as product_ from "@fp-ts/core/typeclass/Product"
import type * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Semigroup<A> {
  readonly combine: (self: A, that: A) => A
  readonly combineMany: (self: A, collection: Iterable<A>) => A
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface SemigroupTypeLambda extends TypeLambda {
  readonly type: Semigroup<this["Target"]>
}

/**
 * @param combineMany - Useful when `combineMany` can be optimised
 *
 * @category constructors
 * @since 1.0.0
 */
export const make = <A>(
  combine: Semigroup<A>["combine"],
  combineMany: Semigroup<A>["combineMany"] = (self, collection) => {
    if (Array.isArray(collection)) {
      return collection.reduce(combine, self)
    }
    let result = self
    for (const n of collection) {
      result = combine(result, n)
    }
    return result
  }
): Semigroup<A> => ({
  combine,
  combineMany
})

/**
 * @category instances
 * @since 1.0.0
 */
export const string: Semigroup<string> = make((self, that) => self + that)

/**
 * `number` semigroup under addition.
 *
 * @category instances
 * @since 1.0.0
 */
export const numberSum: Semigroup<number> = make((self, that) => self + that)

/**
 * `number` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
export const numberMultiply: Semigroup<number> = make(
  (self, that) => self * that,
  (self, collection) => {
    if (self === 0) {
      return 0
    }
    let out = self
    for (const n of collection) {
      if (n === 0) {
        return 0
      }
      out = out * n
    }
    return out
  }
)

/**
 * `bigint` semigroup under addition.
 *
 * @category instances
 * @since 1.0.0
 */
export const bigintSum: Semigroup<bigint> = make((self, that) => self + that)

/**
 * `bigint` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
export const bigintMultiply: Semigroup<bigint> = make(
  (self, that) => self * that,
  (self, collection) => {
    if (self === 0n) {
      return 0n
    }
    let out = self
    for (const n of collection) {
      if (n === 0n) {
        return 0n
      }
      out = out * n
    }
    return out
  }
)

/**
 * `boolean` semigroup under conjunction.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanAll: Semigroup<boolean> = make(
  (self, that) => self && that,
  (self, collection) => {
    if (self === false) {
      return false
    }
    for (const b of collection) {
      if (b === false) {
        return false
      }
    }
    return true
  }
)

/**
 * `boolean` semigroup under disjunction.
 *
 * @category instances
 * @since 1.0.0
 */
export const booleanAny: Semigroup<boolean> = make(
  (self, that) => self || that,
  (self, collection) => {
    if (self === true) {
      return true
    }
    for (const b of collection) {
      if (b === true) {
        return true
      }
    }
    return false
  }
)

/**
 * This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
 * The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<any>>(
  ...semigroups: { readonly [K in keyof A]: Semigroup<A[K]> }
): Semigroup<A> =>
  make((self, that) => semigroups.map((S, i) => S.combine(self[i], that[i])) as any)

/**
 * Given a type `A`, this function creates and returns a `Semigroup` for `Array<A>`.
 * The returned `Semigroup` combines two arrays by concatenating them.
 *
 * @category combinators
 * @since 1.0.0
 */
export const mutableArray = <A>(): Semigroup<Array<A>> => make((self, that) => self.concat(that))

/**
 * Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
 * The returned `Semigroup` combines two arrays by concatenating them.
 *
 * @category combinators
 * @since 1.0.0
 */
export const array: <A>() => Semigroup<ReadonlyArray<A>> = mutableArray as any

/**
 * This function creates and returns a new `Semigroup` for a struct of values based on the given `Semigroup`s for each property in the struct.
 * The returned `Semigroup` combines two structs of the same type by applying the corresponding `Semigroup` passed as arguments to each property in the struct.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct = <A>(semigroups: { readonly [K in keyof A]: Semigroup<A[K]> }): Semigroup<
  { readonly [K in keyof A]: A[K] }
> =>
  make((self, that) => {
    const r = {} as any
    for (const k in semigroups) {
      if (Object.prototype.hasOwnProperty.call(semigroups, k)) {
        r[k] = semigroups[k].combine(self[k], that[k])
      }
    }
    return r
  })

/**
 * `Semigroup` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = <A>(O: Order<A>): Semigroup<A> =>
  make((self, that) => O.compare(self, that) === -1 ? self : that)

/**
 * `Semigroup` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = <A>(O: Order<A>): Semigroup<A> =>
  make((self, that) => O.compare(self, that) === 1 ? self : that)

/**
 * @category constructors
 * @since 1.0.0
 */
export const constant = <A>(a: A): Semigroup<A> => make(() => a, () => a)

/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 1.0.0
 */
export const reverse = <A>(S: Semigroup<A>): Semigroup<A> =>
  make(
    (self, that) => S.combine(that, self),
    (self, collection) => {
      const reversed = Array.from(collection).reverse()
      return reversed.length > 0 ?
        S.combine(S.combineMany(reversed[0], reversed.slice(1)), self) :
        self
    }
  )

/**
 * @since 1.0.0
 */
export const intercalate: {
  <A>(separator: A): (S: Semigroup<A>) => Semigroup<A>
  <A>(S: Semigroup<A>, separator: A): Semigroup<A>
} = dual(
  2,
  <A>(S: Semigroup<A>, separator: A): Semigroup<A> =>
    make((self, that) => S.combineMany(self, [separator, that]))
)

/**
 * Always return the first argument.
 *
 * @category instances
 * @since 1.0.0
 */
export const first = <A = never>(): Semigroup<A> => make((a) => a, (a) => a)

/**
 * Always return the last argument.
 *
 * @category instances
 * @since 1.0.0
 */
export const last = <A = never>(): Semigroup<A> =>
  make(
    (_, second) => second,
    (self, collection) => {
      let a: A = self
      // eslint-disable-next-line no-empty
      for (a of collection) {}
      return a
    }
  )

/**
 * @since 1.0.0
 */
export const imap: {
  <A, B>(to: (a: A) => B, from: (b: B) => A): (self: Semigroup<A>) => Semigroup<B>
  <A, B>(self: Semigroup<A>, to: (a: A) => B, from: (b: B) => A): Semigroup<B>
} = dual(3, <A, B>(S: Semigroup<A>, to: (a: A) => B, from: (b: B) => A): Semigroup<B> =>
  make(
    (self, that) => to(S.combine(from(self), from(that))),
    (self, collection) => {
      const mappedCollection = (Array.isArray(collection)) ? collection.map(from) : (function*() {
        for (const n of collection) {
          yield from(n)
        }
      })()

      return to(S.combineMany(
        from(self),
        mappedCollection
      ))
    }
  ))

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<SemigroupTypeLambda> = {
  imap
}

const product = <A, B>(self: Semigroup<A>, that: Semigroup<B>): Semigroup<[A, B]> =>
  tuple(self, that)

const productMany = <A>(
  self: Semigroup<A>,
  collection: Iterable<Semigroup<A>>
): Semigroup<[A, ...Array<A>]> => tuple(self, ...collection)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<SemigroupTypeLambda> = {
  imap,
  product,
  productMany
}

const of: <A>(a: A) => Semigroup<A> = constant

const productAll = <A>(collection: Iterable<Semigroup<A>>): Semigroup<Array<A>> =>
  tuple<Array<A>>(...collection)

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<SemigroupTypeLambda> = {
  of,
  imap: Invariant.imap,
  product,
  productMany,
  productAll
}
