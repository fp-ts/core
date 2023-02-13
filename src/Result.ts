/**
 * @since 1.0.0
 */

import type { Either } from "@fp-ts/core/Either"
import type { LazyArg } from "@fp-ts/core/Function"
import { constNull, constUndefined, dual, identity } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { structural } from "@fp-ts/core/internal/effect"
import * as either from "@fp-ts/core/internal/Either"
import * as option from "@fp-ts/core/internal/Option"
import * as result from "@fp-ts/core/internal/Result"
import * as N from "@fp-ts/core/Number"
import type { Option } from "@fp-ts/core/Option"
import type { Predicate, Refinement } from "@fp-ts/core/Predicate"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as bicovariant from "@fp-ts/core/typeclass/Bicovariant"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type { Equivalence } from "@fp-ts/core/typeclass/Equivalence"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
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
import * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"

/**
 * @category models
 * @since 1.0.0
 */
export type Result<E, A> = Failure<E> | Success<A>

/**
 * @category models
 * @since 1.0.0
 */
export interface Failure<E> {
  readonly _tag: "Failure"
  readonly failure: E
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Success<A> {
  readonly _tag: "Success"
  readonly success: A
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface ResultTypeLambda extends TypeLambda {
  readonly type: Result<this["Out1"], this["Target"]>
}

/**
 * Constructs a new `Result` holding a `Success` value
 *
 * @category constructors
 * @since 1.0.0
 */
export const success: <A>(a: A) => Result<never, A> = result.success

/**
 * Constructs a new `Result` holding a `Failure` value
 *
 * @category constructors
 * @since 1.0.0
 */
export const failure: <E>(e: E) => Result<E, never> = result.failure

/**
 * Tests if a value is a `Result`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isResult, failure, success } from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(isResult(success(1)), true)
 * assert.deepStrictEqual(isResult(failure("error")), true)
 * assert.deepStrictEqual(isResult({ success: 1 }), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isResult = (input: unknown): input is Result<unknown, unknown> =>
  typeof input === "object" && input != null && structural in input && "_tag" in input &&
  (input["_tag"] === "Failure" || input["_tag"] === "Success")

/**
 * Determine if a `Result` is a `Failure`.
 *
 * @param self - The `Result` to check.
 *
 * @example
 * import { isFailure, failure, success } from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(isFailure(success(1)), false)
 * assert.deepStrictEqual(isFailure(failure("error")), true)
 *
 * @category guards
 * @since 1.0.0
 */
export const isFailure: <E, A>(self: Result<E, A>) => self is Failure<E> = result.isFailure

/**
 * Determine if a `Result` is a `Success`.
 *
 * @param self - The `Result` to check.
 *
 * @example
 * import { isSuccess, failure, success } from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(isSuccess(success(1)), true)
 * assert.deepStrictEqual(isSuccess(failure("error")), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isSuccess: <E, A>(self: Result<E, A>) => self is Success<A> = result.isSuccess

/**
 * Returns a `Refinement` from a `Result` returning function.
 * This function ensures that a `Refinement` definition is type-safe.
 *
 * @category conversions
 * @since 1.0.0
 */
export const toRefinement = <A, E, B extends A>(f: (a: A) => Result<E, B>): Refinement<A, B> =>
  (a: A): a is B => isSuccess(f(a))

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable: {
  <E>(onEmpty: LazyArg<E>): <A>(collection: Iterable<A>) => Result<E, A>
  <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): Result<E, A>
} = dual(2, <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): Result<E, A> => {
  for (const a of collection) {
    return success(a)
  }
  return failure(onEmpty())
})

/**
 * Converts a `Result` to an `Option` discarding the error.
 *
 * @param self - The `Result` to convert to an `Option`.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as R from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(R.toOption(R.success(1)), O.some(1))
 * assert.deepStrictEqual(R.toOption(R.failure('a')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export const toOption: <E, A>(self: Result<E, A>) => Option<A> = result.getSuccess

/**
 * Converts a `Result` to an `Option` discarding the error.
 *
 * Alias of {@link toOption}.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as R from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(R.getSuccess(R.success('ok')), O.some('ok'))
 * assert.deepStrictEqual(R.getSuccess(R.failure('err')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export const getSuccess: <E, A>(self: Result<E, A>) => Option<A> = toOption

/**
 * Converts a `Result` to an `Option` discarding the value.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as R from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(R.getFailure(R.success('ok')), O.none())
 * assert.deepStrictEqual(R.getFailure(R.failure('err')), O.some('err'))
 *
 * @category conversions
 * @since 1.0.0
 */
export const getFailure: <E, A>(self: Result<E, A>) => Option<E> = result.getFailure

