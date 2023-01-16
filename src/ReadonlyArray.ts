/**
 * @since 1.0.0
 */

import type { TypeLambda } from "@fp-ts/core/HKT"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as of_ from "@fp-ts/core/typeclass/Of"
import type * as product_ from "@fp-ts/core/typeclass/Product"
import type * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Target"]>
}

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyReadonlyArray<A> = readonly [A, ...Array<A>]

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyArray<A> = [A, ...Array<A>]

/**
 * @since 1.0.0
 */
export const isNonEmpty = <A>(as: ReadonlyArray<A>): as is NonEmptyReadonlyArray<A> => as.length > 0

/**
 * @category constructors
 * @since 1.0.0
 */
export const empty: <A = never>() => Array<A> = () => []

/**
 * Test whether a `ReadonlyArray` is empty narrowing down the type to `[]`.
 *
 * @category predicates
 * @since 1.0.0
 */
export const isEmpty = <A>(self: ReadonlyArray<A>): self is readonly [] => self.length === 0

/**
 * @since 1.0.0
 */
export const product = <B>(
  that: ReadonlyArray<B>
) =>
  <A>(self: ReadonlyArray<A>): Array<[A, B]> => {
    if (isEmpty(self) || isEmpty(that)) {
      return empty()
    }
    const out: Array<[A, B]> = []
    for (let i = 0; i < self.length; i++) {
      for (let j = 0; j < that.length; j++) {
        out.push([self[i], that[j]])
      }
    }
    return out
  }

/**
 * @category mapping
 * @since 1.0.0
 */
export const map = <A, B>(f: (a: A) => B): (self: ReadonlyArray<A>) => Array<B> =>
  mapWithIndex((a) => f(a))

/**
 * @category mapping
 * @since 1.0.0
 */
export const mapWithIndex = <A, B>(
  f: (a: A, i: number) => B
) => (self: ReadonlyArray<A>): Array<B> => self.map((a, i) => f(a, i))

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<ReadonlyArrayTypeLambda> = covariant.make(map)

/**
 * @since 1.0.0
 */
export const productMany: <A>(
  collection: Iterable<ReadonlyArray<A>>
) => (self: ReadonlyArray<A>) => ReadonlyArray<NonEmptyReadonlyArray<A>> = semiProduct
  .productMany(
    Covariant,
    product
  )

/**
 * @since 1.0.0
 */
export const productAll = <A>(
  collection: Iterable<ReadonlyArray<A>>
): ReadonlyArray<ReadonlyArray<A>> => {
  const arrays = Array.from(collection)
  if (isEmpty(arrays)) {
    return empty()
  }
  return productMany(arrays.slice(1))(arrays[0])
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const imap: <A, B>(
  to: (a: A) => B,
  from: (b: B) => A
) => (self: ReadonlyArray<A>) => ReadonlyArray<B> = covariant.imap<ReadonlyArrayTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<ReadonlyArrayTypeLambda> = {
  imap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<ReadonlyArrayTypeLambda> = {
  ...Invariant,
  product,
  productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<ReadonlyArrayTypeLambda> = {
  ...SemiProduct,
  ...Covariant
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const of = <A>(a: A): NonEmptyArray<A> => [a]

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<ReadonlyArrayTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<ReadonlyArrayTypeLambda> = {
  ...Of,
  ...SemiProduct,
  productAll
}
/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<ReadonlyArrayTypeLambda> = {
  ...SemiApplicative,
  ...Product
}
