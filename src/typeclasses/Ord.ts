/**
 * The `Ord` type class represents types which support comparisons with a _total order_.
 *
 * Instances should satisfy the laws of total orderings:
 *
 * 1. Reflexivity: `a |> compare(a) <= 0`
 * 2. Antisymmetry: if `a |> compare(b) <= 0` and `b |> compare(a) <= 0` then `a <-> b`
 * 3. Transitivity: if `a |> compare(b) <= 0` and `b |> S.compare(c) <= 0` then `a |> compare(c) <= 0`
 *
 * @since 3.0.0
 */
import { flow } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type * as contravariant from "@fp-ts/core/typeclasses/Contravariant"
import type { Eq } from "@fp-ts/core/typeclasses/Eq"
import type { Monoid } from "@fp-ts/core/typeclasses/Monoid"
import type { Ordering } from "@fp-ts/core/typeclasses/Ordering"
import type { Semigroup } from "@fp-ts/core/typeclasses/Semigroup"

/**
 * @category model
 * @since 3.0.0
 */
export interface Ord<A> {
  readonly compare: (that: A) => (self: A) => Ordering
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromCompare = <A>(compare: Ord<A>["compare"]): Ord<A> => ({
  compare: (that) => (self) => self === that ? 0 : compare(that)(self)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const trivial: Ord<unknown> = {
  compare: () => () => 0
}

/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple.
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...ords: { [K in keyof A]: Ord<A[K]> }
): Ord<Readonly<A>> =>
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
export const reverse = <A>(O: Ord<A>): Ord<A> =>
  fromCompare((that) => (self) => O.compare(self)(that))

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B> = (f) =>
  (fa) => fromCompare((that) => (self) => fa.compare(f(that))(f(self)))

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface OrdTypeLambda extends TypeLambda {
  readonly type: Ord<this["In1"]>
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
export const getSemigroup = <A>(): Semigroup<Ord<A>> => ({
  combine: (that) =>
    (self) =>
      fromCompare((a2) =>
        (a1) => {
          const ox = self.compare(a2)(a1)
          return ox !== 0 ? ox : that.compare(a2)(a1)
        }
      )
})

/**
 * Returns a `Monoid` such that:
 *
 * - `pipe(ord1, combine(ord2))` will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Ord<A>> => ({
  combine: getSemigroup<A>().combine,
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
export const equals = <A>(O: Ord<A>): Eq<A>["equals"] =>
  (that: A) => (self: A) => self === that || O.compare(that)(self) === 0

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 3.0.0
 */
export const lt = <A>(O: Ord<A>) => (that: A) => (self: A): boolean => O.compare(that)(self) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 3.0.0
 */
export const gt = <A>(O: Ord<A>) => (that: A) => (self: A): boolean => O.compare(that)(self) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 3.0.0
 */
export const leq = <A>(O: Ord<A>) => (that: A) => (self: A): boolean => O.compare(that)(self) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 3.0.0
 */
export const geq = <A>(O: Ord<A>) => (that: A) => (self: A): boolean => O.compare(that)(self) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 3.0.0
 */
export const min = <A>(O: Ord<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(that)(self) < 1 ? self : that

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 3.0.0
 */
export const max = <A>(O: Ord<A>) =>
  (that: A) => (self: A): A => self === that || O.compare(that)(self) > -1 ? self : that

/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 3.0.0
 */
export const clamp = <A>(O: Ord<A>): ((low: A, hi: A) => (a: A) => A) => {
  const minO = min(O)
  const maxO = max(O)
  return (low, hi) => flow(minO(hi), maxO(low))
}

/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 3.0.0
 */
export const between = <A>(O: Ord<A>): ((low: A, hi: A) => (a: A) => boolean) => {
  const ltO = lt(O)
  const gtO = gt(O)
  return (low, hi) => (a) => ltO(low)(a) || gtO(hi)(a) ? false : true
}
