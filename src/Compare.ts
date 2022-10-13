/**
 * @since 3.0.0
 */
import type * as contravariant from "@fp-ts/core/Contravariant"
import type { Equals } from "@fp-ts/core/Equals"
import { flow } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import type { Ordering } from "@fp-ts/core/Ordering"
import type { Semigroup } from "@fp-ts/core/Semigroup"
import * as semigroup from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Compare<A> {
  readonly compare: (a1: A, a2: A) => Ordering
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface CompareTypeLambda extends TypeLambda {
  readonly type: Compare<this["In1"]>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromCompare = <A>(compare: (a1: A, a2: A) => Ordering): Compare<A> => ({
  compare: (a1, a2) => a1 === a2 ? 0 : compare(a1, a2)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const trivial: Compare<unknown> = {
  compare: () => 0
}

/**
 * Given a tuple of `Compare`s returns a `Compare` for the tuple.
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...compares: { [K in keyof A]: Compare<A[K]> }
): Compare<Readonly<A>> =>
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
export const reverse = <A>(O: Compare<A>): Compare<A> => fromCompare((a1, a2) => O.compare(a2, a1))

/**
 * @since 3.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Compare<A>): Compare<B> => fromCompare((a1, a2) => self.compare(f(a1), f(a2)))

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Compare<A>> =>
  semigroup.fromCombineOf((head, tail) =>
    fromCompare((a1, a2) => {
      let out = head.compare(a1, a2)
      if (out !== 0) {
        return out
      }
      for (const compare of tail) {
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
export const getMonoid = <A>(): Monoid<Compare<A>> => ({
  ...getSemigroup<A>(),
  empty: fromCompare(() => 0)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEquals = <A>(Compare: Compare<A>): Equals<A> => ({
  equals: (a1: A, a2: A) => a1 === a2 || Compare.compare(a1, a2) === 0
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<CompareTypeLambda> = {
  contramap
}

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 3.0.0
 */
export const lt = <A>(O: Compare<A>) =>
  (that: A) => (self: A): boolean => O.compare(self, that) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 3.0.0
 */
export const gt = <A>(O: Compare<A>) =>
  (that: A) => (self: A): boolean => O.compare(self, that) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 3.0.0
 */
export const leq = <A>(O: Compare<A>) =>
  (that: A) => (self: A): boolean => O.compare(self, that) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 3.0.0
 */
export const geq = <A>(O: Compare<A>) =>
  (that: A) => (self: A): boolean => O.compare(self, that) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 3.0.0
 */
export const min = <A>(O: Compare<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(self, that) < 1 ? self : that

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 3.0.0
 */
export const max = <A>(O: Compare<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(self, that) > -1 ? self : that

/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 3.0.0
 */
export const clamp = <A>(O: Compare<A>): ((low: A, hi: A) => (a: A) => A) => {
  const minO = min(O)
  const maxO = max(O)
  return (low, hi) => flow(minO(hi), maxO(low))
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 3.0.0
 */
export const between = <A>(O: Compare<A>): ((low: A, hi: A) => (a: A) => boolean) => {
  const ltO = lt(O)
  const gtO = gt(O)
  return (low, hi) => (a) => ltO(low)(a) || gtO(hi)(a) ? false : true
}