/**
 * @example
 * import * as R from '@fp-ts/core/Result'
 * import * as O from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(R.fromOption(O.some(1), () => 'error'), R.success(1))
 * assert.deepStrictEqual(R.fromOption(O.none(), () => 'error'), R.failure('error'))
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromOption: {
  <A, E>(fa: Option<A>, onNone: () => E): Result<E, A>
  <E>(onNone: () => E): <A>(fa: Option<A>) => Result<E, A>
} = result.fromOption

/**
 * @category equivalence
 * @since 1.0.0
 */
export const getEquivalence = <E, A>(
  EE: Equivalence<E>,
  EA: Equivalence<A>
): Equivalence<Result<E, A>> =>
  equivalence.make((x, y) =>
    x === y ||
    (isFailure(x) ?
      isFailure(y) && EE(x.failure, y.failure) :
      isSuccess(y) && EA(x.success, y.success))
  )

/**
 * @category mapping
 * @since 1.0.0
 */
export const bimap: {
  <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B): (self: Result<E1, A>) => Result<E2, B>
  <E1, A, E2, B>(self: Result<E1, A>, f: (e: E1) => E2, g: (a: A) => B): Result<E2, B>
} = dual(
  3,
  <E1, A, E2, B>(self: Result<E1, A>, f: (e: E1) => E2, g: (a: A) => B): Result<E2, B> =>
    isFailure(self) ? failure(f(self.failure)) : success(g(self.success))
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Bicovariant: bicovariant.Bicovariant<ResultTypeLambda> = {
  bimap
}

/**
 * Maps the `Failure` side of an `Result` value to a new `Result` value.
 *
 * @param self - The input `Result` value to map.
 * @param f - A transformation function to apply to the `Failure` value of the input `Result`.
 *
 * @category error handling
 * @since 1.0.0
 */
export const mapFailure: {
  <E, G>(f: (e: E) => G): <A>(self: Result<E, A>) => Result<G, A>
  <E, A, G>(self: Result<E, A>, f: (e: E) => G): Result<G, A>
} = bicovariant.mapLeft(Bicovariant)

/**
 * Maps the `Success` side of an `Result` value to a new `Result` value.
 *
 * @param self - An `Result` to map
 * @param f - The function to map over the value of the `Result`
 *
 * @category mapping
 * @since 1.0.0
 */
export const map: {
  <A, B>(f: (a: A) => B): <E>(self: Result<E, A>) => Result<E, B>
  <E, A, B>(self: Result<E, A>, f: (a: A) => B): Result<E, B>
} = dual(
  2,
  <E, A, B>(self: Result<E, A>, f: (a: A) => B): Result<E, B> =>
    isSuccess(self) ? success(f(self.success)) : self
)

const imap = covariant.imap<ResultTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<ResultTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<ResultTypeLambda> = {
  imap
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: {
  <A, E, B>(a: A, self: Result<E, (a: A) => B>): Result<E, B>
  <E, A, B>(self: Result<E, (a: A) => B>): (a: A) => Result<E, B>
} = covariant.flap(Covariant)

/**
 * Maps the `Success` value to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: {
  <E, _, B>(self: Result<E, _>, b: B): Result<E, B>
  <B>(b: B): <E, _>(self: Result<E, _>) => Result<E, B>
} = covariant.as(Covariant)

/**
 * @category mapping
 * @since 1.0.0
 */
export const asUnit: <E, _>(self: Result<E, _>) => Result<E, void> = covariant.asUnit(
  Covariant
)

const of = success

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<ResultTypeLambda> = {
  of
}

/**
 * @since 1.0.0
 */
export const unit: Result<never, void> = of_.unit(Of)

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<ResultTypeLambda> = {
  of,
  imap,
  map
}

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMap: {
  <A, E2, B>(f: (a: A) => Result<E2, B>): <E1>(self: Result<E1, A>) => Result<E1 | E2, B>
  <E1, A, E2, B>(self: Result<E1, A>, f: (a: A) => Result<E2, B>): Result<E1 | E2, B>
} = dual(
  2,
  <E1, A, E2, B>(self: Result<E1, A>, f: (a: A) => Result<E2, B>): Result<E1 | E2, B> =>
    isFailure(self) ? self : f(self.success)
)

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<ResultTypeLambda> = {
  flatMap
}

/**
 * @since 1.0.0
 */
export const flatten: <E1, E2, A>(self: Result<E1, Result<E2, A>>) => Result<E1 | E2, A> = flatMap_
  .flatten(FlatMap)

/**
 * @since 1.0.0
 */
export const andThen: {
  <E1, _, E2, B>(self: Result<E1, _>, that: Result<E2, B>): Result<E1 | E2, B>
  <E2, B>(that: Result<E2, B>): <E1, _>(self: Result<E1, _>) => Result<E2 | E1, B>
} = flatMap_.andThen(FlatMap)

/**
 * @since 1.0.0
 */
export const composeKleisliArrow: {
  <A, E1, B, E2, C>(
    afb: (a: A) => Result<E1, B>,
    bfc: (b: B) => Result<E2, C>
  ): (a: A) => Result<E1 | E2, C>
  <B, E2, C>(
    bfc: (b: B) => Result<E2, C>
  ): <A, E1>(afb: (a: A) => Result<E1, B>) => (a: A) => Result<E2 | E1, C>
} = flatMap_.composeKleisliArrow(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<ResultTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combining
 * @since 1.0.0
 */
export const andThenDiscard: {
  <E1, A, E2, _>(self: Result<E1, A>, that: Result<E2, _>): Result<E1 | E2, A>
  <E2, _>(that: Result<E2, _>): <E1, A>(self: Result<E1, A>) => Result<E2 | E1, A>
} = chainable.andThenDiscard(Chainable)

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<ResultTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

const product = <E1, A, E2, B>(self: Result<E1, A>, that: Result<E2, B>): Result<E1 | E2, [A, B]> =>
  isSuccess(self) ? (isSuccess(that) ? success([self.success, that.success]) : that) : self

const productMany = <E, A>(
  self: Result<E, A>,
  collection: Iterable<Result<E, A>>
): Result<E, [A, ...Array<A>]> => {
  if (isFailure(self)) {
    return self
  }
  const out: [A, ...Array<A>] = [self.success]
  for (const e of collection) {
    if (isFailure(e)) {
      return e
    }
    out.push(e.success)
  }
  return success(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<ResultTypeLambda> = {
  imap,
  product,
  productMany
}

/**
 * Similar to `Promise.all` but operates on `Result`s.
 *
 * ```
 * Iterable<Result<E, A>> -> Result<E, A[]>
 * ```
 *
 * Flattens a collection of `Result`s into a single `Result` that contains a list of all the `Success` values.
 * If there is a `Failure` value in the collection, it returns the first `Failure` found as the result.
 *
 * @param collection - An iterable collection of `Result`s to flatten.
 *
 * @example
 * import * as R from "@fp-ts/core/Result"
 *
 * assert.deepStrictEqual(
 *   R.all([R.success(1), R.success(2), R.success(3)]),
 *   R.success([1, 2, 3])
 * )
 * assert.deepStrictEqual(
 *   R.all([R.success(1), R.failure("error"), R.success(3)]),
 *   R.failure("error")
 * )
 *
 * @category combining
 * @since 1.0.0
 */
export const all = <E, A>(
  collection: Iterable<Result<E, A>>
): Result<E, Array<A>> => {
  const out: Array<A> = []
  for (const e of collection) {
    if (isFailure(e)) {
      return e
    }
    out.push(e.success)
  }
  return success(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<ResultTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll: all
}

/**
 * Similar to `Promise.all` but operates on `Result`s.
 *
 * ```
 * [Result<E1, A>, Result<E1, B>, ...] -> Result<E1 \| E2 \| ..., [A, B, ...]>
 * ```
 *
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Result<any, any>>>(
  ...elements: T
) => Result<
  [T[number]] extends [Result<infer E, any>] ? E : never,
  { [I in keyof T]: [T[I]] extends [Result<any, infer A>] ? A : never }
> = product_.tuple(Product)

/**
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Result<any, any>>>(
  fields: R
) => Result<
  [R[keyof R]] extends [Result<infer E, any>] ? E : never,
  { [K in keyof R]: [R[K]] extends [Result<any, infer A>] ? A : never }
> = product_.struct(Product)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<ResultTypeLambda> = {
  imap,
  map,
  product,
  productMany
}

/**
 * Lifts a binary function into `Result`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => {
  <E1, E2>(self: Result<E1, A>, that: Result<E2, B>): Result<E1 | E2, C>
  <E2>(that: Result<E2, B>): <E1>(self: Result<E1, A>) => Result<E2 | E1, C>
} = semiApplicative.lift2(SemiApplicative)

/**
 * @category combining
 * @since 1.0.0
 */
export const zipWith: {
  <E1, A, E2, B, C>(
    self: Result<E1, A>,
    that: Result<E2, B>,
    f: (a: A, b: B) => C
  ): Result<E1 | E2, C>
  <E2, B, A, C>(
    that: Result<E2, B>,
    f: (a: A, b: B) => C
  ): <E1>(self: Result<E1, A>) => Result<E2 | E1, C>
} = semiApplicative.zipWith(SemiApplicative)

/**
 * @since 1.0.0
 */
export const ap: {
  <E1, A, B, E2>(self: Result<E1, (a: A) => B>, that: Result<E2, A>): Result<E1 | E2, B>
  <E2, A>(that: Result<E2, A>): <E1, B>(self: Result<E1, (a: A) => B>) => Result<E2 | E1, B>
} = semiApplicative.ap(SemiApplicative)

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<ResultTypeLambda> = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll: all
}

/**
 * `Semigroup` returning the left-most `Failure` value. If both operands are `Success`s then the inner values
 * are combined using the provided `Semigroup`.
 *
 * ```
 * | self        | that        | combine(self, that)      |
 * | ----------- | ----------- | -------------------------|
 * | failure(e1) | failure(e2) | failure(e1)              |
 * | failure(e1) | success(a2) | failure(e1)              |
 * | success(a1) | failure(e2) | failure(e2)              |
 * | success(a1) | success(a2) | success(combine(a1, a2)) |
 * ```
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstFailureSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Result<E, A>> =
  semiApplicative.getSemigroup(SemiApplicative)

/**
 * `Monoid` returning the left-most `Failure` value. If both operands are `Success`s then the inner values
 * are combined using the provided `Monoid`.
 *
 * - `combine` is provided by {@link getFirstFailureSemigroup}.
 * - `empty` is `success(M.empty)`
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstFailureMonoid: <A, E>(M: Monoid<A>) => Monoid<Result<E, A>> = applicative
  .getMonoid(Applicative)

const coproduct = <E1, A, E2, B>(
  self: Result<E1, A>,
  that: Result<E2, B>
): Result<E1 | E2, A | B> => isSuccess(self) ? self : that

const coproductMany = <E, A>(
  self: Result<E, A>,
  collection: Iterable<Result<E, A>>
): Result<E, A> => {
  let out = self
  if (isSuccess(out)) {
    return out
  }
  for (out of collection) {
    if (isSuccess(out)) {
      return out
    }
  }
  return out
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct: semiCoproduct.SemiCoproduct<ResultTypeLambda> = {
  imap,
  coproduct,
  coproductMany
}

/**
 * @category error handling
 * @since 1.0.0
 */
export const firstSuccessOf: {
  <E, A>(collection: Iterable<Result<E, A>>): (self: Result<E, A>) => Result<E, A>
  <E, A>(self: Result<E, A>, collection: Iterable<Result<E, A>>): Result<E, A>
} = dual(2, coproductMany)

/**
 * Semigroup returning the left-most `Success` value.
 *
 * ```
 * | self        | that        | combine(self, that) |
 * | ----------- | ----------- | ------------------- |
 * | failure(e1) | failure(e2) | failure(e2)         |
 * | failure(e1) | success(a2) | success(a2)         |
 * | success(a1) | failure(e2) | success(a1)         |
 * | success(a1) | success(a2) | success(a1)         |
 * ```
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstSuccessSemigroup: <E, A>() => Semigroup<Result<E, A>> = semiCoproduct
  .getSemigroup(SemiCoproduct)

/**
 * Returns the wrapped value if it's a `Success` or a default value if is a `Failure`.
 *
 * @example
 * import * as R from '@fp-ts/core/Result'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   R.getOrElse(R.success(1), () => 0),
 *   1
 * )
 * assert.deepStrictEqual(
 *   R.getOrElse(R.failure('error'), () => 0),
 *   0
 * )
 *
 * @category getters
 * @since 1.0.0
 */
export const getOrElse: {
  <E, B>(onFailure: (e: E) => B): <A>(self: Result<E, A>) => B | A
  <E, A, B>(self: Result<E, A>, onFailure: (e: E) => B): A | B
} = dual(
  2,
  <E, A, B>(self: Result<E, A>, onFailure: (e: E) => B): A | B =>
    isFailure(self) ? onFailure(self.failure) : self.success
)

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElse: {
  <E1, E2, B>(that: (e1: E1) => Result<E2, B>): <A>(self: Result<E1, A>) => Result<E2, A | B>
  <E1, A, E2, B>(self: Result<E1, A>, that: (e1: E1) => Result<E2, B>): Result<E2, A | B>
} = dual(
  2,
  <E1, A, E2, B>(self: Result<E1, A>, that: (e1: E1) => Result<E2, B>): Result<E2, A | B> =>
    isFailure(self) ? that(self.failure) : self
)

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseEither: {
  <E1, E2, B>(that: (e1: E1) => Result<E2, B>): <A>(self: Result<E1, A>) => Result<E2, Either<A, B>>
  <E1, A, E2, B>(self: Result<E1, A>, that: (e1: E1) => Result<E2, B>): Result<E2, Either<A, B>>
} = dual(
  2,
  <E1, A, E2, B>(self: Result<E1, A>, that: (e1: E1) => Result<E2, B>): Result<E2, Either<A, B>> =>
    isFailure(self) ?
      map(that(self.failure), either.right) :
      map(self, either.left)
)

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseFail: {
  <E2>(onFailure: LazyArg<E2>): <E1, A>(self: Result<E1, A>) => Result<E2, A>
  <E1, A, E2>(self: Result<E1, A>, onFailure: LazyArg<E2>): Result<E2, A>
} = dual(
  2,
  <E1, A, E2>(self: Result<E1, A>, onFailure: LazyArg<E2>): Result<E2, A> =>
    orElse(self, () => failure(onFailure()))
)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative: semiAlternative.SemiAlternative<ResultTypeLambda> = {
  map,
  imap,
  coproduct,
  coproductMany: firstSuccessOf
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<ResultTypeLambda> = {
  reduce: dual(
    3,
    <E, A, B>(self: Result<E, A>, b: B, f: (b: B, a: A) => B): B =>
      isFailure(self) ? b : f(b, self.success)
  )
}

/**
 * Transforms an `Result` into an `Array`.
 * If the input is `Failure`, an empty array is returned.
 * If the input is `Success`, the value is wrapped in an array.
 *
 * @param self - The `Result` to convert to an array.
 *
 * @example
 * import { success, failure, toArray } from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(toArray(success(1)), [1])
 * assert.deepStrictEqual(toArray(failure("error")), [])
 *
 * @category conversions
 * @since 1.0.0
 */
export const toArray: <E, A>(self: Result<E, A>) => Array<A> = foldable.toArray(Foldable)

/**
 * Takes two functions and an `Result` value, if the value is a `Failure` the inner value is applied to the first function,
 * if the value is a `Success` the inner value is applied to the second function.
 *
 * @example
 * import * as R from '@fp-ts/core/Result'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const onFailure  = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`
 *
 * const onSuccess = (value: number): string => `Ok: ${value}`
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     R.success(1),
 *     R.match(onFailure , onSuccess)
 *   ),
 *   'Ok: 1'
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     R.failure(['error 1', 'error 2']),
 *     R.match(onFailure , onSuccess)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
export const match: {
  <E, B, A, C = B>(onFailure: (e: E) => B, onSuccess: (a: A) => C): (self: Result<E, A>) => B | C
  <E, A, B, C = B>(self: Result<E, A>, onFailure: (e: E) => B, onSuccess: (a: A) => C): B | C
} = dual(
  3,
  <E, A, B, C = B>(self: Result<E, A>, onFailure: (e: E) => B, onSuccess: (a: A) => C): B | C =>
    isFailure(self) ? onFailure(self.failure) : onSuccess(self.success)
)

/**
 * Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Success`, if the value is nully use
 * the provided default as a `Failure`.
 *
 * @example
 * import * as R from '@fp-ts/core/Result'
 *
 * const parse = R.fromNullable(() => 'nullable')
 *
 * assert.deepStrictEqual(parse(1), R.success(1))
 * assert.deepStrictEqual(parse(null), R.failure('nullable'))
 *
 * @category interop
 * @since 1.0.0
 */
export const fromNullable: {
  <A, E>(onNullable: (a: A) => E): (a: A) => Result<E, NonNullable<A>>
  <A, E>(a: A, onNullable: (a: A) => E): Result<E, NonNullable<A>>
} = dual(
  2,
  <A, E>(a: A, onNullable: (a: A) => E): Result<E, NonNullable<A>> =>
    a == null ? failure(onNullable(a)) : success(a as NonNullable<A>)
)

/**
 * @category interop
 * @since 1.0.0
 */
export const liftNullable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A): Result<E, NonNullable<B>> => fromNullable(f(...a), () => onNullable(...a))

/**
 * @category interop
 * @since 1.0.0
 */
export const merge: <E, A>(self: Result<E, A>) => E | A = match(identity, identity)

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapNullable: {
  <A, B, E2>(
    f: (a: A) => B | null | undefined,
    onNullable: (a: A) => E2
  ): <E1>(self: Result<E1, A>) => Result<E1 | E2, NonNullable<B>>
  <E1, A, B, E2>(
    self: Result<E1, A>,
    f: (a: A) => B | null | undefined,
    onNullable: (a: A) => E2
  ): Result<E1 | E2, NonNullable<B>>
} = dual(3, <E1, A, B, E2>(
  self: Result<E1, A>,
  f: (a: A) => B | null | undefined,
  onNullable: (a: A) => E2
): Result<E1 | E2, NonNullable<B>> => flatMap(self, liftNullable(f, onNullable)))

/**
 * Extracts the value of an `Result` or throws if the `Result` is `Failure`.
 *
 * If a default error is sufficient for your use case and you don't need to configure the thrown error, see {@link getOrThrow}.
 *
 * @param self - The `Result` to extract the value from.
 * @param onFailure - A function that will be called if the `Result` is `Failure`. It returns the error to be thrown.
 *
 * @example
 * import * as R from "@fp-ts/core/Result"
 *
 * assert.deepStrictEqual(
 *   R.getOrThrowWith(
 *     R.success(1),
 *     () => new Error('Unexpected Failure')
 *   ),
 *   1
 * )
 * assert.throws(() => R.getOrThrowWith(
 *   R.failure("error"),
 *   () => new Error('Unexpected Failure')
 *   )
 * )
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrThrowWith: {
  <E>(onFailure: (e: E) => unknown): <A>(self: Result<E, A>) => A
  <E, A>(self: Result<E, A>, onFailure: (e: E) => unknown): A
} = dual(2, <E, A>(self: Result<E, A>, onFailure: (e: E) => unknown): A => {
  if (isSuccess(self)) {
    return self.success
  }
  throw onFailure(self.failure)
})

/**
 * Extracts the value of an `Result` or throws if the `Result` is `Failure`.
 *
 * The thrown error is a default error. To configure the error thrown, see  {@link getOrThrowWith}.
 *
 * @param self - The `Result` to extract the value from.
 * @throws `Error("getOrThrow called on a Failure")`
 *
 * @example
 * import * as R from "@fp-ts/core/Result"
 *
 * assert.deepStrictEqual(R.getOrThrow(R.success(1)), 1)
 * assert.throws(() => R.getOrThrow(R.failure("error")))
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrThrow: <E, A>(self: Result<E, A>) => A = getOrThrowWith(() =>
  new Error("getOrThrow called on a Failure")
)

/**
 * Lifts a function that may throw to one returning a `Result`.
 *
 * @category interop
 * @since 1.0.0
 */
export const liftThrowable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
): ((...a: A) => Result<E, B>) =>
  (...a) => {
    try {
      return success(f(...a))
    } catch (e) {
      return failure(onThrow(e))
    }
  }

/**
 * @since 1.0.0
 */
export const reverse = <E, A>(self: Result<E, A>): Result<A, E> =>
  isFailure(self) ? success(self.failure) : failure(self.success)

/**
 * @category filtering
 * @since 1.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(
    self: Result<E1, C>
  ) => Result<E1 | E2, B>
  <B extends A, E2, A = B>(
    predicate: Predicate<A>,
    onFalse: LazyArg<E2>
  ): <E1>(self: Result<E1, B>) => Result<E1 | E2, B>
  <E1, C extends A, B extends A, E2, A = C>(
    self: Result<E1, C>,
    refinement: Refinement<A, B>,
    onFalse: LazyArg<E2>
  ): Result<E1 | E2, B>
  <E1, B extends A, E2, A = B>(
    self: Result<E1, B>,
    predicate: Predicate<A>,
    onFalse: LazyArg<E2>
  ): Result<E1 | E2, B>
} = dual(3, <E1, B extends A, E2, A = B>(
  self: Result<E1, B>,
  predicate: Predicate<A>,
  onFalse: LazyArg<E2>
): Result<E1 | E2, B> =>
  isFailure(self) ? self : predicate(self.success) ? self : failure(onFalse()))

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap: {
  <A, B, E2>(
    f: (a: A) => Option<B>,
    onNone: LazyArg<E2>
  ): <E1>(self: Result<E1, A>) => Result<E1 | E2, B>
  <E1, A, B, E2>(
    self: Result<E1, A>,
    f: (a: A) => Option<B>,
    onNone: LazyArg<E2>
  ): Result<E1 | E2, B>
} = dual(3, <E1, A, B, E2>(
  self: Result<E1, A>,
  f: (a: A) => Option<B>,
  onNone: LazyArg<E2>
): Result<E1 | E2, B> =>
  flatMap(self, (a) => {
    const ob = f(a)
    return option.isNone(ob) ? failure(onNone()) : success(ob.value)
  }))

/**
 * @category filtering
 * @since 1.0.0
 */
export const compact: {
  <E2>(onNone: LazyArg<E2>): <E1, A>(self: Result<E1, Option<A>>) => Result<E1 | E2, A>
  <E1, A, E2>(self: Result<E1, Option<A>>, onNone: LazyArg<E2>): Result<E1 | E2, A>
} = dual(
  2,
  <E1, A, E2>(self: Result<E1, Option<A>>, onNone: LazyArg<E2>): Result<E1 | E2, A> =>
    filterMap(self, identity, onNone)
)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): <TE>(self: Result<TE, A>) => Kind<F, R, O, E, Result<TE, B>>
  <TE, A, R, O, E, B>(
    self: Result<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Result<TE, B>>
} =>
  dual(2, <TE, A, R, O, E, B>(
    self: Result<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Result<TE, B>> =>
    isFailure(self) ?
      F.of<Result<TE, B>>(self) :
      F.map<R, O, E, B, Result<TE, B>>(f(self.success), success))

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<ResultTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <TE, R, O, E, A>(
  self: Result<TE, Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, Result<TE, A>> = traversable.sequence(Traversable)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <TE, A, R, O, E, B>(
    self: Result<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Result<TE, A>>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): <TE>(self: Result<TE, A>) => Kind<F, R, O, E, Result<TE, A>>
} = traversable.traverseTap(Traversable)

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tap: {
  <E1, A, E2, _>(self: Result<E1, A>, f: (a: A) => Result<E2, _>): Result<E1 | E2, A>
  <A, E2, _>(f: (a: A) => Result<E2, _>): <E1>(self: Result<E1, A>) => Result<E2 | E1, A>
} = chainable.tap(Chainable)

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectSuccess: {
  <A>(onSuccess: (a: A) => void): <E>(self: Result<E, A>) => Result<E, A>
  <E, A>(self: Result<E, A>, onSuccess: (a: A) => void): Result<E, A>
} = dual(2, <E, A>(self: Result<E, A>, onSuccess: (a: A) => void): Result<E, A> => {
  if (isSuccess(self)) {
    onSuccess(self.success)
  }
  return self
})

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectFailure: {
  <E>(onFailure: (e: E) => void): <A>(self: Result<E, A>) => Result<E, A>
  <E, A>(self: Result<E, A>, onFailure: (e: E) => void): Result<E, A>
} = dual(2, <E, A>(self: Result<E, A>, onFailure: (e: E) => void): Result<E, A> => {
  if (isFailure(self)) {
    onFailure(self.failure)
  }
  return self
})

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const tapError: {
  <E1, E2, _>(onFailure: (e: E1) => Result<E2, _>): <A>(self: Result<E1, A>) => Result<E1 | E2, A>
  <E1, A, E2, _>(self: Result<E1, A>, onFailure: (e: E1) => Result<E2, _>): Result<E1 | E2, A>
} = dual(
  2,
  <E1, A, E2, _>(self: Result<E1, A>, onFailure: (e: E1) => Result<E2, _>): Result<E1 | E2, A> => {
    if (isSuccess(self)) {
      return self
    }
    const out = onFailure(self.failure)
    return isFailure(out) ? out : self
  }
)

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrNull: <E, A>(self: Result<E, A>) => A | null = getOrElse(constNull)

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrUndefined: <E, A>(self: Result<E, A>) => A | undefined = getOrElse(constUndefined)

/**
 * @example
 * import { liftPredicate, failure, success } from '@fp-ts/core/Result'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     liftPredicate((n) => n > 0, () => 'error')
 *   ),
 *   success(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     liftPredicate((n) => n > 0, () => 'error')
 *   ),
 *   failure('error')
 * )
 *
 * @category lifting
 * @since 1.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(
    refinement: Refinement<A, B>,
    onFalse: (c: C) => E
  ): (c: C) => Result<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => Result<E, B>
} = <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E) =>
  (b: B) => predicate(b) ? success(b) : failure(onFalse(b))

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftOption = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A): Result<E, B> => fromOption(() => onNone(...a))(f(...a))

/**
 * @category combining
 * @since 1.0.0
 */
export const flatMapOption: {
  <A, B, E2>(
    f: (a: A) => Option<B>,
    onNone: (a: A) => E2
  ): <E1>(self: Result<E1, A>) => Result<E1 | E2, B>
  <E1, A, B, E2>(
    self: Result<E1, A>,
    f: (a: A) => Option<B>,
    onNone: (a: A) => E2
  ): Result<E1 | E2, B>
} = dual(3, <E1, A, B, E2>(
  self: Result<E1, A>,
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
): Result<E1 | E2, B> => flatMap(self, liftOption(f, onNone)))

/**
 * Returns a function that checks if an `Result` contains a given value using a provided `equivalence` function.
 *
 * @since 1.0.0
 */
export const contains = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (a: A): <E>(self: Result<E, A>) => boolean
  <E>(self: Result<E, A>, a: A): boolean
} =>
  dual(
    2,
    <E>(self: Result<E, A>, a: A): boolean =>
      isFailure(self) ? false : isEquivalent(self.success, a)
  )

/**
 * Returns `false` if `Failure` or returns the Result of the application of the given predicate to the `Success` value.
 *
 * @example
 * import * as R from '@fp-ts/core/Result'
 *
 * const f = R.exists((n: number) => n > 2)
 *
 * assert.deepStrictEqual(f(R.failure('a')), false)
 * assert.deepStrictEqual(f(R.success(1)), false)
 * assert.deepStrictEqual(f(R.success(3)), true)
 *
 * @since 1.0.0
 */
export const exists: {
  <A>(predicate: Predicate<A>): <E>(self: Result<E, A>) => boolean
  <E, A>(self: Result<E, A>, predicate: Predicate<A>): boolean
} = dual(
  2,
  <E, A>(self: Result<E, A>, predicate: Predicate<A>): boolean =>
    isFailure(self) ? false : predicate(self.success)
)

/**
 * Semigroup that models the combination of values that may be absent, elements that are `Failure` are ignored
 * while elements that are `Success` are combined using the provided `Semigroup`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getOptionalSemigroup = <E, A>(S: Semigroup<A>): Semigroup<Result<E, A>> =>
  semigroup.make((
    x,
    y
  ) => (isFailure(y) ? x : isFailure(x) ? y : success(S.combine(x.success, y.success))))

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sum: {
  <E1, E2>(self: Result<E1, number>, that: Result<E2, number>): Result<E1 | E2, number>
  <E2>(that: Result<E2, number>): <E1>(self: Result<E1, number>) => Result<E2 | E1, number>
} = lift2(N.sum)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiply: {
  <E1, E2>(self: Result<E1, number>, that: Result<E2, number>): Result<E1 | E2, number>
  <E2>(that: Result<E2, number>): <E1>(self: Result<E1, number>) => Result<E2 | E1, number>
} = lift2(N.multiply)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const subtract: {
  <E1, E2>(self: Result<E1, number>, that: Result<E2, number>): Result<E1 | E2, number>
  <E2>(that: Result<E2, number>): <E1>(self: Result<E1, number>) => Result<E2 | E1, number>
} = lift2(N.subtract)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const divide: {
  <E1, E2>(self: Result<E1, number>, that: Result<E2, number>): Result<E1 | E2, number>
  <E2>(that: Result<E2, number>): <E1>(self: Result<E1, number>) => Result<E2 | E1, number>
} = lift2(N.divide)

/**
 * Return all the `Success` elements from an `Interable` of `Result`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const getSuccesses = <E, A>(self: Iterable<Result<E, A>>): Array<A> => {
  const out: Array<A> = []
  for (const a of self) {
    if (isSuccess(a)) {
      out.push(a.success)
    }
  }
  return out
}

/**
 * Return all the `Failure` elements from an `Interable` of `Result`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const getFailures = <E, A>(self: Iterable<Result<E, A>>): Array<E> => {
  const out: Array<E> = []
  for (const a of self) {
    if (isFailure(a)) {
      out.push(a.failure)
    }
  }
  return out
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 1.0.0
 */
export const tupled: <E, A>(self: Result<E, A>) => Result<E, [A]> = invariant.tupled(
  Invariant
)

/**
 * Appends an element to the end of a tuple.
 *
 * @category do notation
 * @since 1.0.0
 */
export const appendElement: {
  <E1, A extends ReadonlyArray<any>, E2, B>(
    self: Result<E1, A>,
    that: Result<E2, B>
  ): Result<E1 | E2, [...A, B]>
  <E2, B>(
    that: Result<E2, B>
  ): <E1, A extends ReadonlyArray<any>>(self: Result<E1, A>) => Result<E2 | E1, [...A, B]>
} = semiProduct.appendElement(SemiProduct)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: {
  <N extends string>(
    name: N
  ): <E, A>(self: Result<E, A>) => Result<E, { [K in N]: A }>
  <E, A, N extends string>(self: Result<E, A>, name: N): Result<E, { [K in N]: A }>
} = invariant.bindTo(Invariant)

const let_: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): <E>(
    self: Result<E, A>
  ) => Result<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E, A extends object, N extends string, B>(
    self: Result<E, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Result<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
export const Do: Result<never, {}> = of_.Do(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: {
  <N extends string, A extends object, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Result<E2, B>
  ): <E1>(
    self: Result<E1, A>
  ) => Result<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Result<E1, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Result<E2, B>
  ): Result<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = chainable.bind(Chainable)

/**
 * Extends the `Result` value with the value of another `Result` type.
 *
 * If both `Result` instances are `Failure`, then the result will be the first `Failure`.
 *
 * @param self - The original `Result` value.
 * @param name - The name of the property that will be added to the original `Result` type.
 * @param that - The `Result` value that will be added to the original `Result` type.
 *
 * @example
 * import * as R from '@fp-ts/core/Result'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const result = pipe(
 *   R.Do,
 *   R.bind("a", () => R.failure("e1")),
 *   R.andThenBind("b", R.failure("e2"))
 * )
 *
 * assert.deepStrictEqual(result, R.failure("e1"))
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: {
  <N extends string, A extends object, E2, B>(
    name: Exclude<N, keyof A>,
    that: Result<E2, B>
  ): <E1>(
    self: Result<E1, A>
  ) => Result<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Result<E1, A>,
    name: Exclude<N, keyof A>,
    that: Result<E2, B>
  ): Result<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = semiProduct.andThenBind(SemiProduct)
