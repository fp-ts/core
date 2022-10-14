/**
 * @since 3.0.0
 */
import type * as contravariant from "@fp-ts/core/Contravariant"
import { flow } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import type { Ordering } from "@fp-ts/core/Ordering"
import type { Semigroup } from "@fp-ts/core/Semigroup"
import * as semigroup from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Comparable<A> {
  readonly compare: (a1: A, a2: A) => Ordering
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ComparableTypeLambda extends TypeLambda {
  readonly type: Comparable<this["In1"]>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromCompare = <A>(compare: (a1: A, a2: A) => Ordering): Comparable<A> => ({
  compare: (a1, a2) => a1 === a2 ? 0 : compare(a1, a2)
})

/**
 * Given a tuple of `Compare`s returns a `Compare` for the tuple.
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...compares: { [K in keyof A]: Comparable<A[K]> }
): Comparable<Readonly<A>> =>
  fromCompare((a1, a2) => {
    let i = 0
    for (; i < compares.length - 1; i++) {
      const r = compares[i].compare(a1[i], a2[i])
      if (r !== 0) {
        return r
      }
    }
    return compares[i].compare(a1[i], a2[i])
  })

/**
 * @since 3.0.0
 */
export const reverse = <A>(Comparable: Comparable<A>): Comparable<A> =>
  fromCompare((a1, a2) => Comparable.compare(a2, a1))

/**
 * @since 3.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Comparable<A>): Comparable<B> => fromCompare((a1, a2) => self.compare(f(a1), f(a2)))

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Comparable<A>> =>
  semigroup.fromCombineAllWith((start, all) =>
    fromCompare((a1, a2) => {
      let out = start.compare(a1, a2)
      if (out !== 0) {
        return out
      }
      for (const compare of all) {
        out = compare.compare(a1, a2)
        if (out !== 0) {
          return out
        }
      }
      return out
    })
  )

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Comparable<A>> =>
  monoid.fromSemigroup(getSemigroup<A>(), fromCompare(() => 0))

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<ComparableTypeLambda> = {
  contramap
}

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 3.0.0
 */
export const lt = <A>(O: Comparable<A>) =>
  (that: A) => (self: A): boolean => O.compare(self, that) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 3.0.0
 */
export const gt = <A>(O: Comparable<A>) =>
  (that: A) => (self: A): boolean => O.compare(self, that) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 3.0.0
 */
export const leq = <A>(O: Comparable<A>) =>
  (that: A) => (self: A): boolean => O.compare(self, that) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 3.0.0
 */
export const geq = <A>(O: Comparable<A>) =>
  (that: A) => (self: A): boolean => O.compare(self, that) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 3.0.0
 */
export const min = <A>(O: Comparable<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(self, that) < 1 ? self : that

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 3.0.0
 */
export const max = <A>(O: Comparable<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(self, that) > -1 ? self : that

/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 3.0.0
 */
export const clamp = <A>(O: Comparable<A>): ((low: A, hi: A) => (a: A) => A) => {
  const minO = min(O)
  const maxO = max(O)
  return (low, hi) => flow(minO(hi), maxO(low))
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 3.0.0
 */
export const between = <A>(O: Comparable<A>): ((low: A, hi: A) => (a: A) => boolean) => {
  const ltO = lt(O)
  const gtO = gt(O)
  return (low, hi) => (a) => ltO(low)(a) || gtO(hi)(a) ? false : true
}
