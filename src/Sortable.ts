/**
 * @since 1.0.0
 */
import type * as contravariant from "@fp-ts/core/Contravariant"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import type { Ordering } from "@fp-ts/core/Ordering"
import type { Semigroup } from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Sortable<A> {
  readonly compare: (first: A, second: A) => Ordering
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface SortableTypeLambda extends TypeLambda {
  readonly type: Sortable<this["In1"]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromCompare = <A>(compare: Sortable<A>["compare"]): Sortable<A> => ({
  compare: (first, second) => first === second ? 0 : compare(first, second)
})

/**
 * Given a tuple of `Compare`s returns a `Compare` for the tuple.
 *
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...compares: { [K in keyof A]: Sortable<A[K]> }
): Sortable<Readonly<A>> =>
  fromCompare((first, second) => {
    let i = 0
    for (; i < compares.length - 1; i++) {
      const r = compares[i].compare(first[i], second[i])
      if (r !== 0) {
        return r
      }
    }
    return compares[i].compare(first[i], second[i])
  })

/**
 * @since 1.0.0
 */
export const reverse = <A>(Sortable: Sortable<A>): Sortable<A> =>
  fromCompare((first, second) => Sortable.compare(second, first))

/**
 * @since 1.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Sortable<A>): Sortable<B> =>
    fromCompare((first, second) => self.compare(f(first), f(second)))

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = <A>(): Semigroup<Sortable<A>> => ({
  combine: (s1, s2) =>
    fromCompare((first, second) => {
      const out = s1.compare(first, second)
      if (out !== 0) {
        return out
      }
      return s2.compare(first, second)
    }),
  combineMany: (start, others) =>
    fromCompare((first, second) => {
      let out = start.compare(first, second)
      if (out !== 0) {
        return out
      }
      for (const sortable of others) {
        out = sortable.compare(first, second)
        if (out !== 0) {
          return out
        }
      }
      return out
    })
})

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = <A>(): Monoid<Sortable<A>> =>
  monoid.fromSemigroup(getSemigroup<A>(), fromCompare(() => 0))

/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant: contravariant.Contravariant<SortableTypeLambda> = {
  contramap
}

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lt = <A>(Sortable: Sortable<A>) =>
  (first: A, second: A) => Sortable.compare(first, second) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const gt = <A>(Sortable: Sortable<A>) =>
  (first: A, second: A) => Sortable.compare(first, second) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 1.0.0
 */
export const leq = <A>(Sortable: Sortable<A>) =>
  (first: A, second: A) => Sortable.compare(first, second) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const geq = <A>(Sortable: Sortable<A>) =>
  (first: A, second: A) => Sortable.compare(first, second) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const min = <A>(Sortable: Sortable<A>) =>
  (first: A, second: A): A =>
    first === second || Sortable.compare(first, second) < 1 ? first : second

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const max = <A>(Sortable: Sortable<A>) =>
  (first: A, second: A): A =>
    first === second || Sortable.compare(first, second) > -1 ? first : second

/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 1.0.0
 */
export const clamp = <A>(Sortable: Sortable<A>) => {
  const min_ = min(Sortable)
  const max_ = max(Sortable)
  return (minimum: A, maximum: A) => (a: A) => min_(maximum, max_(minimum, a))
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 1.0.0
 */
export const between = <A>(Sortable: Sortable<A>) => {
  const lt_ = lt(Sortable)
  const gt_ = gt(Sortable)
  return (minimum: A, maximum: A) => (a: A): boolean => !lt_(a, minimum) && !gt_(a, maximum)
}
