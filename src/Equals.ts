/**
 * @since 3.0.0
 */
import type { Compare } from "@fp-ts/core/Compare"
import type * as contravariant from "@fp-ts/core/Contravariant"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import type { Semigroup } from "@fp-ts/core/Semigroup"
import * as semigroup from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Equals<A> {
  readonly equals: (a1: A, a2: A) => boolean
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface EqTypeLambda extends TypeLambda {
  readonly type: Equals<this["In1"]>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEquals = <A>(equals: (a1: A, a2: A) => boolean): Equals<A> => ({
  equals: (a1: A, a2: A) => a1 === a2 || equals(a1, a2)
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromCompare = <A>(Compare: Compare<A>): Equals<A> =>
  fromEquals((a1, a2) => Compare.compare(a1, a2) === 0)

/**
 * @since 3.0.0
 */
export const struct = <A>(
  equals: { [K in keyof A]: Equals<A[K]> }
): Equals<{ readonly [K in keyof A]: A[K] }> =>
  fromEquals((a1, a2) => {
    for (const key in equals) {
      if (!equals[key].equals(a1[key], a2[key])) {
        return false
      }
    }
    return true
  })

/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...eqs: { [K in keyof A]: Equals<A[K]> }
): Equals<Readonly<Readonly<A>>> =>
  fromEquals((a1, a2) => eqs.every((E, i) => E.equals(a1[i], a2[i])))

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Equals<A>): Equals<B> => fromEquals((a1, a2) => self.equals(f(a1), f(a2)))

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Equals<A>> =>
  semigroup.fromCombine(
    (self, that) => fromEquals((a1, a2) => self.equals(a1, a2) && that.equals(a1, a2))
  )

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Equals<A>> => ({
  ...getSemigroup<A>(),
  empty: {
    equals: () => true
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<EqTypeLambda> = {
  contramap
}
