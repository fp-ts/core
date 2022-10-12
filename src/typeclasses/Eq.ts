/**
 * The `Eq` type class represents types which support decidable equality.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Reflexivity: `a |> equals(a) === true`
 * 2. Symmetry: `a |> equals(b) === b |> equals(a)`
 * 3. Transitivity: if `a |> equals(b) === true` and `b |> equals(c) === true`, then `a |> equals(c) === true`
 *
 * @since 3.0.0
 */
import { flow } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type * as contravariant from "@fp-ts/core/typeclasses/Contravariant"
import type { Monoid } from "@fp-ts/core/typeclasses/Monoid"
import type { Ord } from "@fp-ts/core/typeclasses/Ord"
import type { Semigroup } from "@fp-ts/core/typeclasses/Semigroup"

/**
 * @category model
 * @since 3.0.0
 */
export interface Eq<A> {
  readonly equals: (that: A) => (self: A) => boolean
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEquals = <A>(equals: Eq<A>["equals"]): Eq<A> => ({
  equals: (that) => {
    const predicate = equals(that)
    return (self) => self === that || predicate(self)
  }
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromOrd = <A>(O: Ord<A>): Eq<A> =>
  fromEquals((that) => (self) => O.compare(that)(self) === 0)

/**
 * @since 3.0.0
 */
export const struct = <A>(
  eqs: { [K in keyof A]: Eq<A[K]> }
): Eq<{ readonly [K in keyof A]: A[K] }> =>
  fromEquals((that) =>
    (self) => {
      for (const key in eqs) {
        if (!eqs[key].equals(that[key])(self[key])) {
          return false
        }
      }
      return true
    }
  )

/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...eqs: { [K in keyof A]: Eq<A[K]> }
): Eq<Readonly<Readonly<A>>> =>
  fromEquals((that) => (self) => eqs.every((E, i) => E.equals(that[i])(self[i])))

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => (self: Eq<A>) => Eq<B> = (f) =>
  (self) => fromEquals((that) => flow(f, self.equals(f(that))))

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface EqTypeLambda extends TypeLambda {
  readonly type: Eq<this["In1"]>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const EqStrict: Eq<unknown> = {
  equals: (that) => (self) => self === that
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Eq<A>> => ({
  combine: (that) => (self) => fromEquals((b) => (a) => self.equals(b)(a) && that.equals(b)(a))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Eq<A>> => ({
  combine: getSemigroup<A>().combine,
  empty: {
    equals: () => () => true
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<EqTypeLambda> = {
  contramap
}
