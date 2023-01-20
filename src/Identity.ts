/**
 * @since 1.0.0
 */
import { identity } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as readonlyArray from "@fp-ts/core/internal/ReadonlyArray"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import type * as coproduct_ from "@fp-ts/core/typeclass/Coproduct"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import * as flatMap_ from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as monad from "@fp-ts/core/typeclass/Monad"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as of_ from "@fp-ts/core/typeclass/Of"
import type * as pointed from "@fp-ts/core/typeclass/Pointed"
import * as product_ from "@fp-ts/core/typeclass/Product"
import type * as semiAlternative from "@fp-ts/core/typeclass/SemiAlternative"
import * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import type * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"

/**
 * @category models
 * @since 1.0.0
 */
export type Identity<A> = A

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface IdentityTypeLambda extends TypeLambda {
  readonly type: Identity<this["Target"]>
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface IdentityTypeLambdaFix<A> extends TypeLambda {
  readonly type: Identity<A>
}

/**
 * @since 1.0.0
 */
export const map = <A, B>(f: (a: A) => B) => (self: Identity<A>): Identity<B> => f(self)

/**
 * @since 1.0.0
 */
export const imap: <A, B>(
  to: (a: A) => B,
  from: (b: B) => A
) => (self: Identity<A>) => Identity<B> = covariant
  .imap<IdentityTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<IdentityTypeLambda> = {
  imap
}

/**
 * @since 1.0.0
 */
export const tupled: <A>(self: Identity<A>) => Identity<[A]> = invariant.tupled(Invariant)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(self: Identity<A>) => Identity<{ [K in N]: A }> = invariant.bindTo(Invariant)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<IdentityTypeLambda> = {
  ...Invariant,
  map
}

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (
  self: Identity<A>
) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = covariant.let(
  Covariant
)

export {
  /**
   * @category do notation
   * @since 1.0.0
   */
  let_ as let
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Identity<(a: A) => B>) => Identity<B> = covariant.flap(
  Covariant
)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: <B>(b: B) => <_>(self: Identity<_>) => Identity<B> = covariant.as(Covariant)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asUnit: <_>(self: Identity<_>) => Identity<void> = covariant.asUnit(Covariant)

/**
 * @category constructors
 * @since 1.0.0
 */
export const of: <A>(a: A) => Identity<A> = identity

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<IdentityTypeLambda> = {
  of
}

/**
 * @since 1.0.0
 */
export const unit: Identity<void> = of_.unit(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const Do: Identity<{}> = of_.Do(Of)

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<IdentityTypeLambda> = {
  ...Of,
  ...Covariant
}

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap = <A, B>(f: (a: A) => Identity<B>) =>
  (self: Identity<A>): Identity<B> => f(self)

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<IdentityTypeLambda> = {
  flatMap
}

/**
 * @since 1.0.0
 */
export const flatten: <A>(self: Identity<Identity<A>>) => Identity<A> = flatMap_
  .flatten(FlatMap)

/**
 * @since 1.0.0
 */
export const andThen: <B>(that: Identity<B>) => <_>(self: Identity<_>) => Identity<B> = flatMap_
  .andThen(FlatMap)

/**
 * @since 1.0.0
 */
export const composeKleisliArrow: <B, C>(
  bfc: (b: B) => Identity<C>
) => <A>(afb: (a: A) => Identity<B>) => (a: A) => Identity<C> = flatMap_
  .composeKleisliArrow(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<IdentityTypeLambda> = {
  ...FlatMap,
  ...Covariant
}

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Identity<B>
) => (
  self: Identity<A>
) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = chainable.bind(
  Chainable
)

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
export const tap: <A, _>(f: (a: A) => Identity<_>) => (self: Identity<A>) => Identity<A> = chainable
  .tap(
    Chainable
  )

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThenDiscard: <_>(that: Identity<_>) => <A>(self: Identity<A>) => Identity<A> =
  chainable
    .andThenDiscard(Chainable)

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<IdentityTypeLambda> = {
  ...Pointed,
  ...FlatMap
}

const productMany = <A>(collection: Iterable<Identity<A>>) =>
  (self: Identity<A>): Identity<[A, ...Array<A>]> => [self, ...collection]

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<IdentityTypeLambda> = {
  ...Invariant,
  product: (self, that) => [self, that],
  productMany
}

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  that: Identity<B>
) => (
  self: Identity<A>
) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = semiProduct
  .andThenBind(SemiProduct)

/**
 * Adds an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const element: <B>(
  fb: Identity<B>
) => <A extends ReadonlyArray<unknown>>(self: Identity<A>) => Identity<[...A, B]> = semiProduct
  .element(SemiProduct)

const productAll = <A>(collection: Iterable<Identity<A>>): Identity<Array<A>> =>
  readonlyArray.fromIterable(collection)

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<IdentityTypeLambda> = {
  ...Of,
  ...SemiProduct,
  productAll
}

/**
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Identity<any>>>(
  ...tuple: T
) => Identity<{ [I in keyof T]: [T[I]] extends [Identity<infer A>] ? A : never }> = product_.tuple(
  Product
)

/**
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Identity<any>>>(
  r: R
) => Identity<{ [K in keyof R]: [R[K]] extends [Identity<infer A>] ? A : never }> = product_
  .struct(Product)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<IdentityTypeLambda> = {
  ...SemiProduct,
  ...Covariant
}

/**
 * @category instances
 * @since 1.0.0
 */
export const liftSemigroup: <A>(S: Semigroup<A>) => Semigroup<Identity<A>> = semiApplicative
  .liftSemigroup(SemiApplicative)

/**
 * Lifts a binary function into `Identity`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => (fa: Identity<A>, fb: Identity<B>) => Identity<C> = semiApplicative.lift2(
  SemiApplicative
)

/**
 * Lifts a ternary function into `Identity`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Identity<A>, fb: Identity<B>, fc: Identity<C>) => Identity<D> = semiApplicative.lift3(
  SemiApplicative
)

/**
 * @since 1.0.0
 */
export const ap: <A>(
  fa: Identity<A>
) => <B>(self: Identity<(a: A) => B>) => Identity<B> = semiApplicative.ap(
  SemiApplicative
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<IdentityTypeLambda> = {
  ...SemiApplicative,
  ...Product
}

/**
 * @since 1.0.0
 */
export const liftMonoid: <A>(M: Monoid<A>) => Monoid<Identity<A>> = applicative.liftMonoid(
  Applicative
)

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiCoproduct = <A>(
  S: Semigroup<A>
): semiCoproduct.SemiCoproduct<IdentityTypeLambdaFix<A>> => ({
  imap: Invariant.imap,
  coproduct: (that) => (self) => S.combine(self, that),
  coproductMany: (collection) => (self) => S.combineMany(self, collection)
})

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiAlternative = <A>(
  S: Semigroup<A>
): semiAlternative.SemiAlternative<IdentityTypeLambdaFix<A>> => ({
  ...getSemiCoproduct(S),
  map: Covariant.map
})

/**
 * @category folding
 * @since 1.0.0
 */
export const reduce = <B, A>(b: B, f: (b: B, a: A) => B) => (self: Identity<A>): B => f(b, self)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRight = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Identity<A>): B => f(b, self)

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<IdentityTypeLambda> = {
  reduce
}

/**
 * @category folding
 * @since 1.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (self: Identity<A>) => M =
  foldable
    .foldMap(Foldable)

/**
 * @category conversions
 * @since 1.0.0
 */
export const toArray: <A>(self: Identity<A>) => Array<A> = foldable.toArray(Foldable)

/**
 * @category conversions
 * @since 1.0.0
 */
export const toArrayWith: <A, B>(f: (a: A) => B) => (self: Identity<A>) => Array<B> = foldable
  .toArrayWith(Foldable)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceKind: <G extends TypeLambda>(
  G: monad.Monad<G>
) => <B, A, R, O, E>(
  b: B,
  f: (b: B, a: A) => Kind<G, R, O, E, B>
) => (self: Identity<A>) => Kind<G, R, O, E, B> = foldable.reduceKind(Foldable)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRightKind: <G extends TypeLambda>(
  G: monad.Monad<G>
) => <B, A, R, O, E>(
  b: B,
  f: (b: B, a: A) => Kind<G, R, O, E, B>
) => (self: Identity<A>) => Kind<G, R, O, E, B> = foldable.reduceRightKind(Foldable)

/**
 * @category folding
 * @since 1.0.0
 */
export const foldMapKind: <G extends TypeLambda>(
  G: coproduct_.Coproduct<G>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<G, R, O, E, B>
) => (self: Identity<A>) => Kind<G, R, O, E, B> = foldable.foldMapKind(Foldable)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(
  F: applicative.Applicative<F>
) =>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ) => (self: Identity<A>): Kind<F, R, O, E, Identity<B>> => f(self)

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <R, O, E, A>(fas: Identity<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Identity<A>> = traversable
  .sequence<IdentityTypeLambda>(traverse)

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<IdentityTypeLambda> = {
  traverse,
  sequence
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<F, R, O, E, B>
) => (self: Identity<A>) => Kind<F, R, O, E, Identity<A>> = traversable
  .traverseTap(Traversable)
