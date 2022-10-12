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

/**
 * @category model
 * @since 3.0.0
 */
export interface Compare<A> {
  readonly compare: (that: A) => (self: A) => Ordering
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromCompare = <A>(compare: Compare<A>["compare"]): Compare<A> => ({
  compare: (that) => (self) => self === that ? 0 : compare(that)(self)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const trivial: Compare<unknown> = {
  compare: () => () => 0
}

/**
 * @category instances
 * @since 3.0.0
 */
export const CompareNumber: Compare<number> = fromCompare((that) =>
  (self) => self < that ? -1 : self > that ? 1 : 0
)

/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple.
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...ords: { [K in keyof A]: Compare<A[K]> }
): Compare<Readonly<A>> =>
  fromCompare((that) =>
    (self) => {
      let i = 0
      for (; i < ords.length - 1; i++) {
        const r = ords[i].compare(that[i])(self[i])
        if (r !== 0) {
          return r
        }
      }
      return ords[i].compare(that[i])(self[i])
    }
  )

/**
 * @since 3.0.0
 */
export const reverse = <A>(O: Compare<A>): Compare<A> =>
  fromCompare((that) => (self) => O.compare(self)(that))

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => (fa: Compare<A>) => Compare<B> = (f) =>
  (fa) => fromCompare((that) => (self) => fa.compare(f(that))(f(self)))

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface OrdTypeLambda extends TypeLambda {
  readonly type: Compare<this["In1"]>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Returns a `Semigroup` such that `pipe(ord1, combine(ord2))` will order first by `ord1`,
 * and then by `ord2`
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Compare<A>> => {
  const combine = (Compare1: Compare<A>, Compare2: Compare<A>) =>
    fromCompare((a2: A) =>
      (a1: A) => {
        const ordering = Compare1.compare(a2)(a1)
        return ordering !== 0 ? ordering : Compare2.compare(a2)(a1)
      }
    )
  return {
    combineAll: (head, ...tail) => tail.reduce((acc, a) => combine(acc, a), head)
  }
}

/**
 * Returns a `Monoid` such that:
 *
 * - `pipe(ord1, combine(ord2))` will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Compare<A>> => ({
  combineAll: getSemigroup<A>().combineAll,
  empty: fromCompare(() => () => 0)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<OrdTypeLambda> = {
  contramap
}

/**
 * @since 3.0.0
 */
export const equals = <A>(O: Compare<A>): Equals<A>["equals"] =>
  (that: A) => (self: A) => self === that || O.compare(that)(self) === 0

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 3.0.0
 */
export const lt = <A>(O: Compare<A>) =>
  (that: A) => (self: A): boolean => O.compare(that)(self) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 3.0.0
 */
export const gt = <A>(O: Compare<A>) =>
  (that: A) => (self: A): boolean => O.compare(that)(self) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 3.0.0
 */
export const leq = <A>(O: Compare<A>) =>
  (that: A) => (self: A): boolean => O.compare(that)(self) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 3.0.0
 */
export const geq = <A>(O: Compare<A>) =>
  (that: A) => (self: A): boolean => O.compare(that)(self) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 3.0.0
 */
export const min = <A>(O: Compare<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(that)(self) < 1 ? self : that

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 3.0.0
 */
export const max = <A>(O: Compare<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(that)(self) > -1 ? self : that

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
