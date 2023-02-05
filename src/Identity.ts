/**
 * @since 1.0.0
 */
import { dual, identity } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as readonlyArray from "@fp-ts/core/internal/ReadonlyArray"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as flatMap_ from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as monad from "@fp-ts/core/typeclass/Monad"
import * as of_ from "@fp-ts/core/typeclass/Of"
import type * as pointed from "@fp-ts/core/typeclass/Pointed"
import type * as product_ from "@fp-ts/core/typeclass/Product"
import type * as semiAlternative from "@fp-ts/core/typeclass/SemiAlternative"
import type * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
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

const map: {
  <A, B>(f: (a: A) => B): (self: Identity<A>) => Identity<B>
  <A, B>(self: Identity<A>, f: (a: A) => B): Identity<B>
} = dual(2, <A, B>(self: Identity<A>, f: (a: A) => B): Identity<B> => f(self))

const imap = covariant.imap<IdentityTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<IdentityTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<IdentityTypeLambda> = {
  imap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<IdentityTypeLambda> = {
  of: identity
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<IdentityTypeLambda> = {
  of: Of.of,
  imap,
  map
}

const flatMap: {
  <A, B>(f: (a: A) => B): (self: Identity<A>) => Identity<B>
  <A, B>(self: Identity<A>, f: (a: A) => B): Identity<B>
} = dual(2, <A, B>(self: Identity<A>, f: (a: A) => B): Identity<B> => f(self))

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<IdentityTypeLambda> = {
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<IdentityTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<IdentityTypeLambda> = {
  imap,
  of: Of.of,
  map,
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<IdentityTypeLambda> = semiProduct.make(
  Invariant,
  (self, that) => [self, that],
  (self, collection) => [self, ...collection]
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<IdentityTypeLambda> = {
  of: Of.of,
  imap,
  product: SemiProduct.product,
  productMany: SemiProduct.productMany,
  productAll: readonlyArray.fromIterable
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<IdentityTypeLambda> = {
  imap,
  map,
  product: SemiProduct.product,
  productMany: SemiProduct.productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<IdentityTypeLambda> = {
  imap,
  of: Of.of,
  map,
  product: SemiProduct.product,
  productMany: SemiProduct.productMany,
  productAll: Product.productAll
}

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiCoproduct = <A>(
  S: Semigroup<A>
): semiCoproduct.SemiCoproduct<IdentityTypeLambdaFix<A>> => ({
  imap,
  coproduct: S.combine,
  coproductMany: S.combineMany
})

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiAlternative = <A>(
  S: Semigroup<A>
): semiAlternative.SemiAlternative<IdentityTypeLambdaFix<A>> => ({
  ...getSemiCoproduct(S),
  map
})

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<IdentityTypeLambda> = foldable.make((self, b, f) =>
  f(b, self)
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<IdentityTypeLambda> = traversable.make(
  <F extends TypeLambda>(_: applicative.Applicative<F>) =>
    <A, R, O, E, B>(
      self: Identity<A>,
      f: (a: A) => Kind<F, R, O, E, B>
    ): Kind<F, R, O, E, Identity<B>> => f(self)
)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: {
  <N extends string>(name: N): <A>(self: Identity<A>) => Identity<{ [K in N]: A }>
  <A, N extends string>(self: Identity<A>, name: N): Identity<{ [K in N]: A }>
} = invariant.bindTo(Invariant)

const let_: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): (self: Identity<A>) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Identity<A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = covariant.let(Covariant)

export {
  /**
   * @category do notation
   * @since 1.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 1.0.0
 */
export const Do: Identity<{}> = of_.Do(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Identity<B>
  ): (self: Identity<A>) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Identity<A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Identity<B>
  ): Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = chainable.bind(Chainable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    that: Identity<B>
  ): (self: Identity<A>) => Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Identity<A>,
    name: Exclude<N, keyof A>,
    that: Identity<B>
  ): Identity<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = semiProduct.andThenBind(SemiProduct)
