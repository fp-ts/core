/**
 * @since 1.0.0
 */
import type { Ordering } from "@fp-ts/core/data/Ordering"
import type { TypeLambda } from "@fp-ts/core/HKT"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import type * as invariant from "@fp-ts/core/typeclass/Invariant"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Sortable<A> {
  readonly compare: (that: A) => (self: A) => Ordering
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface SortableTypeLambda extends TypeLambda {
  readonly type: Sortable<this["Out"]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromCompare = <A>(compare: Sortable<A>["compare"]): Sortable<A> => ({
  compare: (that) => (self) => self === that ? 0 : compare(that)(self)
})

/**
 * Given a tuple of `Compare`s returns a `Compare` for the tuple.
 *
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...compares: { [K in keyof A]: Sortable<A[K]> }
): Sortable<Readonly<A>> =>
  fromCompare((that) =>
    (self) => {
      let i = 0
      for (; i < compares.length - 1; i++) {
        const r = compares[i].compare(that[i])(self[i])
        if (r !== 0) {
          return r
        }
      }
      return compares[i].compare(that[i])(self[i])
    }
  )

/**
 * @since 1.0.0
 */
export const reverse = <A>(Sortable: Sortable<A>): Sortable<A> =>
  fromCompare((that) => (self) => Sortable.compare(self)(that))

/**
 * @since 1.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Sortable<A>): Sortable<B> => fromCompare((b2) => (b1) => self.compare(f(b2))(f(b1)))

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = <A>(): Semigroup<Sortable<A>> => ({
  combine: (sortable2) =>
    (sortable1) =>
      fromCompare((that) =>
        (self) => {
          const out = sortable1.compare(that)(self)
          if (out !== 0) {
            return out
          }
          return sortable2.compare(that)(self)
        }
      ),
  combineMany: (collection) =>
    (self) =>
      fromCompare((a2) =>
        (a1) => {
          let out = self.compare(a2)(a1)
          if (out !== 0) {
            return out
          }
          for (const sortable of collection) {
            out = sortable.compare(a2)(a1)
            if (out !== 0) {
              return out
            }
          }
          return out
        }
      )
})

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = <A>(): Monoid<Sortable<A>> =>
  monoid.fromSemigroup(getSemigroup<A>(), fromCompare(() => () => 0))

/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant: contravariant.Contravariant<SortableTypeLambda> = {
  contramap
}

/**
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<SortableTypeLambda> = {
  invmap: contravariant.invmap(Contravariant)
}

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lt = <A>(Sortable: Sortable<A>) =>
  (that: A) => (self: A) => Sortable.compare(that)(self) === -1

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const gt = <A>(Sortable: Sortable<A>) =>
  (that: A) => (self: A) => Sortable.compare(that)(self) === 1

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 1.0.0
 */
export const leq = <A>(Sortable: Sortable<A>) =>
  (that: A) => (self: A) => Sortable.compare(that)(self) !== 1

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const geq = <A>(Sortable: Sortable<A>) =>
  (that: A) => (self: A) => Sortable.compare(that)(self) !== -1

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const min = <A>(Sortable: Sortable<A>) =>
  (that: A) => (self: A): A => self === that || Sortable.compare(that)(self) < 1 ? self : that

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const max = <A>(Sortable: Sortable<A>) =>
  (that: A) => (self: A): A => self === that || Sortable.compare(that)(self) > -1 ? self : that

/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 1.0.0
 */
export const clamp = <A>(Sortable: Sortable<A>) =>
  (minimum: A, maximum: A) => (a: A) => min(Sortable)(max(Sortable)(a)(minimum))(maximum)

/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 1.0.0
 */
export const between = <A>(Sortable: Sortable<A>) =>
  (minimum: A, maximum: A) =>
    (a: A): boolean => !lt(Sortable)(minimum)(a) && !gt(Sortable)(maximum)(a)
