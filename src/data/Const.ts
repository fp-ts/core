/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
 * while ignoring return values.
 *
 * @since 3.0.0
 */
import { constant, unsafeCoerce } from "@fp-ts/core/data/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Applicative } from "@fp-ts/core/typeclasses/Applicative"
import type { Apply } from "@fp-ts/core/typeclasses/Apply"
import type * as bifunctor from "@fp-ts/core/typeclasses/Bifunctor"
import type { Bounded } from "@fp-ts/core/typeclasses/Bounded"
import type * as contravariant from "@fp-ts/core/typeclasses/Contravariant"
import type { Eq } from "@fp-ts/core/typeclasses/Eq"
import * as eq from "@fp-ts/core/typeclasses/Eq"
import type { FromIdentity } from "@fp-ts/core/typeclasses/FromIdentity"
import * as functor from "@fp-ts/core/typeclasses/Functor"
import type { Monoid } from "@fp-ts/core/typeclasses/Monoid"
import type { Ord } from "@fp-ts/core/typeclasses/Ord"
import * as ord from "@fp-ts/core/typeclasses/Ord"
import type { Semigroup } from "@fp-ts/core/typeclasses/Semigroup"
import type { Show } from "@fp-ts/core/typeclasses/Show"

// TODO Semigroupoid Const
// TODO Invariant (Const a)
// TODO (Semigroup a) => Bind (Const a)
// TODO ToReadonlyArray conversion
// TODO Traversable (Const a)

/**
 * @since 3.0.0
 */
export declare const phantom: unique symbol

/**
 * @category model
 * @since 3.0.0
 */
export interface Const</** in out */ S, /** out */ A> {
  readonly [phantom]: A
  readonly value: S
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstTypeLambda extends TypeLambda {
  readonly type: Const<this["InOut1"], this["Out1"]>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstTypeLambdaBifunctor extends TypeLambda {
  readonly type: Const<this["Out2"], this["Out1"]>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstTypeLambdaContravariant extends TypeLambda {
  readonly type: Const<this["InOut1"], this["In1"]>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstTypeLambdaFix<S> extends TypeLambda {
  readonly type: Const<S, this["Out1"]>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const make = <S>(s: S): Const<S, never> =>
  unsafeCoerce({
    value: s
  })

/**
 * @since 3.0.0
 */
export const execute = <S, A>(self: Const<S, A>): S => self.value

/**
 * @category instances
 * @since 3.0.0
 */
export const liftEq: <S>(E: Eq<S>) => Eq<Const<S, never>> = eq.contramap(execute)

/**
 * @category instances
 * @since 3.0.0
 */
export const liftOrd: <S>(O: Ord<S>) => Ord<Const<S, never>> = ord.contramap(execute)

/**
 * @category instances
 * @since 3.0.0
 */
export const liftBounded = <S>(Bounded: Bounded<S>): Bounded<Const<S, never>> => ({
  compare: liftOrd(Bounded).compare,
  top: make(Bounded.top),
  bottom: make(Bounded.bottom)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const liftShow = <S>(Show: Show<S>): Show<Const<S, never>> => ({
  show: (c) => `make(${Show.show(c.value)})`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const liftSemigroup = <S>(Semigroup: Semigroup<S>): Semigroup<Const<S, never>> => ({
  combine: (that) => (self) => make(Semigroup.combine(that.value)(self.value))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const liftMonoid = <S>(Monoid: Monoid<S>): Monoid<Const<S, never>> => ({
  combine: liftSemigroup(Monoid).combine,
  empty: make(Monoid.empty)
})

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <S>(self: Const<S, A>) => Const<S, B> = constant(
  unsafeCoerce
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ConstTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <S, B>(self: Const<S, (a: A) => B>) => Const<S, B> = functor.flap(
  Functor
)

/**
 * @category mapping
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => <S>(fa: Const<S, A>) => Const<S, B> = constant(
  unsafeCoerce
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<ConstTypeLambdaContravariant> = {
  contramap
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const mapLeft = <S, G>(f: (s: S) => G) =>
  <A>(self: Const<S, A>): Const<G, A> => make(f(self.value))

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <S, T, A, B>(
  f: (s: S) => T,
  g: (a: A) => B
) => (self: Const<S, A>) => Const<T, B> = unsafeCoerce(mapLeft)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ConstTypeLambdaBifunctor> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <S>(Semigroup: Semigroup<S>): Apply<ConstTypeLambdaFix<S>> => ({
  map,
  ap: (fa) => (self) => make(Semigroup.combine(fa.value)(self.value))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromIdentity = <S>(Monoid: Monoid<S>): FromIdentity<ConstTypeLambdaFix<S>> => {
  return {
    of: constant(make(Monoid.empty))
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <S>(Monoid: Monoid<S>): Applicative<ConstTypeLambdaFix<S>> => {
  const Apply = getApply(Monoid)
  const FromIdentity = getFromIdentity(Monoid)
  return {
    map: Apply.map,
    ap: Apply.ap,
    of: FromIdentity.of
  }
}
