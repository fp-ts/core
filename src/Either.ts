/**
 * @since 1.0.0
 */

import * as BI from "@fp-ts/core/Bigint"
import type { LazyArg } from "@fp-ts/core/Function"
import { constNull, constUndefined, dual, identity, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { structural } from "@fp-ts/core/internal/effect"
import * as either from "@fp-ts/core/internal/Either"
import * as option from "@fp-ts/core/internal/Option"
import * as N from "@fp-ts/core/Number"
import type { Option } from "@fp-ts/core/Option"
import type { Predicate, Refinement } from "@fp-ts/core/Predicate"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as bicovariant from "@fp-ts/core/typeclass/Bicovariant"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type { Equivalence } from "@fp-ts/core/typeclass/Equivalence"
import * as flatMap_ from "@fp-ts/core/typeclass/FlatMap"
import type * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as monad from "@fp-ts/core/typeclass/Monad"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as of_ from "@fp-ts/core/typeclass/Of"
import type * as pointed from "@fp-ts/core/typeclass/Pointed"
import * as product_ from "@fp-ts/core/typeclass/Product"
import type * as semiAlternative from "@fp-ts/core/typeclass/SemiAlternative"
import * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"

// -------------------------------------------------------------------------------------
// models
// -------------------------------------------------------------------------------------

/**
 * @category models
 * @since 1.0.0
 */
export interface Left<E> {
  readonly _tag: "Left"
  readonly left: E
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Right<A> {
  readonly _tag: "Right"
  readonly right: A
}

/**
 * @category models
 * @since 1.0.0
 */
export type Either<E, A> = Left<E> | Right<A>

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface EitherTypeLambda extends TypeLambda {
  readonly type: Either<this["Out1"], this["Target"]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 1.0.0
 */
export const right: <A>(a: A) => Either<never, A> = either.right

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 1.0.0
 */
export const left: <E>(e: E) => Either<E, never> = either.left

/**
 * Alias of `right`.
 *
 * @category constructors
 * @since 1.0.0
 */
export const of: <A>(a: A) => Either<never, A> = right

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the specified value is an instance of `Either`, `false`
 * otherwise.
 *
 * @category guards
 * @since 1.0.0
 */
export const isEither = (u: unknown): u is Either<unknown, unknown> =>
  typeof u === "object" && u != null && structural in u && "_tag" in u &&
  (u["_tag"] === "Left" || u["_tag"] === "Right")

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category guards
 * @since 1.0.0
 */
export const isLeft: <E, A>(self: Either<E, A>) => self is Left<E> = either.isLeft

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category guards
 * @since 1.0.0
 */
export const isRight: <E, A>(self: Either<E, A>) => self is Right<A> = either.isRight

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * Returns a `Refinement` from a `Either` returning function.
 * This function ensures that a `Refinement` definition is type-safe.
 *
 * @category conversions
 * @since 1.0.0
 */
export const toRefinement = <A, E, B extends A>(f: (a: A) => Either<E, B>): Refinement<A, B> =>
  (a: A): a is B => isRight(f(a))

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable = <E>(onEmpty: LazyArg<E>) =>
  <A>(collection: Iterable<A>): Either<E, A> => {
    for (const a of collection) {
      return right(a)
    }
    return left(onEmpty())
  }

/**
 * @example
 * import * as E from '@fp-ts/core/Either'
 * import { pipe } from '@fp-ts/core/Function'
 * import * as O from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(pipe(O.some(1), E.fromOption(() => 'error')), E.right(1))
 * assert.deepStrictEqual(pipe(O.none(), E.fromOption(() => 'error')), E.left('error'))
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A>(self: Option<A>) => Either<E, A> =
  either.fromOption

/**
 * Returns an effect whose Right is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 1.0.0
 */
export const map = <A, B>(f: (a: A) => B) =>
  <E>(self: Either<E, A>): Either<E, B> => isRight(self) ? right(f(self.right)) : self

const imap = covariant.imap<EitherTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<EitherTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<EitherTypeLambda> = {
  imap
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const tupled: <E, A>(self: Either<E, A>) => Either<E, [A]> = invariant.tupled(
  Invariant
)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(self: Either<E, A>) => Either<E, { [K in N]: A }> = invariant.bindTo(Invariant)

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: <E, A, B>(self: Either<E, (a: A) => B>) => (a: A) => Either<E, B> = covariant
  .flap(Covariant)

/**
 * Maps the Right value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: <B>(b: B) => <E, _>(self: Either<E, _>) => Either<E, B> = covariant.as(
  Covariant
)

/**
 * Returns the effect Eithering from mapping the Right of this effect to unit.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asUnit: <E, _>(self: Either<E, _>) => Either<E, void> = covariant.asUnit(
  Covariant
)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(
  self: Either<E, A>
) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }> = covariant.let(
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
 * Returns an effect whose Left and Right channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 1.0.0
 */
export const bimap = <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (self: Either<E, A>): Either<G, B> => isLeft(self) ? left(f(self.left)) : right(g(self.right))

/**
 * @category instances
 * @since 1.0.0
 */
export const Bicovariant: bicovariant.Bicovariant<EitherTypeLambda> = {
  bimap
}

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 1.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(self: Either<E, A>) => Either<G, A> =
  bicovariant
    .mapLeft(Bicovariant)

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<EitherTypeLambda> = {
  of
}

/**
 * @since 1.0.0
 */
export const unit: Either<never, void> = of_.unit(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const Do: Either<never, {}> = of_.Do(Of)

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<EitherTypeLambda> = {
  of,
  imap,
  map
}

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap = <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(self: Either<E1, A>): Either<E1 | E2, B> => isLeft(self) ? self : f(self.right)

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<EitherTypeLambda> = {
  flatMap
}

/**
 * @since 1.0.0
 */
export const flatten: <E1, E2, A>(self: Either<E1, Either<E2, A>>) => Either<E1 | E2, A> = flatMap_
  .flatten(FlatMap)

/**
 * @since 1.0.0
 */
export const andThen: <E2, B>(
  that: Either<E2, B>
) => <E1, _>(self: Either<E1, _>) => Either<E1 | E2, B> = flatMap_
  .andThen(FlatMap)

/**
 * @since 1.0.0
 */
export const composeKleisliArrow: <B, E2, C>(
  bfc: (b: B) => Either<E2, C>
) => <A, E1>(afb: (a: A) => Either<E1, B>) => (a: A) => Either<E1 | E2, C> = flatMap_
  .composeKleisliArrow(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<EitherTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
) => <E1>(
  self: Either<E1, A>
) => Either<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = chainable
  .bind(Chainable)

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThenDiscard: <E2, _>(
  that: Either<E2, _>
) => <E1, A>(self: Either<E1, A>) => Either<E1 | E2, A> = chainable
  .andThenDiscard(Chainable)

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<EitherTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

const productMany = <E, A>(
  self: Either<E, A>,
  collection: Iterable<Either<E, A>>
): Either<E, [A, ...Array<A>]> => {
  if (isLeft(self)) {
    return self
  }
  const out: [A, ...Array<A>] = [self.right]
  for (const e of collection) {
    if (isLeft(e)) {
      return e
    }
    out.push(e.right)
  }
  return right(out)
}

const product = <E1, A, E2, B>(
  self: Either<E1, A>,
  that: Either<E2, B>
): Either<E1 | E2, [A, B]> =>
  isRight(self) ? (isRight(that) ? right([self.right, that.right]) : that) : self

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<EitherTypeLambda> = {
  imap,
  product,
  productMany
}

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  that: Either<E2, B>
) => <E1>(
  self: Either<E1, A>
) => Either<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }> = semiProduct
  .andThenBind(SemiProduct)

/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const appendElement: <E2, B>(
  that: Either<E2, B>
) => <E1, A extends ReadonlyArray<any>>(
  self: Either<E1, A>
) => Either<E1 | E2, [...A, B]> = semiProduct
  .appendElement(SemiProduct)

const productAll = <E, A>(
  collection: Iterable<Either<E, A>>
): Either<E, Array<A>> => {
  const out: Array<A> = []
  for (const e of collection) {
    if (isLeft(e)) {
      return e
    }
    out.push(e.right)
  }
  return right(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<EitherTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll
}

/**
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Either<any, any>>>(
  ...tuple: T
) => Either<
  [T[number]] extends [Either<infer E, any>] ? E : never,
  { [I in keyof T]: [T[I]] extends [Either<any, infer A>] ? A : never }
> = product_
  .tuple(Product)

/**
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Either<any, any>>>(
  r: R
) => Either<
  [R[keyof R]] extends [Either<infer E, any>] ? E : never,
  { [K in keyof R]: [R[K]] extends [Either<any, infer A>] ? A : never }
> = product_
  .struct(Product)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<EitherTypeLambda> = {
  imap,
  map,
  product,
  productMany
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`.
 *
 * | x        | y        | x |> combine(y)        |
 * | ---------| ---------| -----------------------|
 * | left(a)  | left(b)  | left(a)                |
 * | left(a)  | right(2) | left(a)                |
 * | right(1) | left(b)  | left(b)                |
 * | right(1) | right(2) | right(1 |> combine(2)) |
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstLeftSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Either<E, A>> =
  semiApplicative
    .liftSemigroup(SemiApplicative)

/**
 * Lifts a binary function into `Either`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A) => (b: B) => C
) => <E2>(that: Either<E2, A>) => <E1>(self: Either<E1, B>) => Either<E2 | E1, C> = semiApplicative
  .lift2(SemiApplicative)

/**
 * @category products
 * @since 1.0.0
 */
export const zipWith: <E2, B, A, C>(
  fb: Either<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(fa: Either<E1, A>) => Either<E2 | E1, C> = semiApplicative.zipWith(SemiApplicative)

/**
 * @since 1.0.0
 */
export const ap: <E2, A>(
  fa: Either<E2, A>
) => <E1, B>(self: Either<E1, (a: A) => B>) => Either<E1 | E2, B> = semiApplicative.ap(
  SemiApplicative
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<EitherTypeLambda> = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll
}

/**
 * Monoid returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Monoid`.
 *
 * The `empty` value is `right(M.empty)`.
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstLeftMonoid: <A, E>(M: Monoid<A>) => Monoid<Either<E, A>> = applicative
  .liftMonoid(
    Applicative
  )

/**
 * @category error handling
 * @since 1.0.0
 */
export const firstRightOf = <E, A>(collection: Iterable<Either<E, A>>) =>
  (self: Either<E, A>): Either<E, A> => {
    let out = self
    if (isRight(out)) {
      return out
    }
    for (out of collection) {
      if (isRight(out)) {
        return out
      }
    }
    return out
  }

const coproduct = <E1, A, E2, B>(
  self: Either<E1, A>,
  that: Either<E2, B>
): Either<E1 | E2, A | B> => isRight(self) ? self : that

const coproductMany = <E, A>(
  self: Either<E, A>,
  collection: Iterable<Either<E, A>>
): Either<E, A> => pipe(self, firstRightOf(collection))

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct: semiCoproduct.SemiCoproduct<EitherTypeLambda> = {
  imap,
  coproduct,
  coproductMany
}

/**
 * Semigroup returning the left-most `Right` value.
 *
 * | x        | y        | x |> combine(y) |
 * | ---------| ---------| ----------------|
 * | left(a)  | left(b)  | left(b)         |
 * | left(a)  | right(2) | right(2)        |
 * | right(1) | left(b)  | right(1)        |
 * | right(1) | right(2) | right(1)        |
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstRightSemigroup: <E, A>() => Semigroup<Either<E, A>> = semiCoproduct
  .getSemigroup(SemiCoproduct)

/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import * as E from '@fp-ts/core/Either'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   E.getOrElse(E.right(1), () => 0),
 *   1
 * )
 * assert.deepStrictEqual(
 *   E.getOrElse(E.left('error'), () => 0),
 *   0
 * )
 *
 * @dual
 * @category getters
 * @since 1.0.0
 */
export const getOrElse: {
  <E, A, B>(self: Either<E, A>, onLeft: (e: E) => B): A | B
  <E, B>(onLeft: (e: E) => B): <A>(self: Either<E, A>) => B | A
} = dual<
  <E, A, B>(self: Either<E, A>, onLeft: (e: E) => B) => A | B,
  <E, B>(onLeft: (e: E) => B) => <A>(self: Either<E, A>) => A | B
>(
  2,
  <E, A, B>(self: Either<E, A>, onLeft: (e: E) => B): A | B =>
    isLeft(self) ? onLeft(self.left) : self.right
)

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * | x          | y          | x |> orElse(y) |
 * | ---------- | ---------- | ---------------|
 * | left(a)    | left(b)    | left(b)        |
 * | left(a)    | right(2)   | right(2)       |
 * | right(1)   | left(b)    | right(1)       |
 * | right(1)   | right(2)   | right(1)       |
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElse = <E1, E2, B>(
  that: (e1: E1) => Either<E2, B>
) => <A>(self: Either<E1, A>): Either<E2, A | B> => isLeft(self) ? that(self.left) : self

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseEither = <E1, E2, B>(
  that: (e1: E1) => Either<E2, B>
) =>
  <A>(self: Either<E1, A>): Either<E2, Either<A, B>> =>
    isLeft(self) ?
      pipe(that(self.left), map(right)) :
      pipe<Right<A>, Either<E2, Either<A, B>>>(self, map(left))

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseFail = <E2>(
  onLeft: LazyArg<E2>
): <E1, A>(self: Either<E1, A>) => Either<E2, A> => orElse(() => left(onLeft()))

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative: semiAlternative.SemiAlternative<EitherTypeLambda> = {
  map,
  imap,
  coproduct,
  coproductMany
}

const reduce = <A, B>(b: B, f: (b: B, a: A) => B) =>
  <E>(self: Either<E, A>): B => isLeft(self) ? b : f(b, self.right)

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<EitherTypeLambda> = {
  reduce
}

/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import * as E from '@fp-ts/core/Either'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const onLeft  = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`
 *
 * const onRight = (value: number): string => `Ok: ${value}`
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.match(onLeft , onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left(['error 1', 'error 2']),
 *     E.match(onLeft , onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
export const match = <E, B, A, C = B>(onLeft: (e: E) => B, onRight: (a: A) => C) =>
  (self: Either<E, A>): B | C => isLeft(self) ? onLeft(self.left) : onRight(self.right)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import * as E from '@fp-ts/core/Either'
 *
 * const parse = E.fromNullable(() => 'nullable')
 *
 * assert.deepStrictEqual(parse(1), E.right(1))
 * assert.deepStrictEqual(parse(null), E.left('nullable'))
 *
 * @category interop
 * @since 1.0.0
 */
export const fromNullable = <E>(onNullable: LazyArg<E>) =>
  <A>(a: A): Either<E, NonNullable<A>> =>
    a == null ? left(onNullable()) : right(a as NonNullable<A>)

/**
 * @category interop
 * @since 1.0.0
 */
export const liftNullable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A): Either<E, NonNullable<B>> => fromNullable(() => onNullable(...a))(f(...a))

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapNullable = <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: (a: A) => E2
): (<E1>(self: Either<E1, A>) => Either<E1 | E2, NonNullable<B>>) =>
  flatMap(liftNullable(f, onNullable))

/**
 * @category interop
 * @since 1.0.0
 */
export const getOrThrow = <E>(
  onLeft: (e: E) => Error = () => new Error("getOrThrow called on a Left")
) =>
  <A>(self: Either<E, A>): A => {
    if (isRight(self)) {
      return self.right
    }
    throw onLeft(self.left)
  }

/**
 * Lifts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 1.0.0
 */
export const liftThrowable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
): ((...a: A) => Either<E, B>) =>
  (...a) => {
    try {
      return right(f(...a))
    } catch (e) {
      return left(onThrow(e))
    }
  }

/**
 * @category getters
 * @since 1.0.0
 */
export const merge: <E, A>(self: Either<E, A>) => E | A = match(identity, identity)

/**
 * @since 1.0.0
 */
export const reverse = <E, A>(self: Either<E, A>): Either<A, E> =>
  isLeft(self) ? right(self.left) : left(self.right)

/**
 * @category filtering
 * @since 1.0.0
 */
export const compact = <E2>(onNone: LazyArg<E2>) =>
  <E1, A>(self: Either<E1, Option<A>>): Either<E1 | E2, A> =>
    isLeft(self) ? self : option.isNone(self.right) ? left(onNone()) : right(self.right.value)

/**
 * @category filtering
 * @since 1.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(
    self: Either<E1, C>
  ) => Either<E1 | E2, B>
  <B extends A, E2, A = B>(
    predicate: Predicate<A>,
    onFalse: LazyArg<E2>
  ): <E1>(self: Either<E1, B>) => Either<E1 | E2, B>
} = <A, E>(
  predicate: Predicate<A>,
  onFalse: LazyArg<E>
) =>
  (self: Either<E, A>): Either<E, A> =>
    isLeft(self) ? self : predicate(self.right) ? self : left(onFalse())

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap = <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: LazyArg<E2>
) =>
  <E1>(self: Either<E1, A>): Either<E1 | E2, B> =>
    pipe(
      self,
      flatMap((a) => {
        const ob = f(a)
        return option.isNone(ob) ? left(onNone()) : right(ob.value)
      })
    )

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(F: applicative.Applicative<F>) =>
  <A, FR, FO, FE, B>(f: (a: A) => Kind<F, FR, FO, FE, B>) =>
    <E>(self: Either<E, A>): Kind<F, FR, FO, FE, Either<E, B>> =>
      isLeft(self) ?
        F.of<Either<E, B>>(left(self.left)) :
        pipe(f(self.right), F.map<B, Either<E, B>>(right))

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <E, FR, FO, FE, A>(
  self: Either<E, Kind<F, FR, FO, FE, A>>
) => Kind<F, FR, FO, FE, Either<E, A>> = traversable.sequence<EitherTypeLambda>(traverse)

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<EitherTypeLambda> = {
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
) => <TE>(self: Either<TE, A>) => Kind<F, R, O, E, Either<TE, A>> = traversable
  .traverseTap(Traversable)

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
export const tap: <A, E2, _>(
  f: (a: A) => Either<E2, _>
) => <E1>(self: Either<E1, A>) => Either<E1 | E2, A> = chainable.tap(
  Chainable
)

// -------------------------------------------------------------------------------------
// debugging
// -------------------------------------------------------------------------------------

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectRight = <A>(
  onRight: (a: A) => void
) =>
  <E>(self: Either<E, A>): Either<E, A> => {
    if (isRight(self)) {
      onRight(self.right)
    }
    return self
  }

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectLeft = <E>(
  onLeft: (e: E) => void
) =>
  <A>(self: Either<E, A>): Either<E, A> => {
    if (isLeft(self)) {
      onLeft(self.left)
    }
    return self
  }

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const tapError = <E1, E2, _>(
  onLeft: (e: E1) => Either<E2, _>
) =>
  <A>(self: Either<E1, A>): Either<E1 | E2, A> => {
    if (isRight(self)) {
      return self
    }
    const out = onLeft(self.left)
    return isLeft(out) ? out : self
  }

/**
 * Converts a `Either` to an `Option` discarding the Right.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 *
 * assert.deepStrictEqual(E.getLeft(E.right('ok')), O.none())
 * assert.deepStrictEqual(E.getLeft(E.left('err')), O.some('err'))
 *
 * @category getters
 * @since 1.0.0
 */
export const getLeft: <E, A>(self: Either<E, A>) => Option<E> = either.getLeft

/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 *
 * assert.deepStrictEqual(E.getRight(E.right('ok')), O.some('ok'))
 * assert.deepStrictEqual(E.getRight(E.left('err')), O.none())
 *
 * @category getters
 * @since 1.0.0
 */
export const getRight: <E, A>(self: Either<E, A>) => Option<A> = either.getRight

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrNull: <E, A>(self: Either<E, A>) => A | null = getOrElse(constNull)

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrUndefined: <E, A>(self: Either<E, A>) => A | undefined = getOrElse(constUndefined)

/**
 * @example
 * import { liftPredicate, left, right } from '@fp-ts/core/Either'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     liftPredicate((n) => n > 0, () => 'error')
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     liftPredicate((n) => n > 0, () => 'error')
 *   ),
 *   left('error')
 * )
 *
 * @category lifting
 * @since 1.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(
    refinement: Refinement<A, B>,
    onFalse: (c: C) => E
  ): (c: C) => Either<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => Either<E, B>
} = <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E) =>
  (b: B) => predicate(b) ? right(b) : left(onFalse(b))

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftOption = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A): Either<E, B> => fromOption(() => onNone(...a))(f(...a))

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapOption = <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
) => <E1>(self: Either<E1, A>): Either<E1 | E2, B> => pipe(self, flatMap(liftOption(f, onNone)))

/**
 * Returns a function that checks if an `Either` contains a given value using a provided `equivalence` function.
 *
 * @since 1.0.0
 */
export const contains = <A>(equivalence: Equivalence<A>) =>
  (a: A) => <E>(self: Either<E, A>): boolean => isLeft(self) ? false : equivalence(self.right, a)

/**
 * Returns `false` if `Left` or returns the Either of the application of the given predicate to the `Right` value.
 *
 * @example
 * import * as E from '@fp-ts/core/Either'
 *
 * const f = E.exists((n: number) => n > 2)
 *
 * assert.deepStrictEqual(f(E.left('a')), false)
 * assert.deepStrictEqual(f(E.right(1)), false)
 * assert.deepStrictEqual(f(E.right(3)), true)
 *
 * @since 1.0.0
 */
export const exists = <A>(predicate: Predicate<A>) =>
  <E>(self: Either<E, A>): boolean => isLeft(self) ? false : predicate(self.right)

/**
 * Semigroup that models the combination of values that may be absent, elements that are `Left` are ignored
 * while elements that are `Right` are combined using the provided `Semigroup`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getOptionalSemigroup = <E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> =>
  semigroup.fromCombine((
    x,
    y
  ) => (isLeft(y) ? x : isLeft(x) ? y : right(S.combine(x.right, y.right))))

// -------------------------------------------------------------------------------------
// algebraic operations
// -------------------------------------------------------------------------------------

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sum = lift2(N.sum)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiply = lift2(N.multiply)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const subtract = lift2(N.subtract)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const divide = lift2(N.divide)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sumBigint = lift2(BI.sum)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiplyBigint = lift2(BI.multiply)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const subtractBigint = lift2(BI.subtract)
