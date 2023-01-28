/**
 * @since 1.0.0
 */
import { identity } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import * as readonlyArray from "@fp-ts/core/internal/ReadonlyArray"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as flatMap_ from "@fp-ts/core/typeclass/FlatMap"
import type * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as monad from "@fp-ts/core/typeclass/Monad"
import * as of_ from "@fp-ts/core/typeclass/Of"
import type * as pointed from "@fp-ts/core/typeclass/Pointed"
import type * as product_ from "@fp-ts/core/typeclass/Product"
import type * as semiAlternative from "@fp-ts/core/typeclass/SemiAlternative"
import type * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import type * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import type * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import type * as traversable from "@fp-ts/core/typeclass/Traversable"

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
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<IdentityTypeLambda> = covariant.make<
  IdentityTypeLambda
>(
  f => self => f(self)
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<IdentityTypeLambda> = {
  imap: Covariant.imap
}

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(self: Identity<A>) => Identity<{ [K in N]: A }> = invariant.bindTo(Invariant)

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
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<IdentityTypeLambda> = {
  of: identity
}

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
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<IdentityTypeLambda> = {
  flatMap: f => self => f(self)
}

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
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<IdentityTypeLambda> = {
  ...Pointed,
  ...FlatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<IdentityTypeLambda> = {
  ...Invariant,
  product: (self, that) => [self, that],
  productMany: (self, collection) => [self, ...collection]
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<IdentityTypeLambda> = {
  ...Of,
  ...SemiProduct,
  productAll: readonlyArray.fromIterable
}

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
export const Applicative: applicative.Applicative<IdentityTypeLambda> = {
  ...SemiApplicative,
  ...Product
}

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemiCoproduct = <A>(
  S: Semigroup<A>
): semiCoproduct.SemiCoproduct<IdentityTypeLambdaFix<A>> => ({
  imap: Invariant.imap,
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
  map: Covariant.map
})

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<IdentityTypeLambda> = {
  reduce: (b, f) => self => f(b, self)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<IdentityTypeLambda> = {
  traverse: () => f => self => f(self),
  sequence: () => identity
}
