/**
 * @since 1.0.0
 */
import * as BI from "@fp-ts/core/Bigint"
import type { Either } from "@fp-ts/core/Either"
import type { LazyArg } from "@fp-ts/core/Function"
import { constNull, constUndefined, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import * as option from "@fp-ts/core/internal/Option"
import * as N from "@fp-ts/core/Number"
import type { Predicate, Refinement } from "@fp-ts/core/Predicate"
import type * as alternative from "@fp-ts/core/typeclass/Alternative"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as compactable from "@fp-ts/core/typeclass/Compactable"
import type * as coproduct_ from "@fp-ts/core/typeclass/Coproduct"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type { Equivalence } from "@fp-ts/core/typeclass/Equivalence"
import * as filterable from "@fp-ts/core/typeclass/Filterable"
import * as flatMap_ from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as monad from "@fp-ts/core/typeclass/Monad"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as of_ from "@fp-ts/core/typeclass/Of"
import type { Order } from "@fp-ts/core/typeclass/Order"
import * as order from "@fp-ts/core/typeclass/Order"
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
// model
// -------------------------------------------------------------------------------------

/**
 * @category models
 * @since 1.0.0
 */
export interface None {
  readonly _tag: "None"
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

/**
 * @category models
 * @since 1.0.0
 */
export type Option<A> = None | Some<A>

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this["Target"]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Creates a new `Option` that represents a absence of value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const none = <A = never>(): Option<A> => option.none

/**
 * Creates a new `Option` that wraps the given value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const some: <A>(a: A) => Option<A> = option.some

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Checks if the specified value is an instance of `Option`, returns `true` if it is, `false` otherwise.
 *
 * @example
 * import { some, none, isOption } from '@fp-ts/core/Option'
 *
 * assert.strictEqual(isOption(some(1)), true)
 * assert.strictEqual(isOption(none()), true)
 * assert.strictEqual(isOption({}), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isOption: (u: unknown) => u is Option<unknown> = option.isOption

/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from '@fp-ts/core/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none()), true)
 *
 * @category guards
 * @since 1.0.0
 */
export const isNone: <A>(self: Option<A>) => self is None = option.isNone

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from '@fp-ts/core/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none()), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isSome: <A>(self: Option<A>) => self is Some<A> = option.isSome

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none())
 * assert.deepStrictEqual(fromNullable(null), none())
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromNullable: <A>(a: A) => Option<NonNullable<A>> = option.fromNullable

/**
 * Returns a `Refinement` from a `Option` returning function.
 * This function ensures that a `Refinement` definition is type-safe.
 *
 * @category conversions
 * @since 1.0.0
 */
export const toRefinement = <A, B extends A>(f: (a: A) => Option<B>): Refinement<A, B> =>
  (a: A): a is B => isSome(f(a))

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable = <A>(collection: Iterable<A>): Option<A> => {
  for (const a of collection) {
    return some(a)
  }
  return option.none
}

/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 *
 * assert.deepStrictEqual(O.fromEither(E.right(1)), O.some(1))
 * assert.deepStrictEqual(O.fromEither(E.left('a')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromEither: <E, A>(self: Either<E, A>) => Option<A> = either.getRight

/**
 * @category conversions
 * @since 1.0.0
 */
export const toEither: <E>(onNone: LazyArg<E>) => <A>(self: Option<A>) => Either<E, A> =
  either.fromOption

// -------------------------------------------------------------------------------------
// error handling
// -------------------------------------------------------------------------------------

/**
 * Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`
 *
 * @param onNone - Function that returns the default value to return if the `Option` is `None`
 * @param self - The `Option` to get the value of
 *  *
 * @example
 * import { some, none, getOrElse } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(pipe(some(1), getOrElse(() => 0)), 1)
 * assert.strictEqual(pipe(none(), getOrElse(() => 0)), 0)
 *
 * @category error handling
 * @since 1.0.0
 */
export const getOrElse = <B>(onNone: LazyArg<B>) =>
  <A>(self: Option<A>): A | B => isNone(self) ? onNone() : self.value

/**
 * Returns the provided option `that` if `self` is `None`, otherwise returns `self`.
 *
 * @param that - The option to return if `self` option is `None`
 * @param self - The first option to be checked
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none(),
 *     O.orElse(() => O.none())
 *   ),
 *   O.none()
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.orElse(() => O.none())
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none(),
 *     O.orElse(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.orElse(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElse = <B>(that: LazyArg<Option<B>>) =>
  <A>(self: Option<A>): Option<A | B> => isNone(self) ? that() : self

/**
 * Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
 * which contains information about which of the two options has been chosen.
 * This is useful when it's important to know whether the value was retrieved from the first option or the second option.
 *
 * @param that - The second option to be considered if the first option is `None`
 * @param self - The first option to be checked
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseEither = <B>(
  that: LazyArg<Option<B>>
) =>
  <A>(self: Option<A>): Option<Either<A, B>> =>
    isNone(self) ?
      pipe(that(), map(either.right)) :
      pipe(self, map(either.left))

/**
 * Given an Iterable collection of `Option`s, the function returns the first `Some` option found in the collection.
 *
 * @param collection - An iterable collection of `Option` to be searched
 *
 * @category error handling
 * @since 1.0.0
 */
export const firstSomeOf = <A>(collection: Iterable<Option<A>>): Option<A> => {
  let out: Option<A> = none()
  for (out of collection) {
    if (isSome(out)) {
      return out
    }
  }
  return out
}

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Returns the value of the option if it is a `Some`, otherwise returns `null`.
 *
 * @param self - The option to extract the value from
 *
 * @example
 * import { some, none, getOrNull } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(pipe(some(1), getOrNull), 1)
 * assert.strictEqual(pipe(none(), getOrNull), null)
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrNull: <A>(self: Option<A>) => A | null = getOrElse(constNull)

/**
 * Returns the value of the option if it is a `Some`, otherwise returns `undefined`.
 *
 * @param self - The option to extract the value from
 *
 * @example
 * import { some, none, getOrUndefined } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(pipe(some(1), getOrUndefined), 1)
 * assert.strictEqual(pipe(none(), getOrUndefined), undefined)
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrUndefined: <A>(self: Option<A>) => A | undefined = getOrElse(constUndefined)

/**
 * Converts an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * @example
 * import { none, some, fromThrowable } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(
 *   fromThrowable(() => {
 *     throw new Error()
 *   }),
 *   none()
 * )
 * assert.deepStrictEqual(fromThrowable(() => 1), some(1))
 *
 * @category interop
 * @since 1.0.0
 */
export const fromThrowable = <A>(f: () => A): Option<A> => {
  try {
    return some(f())
  } catch (e) {
    return option.none
  }
}

/**
 * Lifts a function that may throw to one returning a `Option`.
 *
 * @category interop
 * @since 1.0.0
 */
export const liftThrowable = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B
): ((...a: A) => Option<B>) => (...a) => fromThrowable(() => f(...a))

/**
 * Returns the contained value if the option is `Some`, otherwise throws an error.
 *
 * @param onNone - An optional function that returns the error to be thrown when the option is `None`
 * @param self - The option to extract the value from
 * @throws The error returned by `onError` if the option is `None`
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrThrow = (
  onNone: LazyArg<Error> = () => new Error("getOrThrow called on a None")
) =>
  <A>(self: Option<A>): A => {
    if (isSome(self)) {
      return self.value
    }
    throw onNone()
  }

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Maps the given function to the value of the `Option` if it is a `Some`, otherwise it returns `None`.
 *
 * @param f - The function to map over the value of the `Option`
 * @param self - An option to map
 *
 * @category mapping
 * @since 1.0.0
 */
export const map = <A, B>(f: (a: A) => B) =>
  (self: Option<A>): Option<B> => isNone(self) ? option.none : some(f(self.value))

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<OptionTypeLambda> = covariant.make(
  map
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<OptionTypeLambda> = {
  imap: Covariant.imap
}

/**
 * @since 1.0.0
 */
export const tupled: <A>(self: Option<A>) => Option<[A]> = invariant.tupled(Invariant)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(self: Option<A>) => Option<{ [K in N]: A }> = invariant.bindTo(Invariant)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = covariant
  .let(Covariant)

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
export const flap: <A>(a: A) => <B>(fab: Option<(a: A) => B>) => Option<B> = covariant.flap(
  Covariant
)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: <B>(b: B) => <_>(self: Option<_>) => Option<B> = covariant.as(Covariant)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asUnit: <_>(self: Option<_>) => Option<void> = covariant.asUnit(Covariant)

/**
 * @since 1.0.0
 */
export const of: <A>(a: A) => Option<A> = some

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<OptionTypeLambda> = {
  of: some
}

/**
 * @since 1.0.0
 */
export const unit: Option<void> = of_.unit(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const Do: Option<{}> = of_.Do(Of)

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<OptionTypeLambda> = {
  ...Of,
  ...Covariant
}

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap = <A, B>(f: (a: A) => Option<B>) =>
  (self: Option<A>): Option<B> => isNone(self) ? option.none : f(self.value)

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<OptionTypeLambda> = {
  flatMap
}

/**
 * @since 1.0.0
 */
export const flatten: <A>(self: Option<Option<A>>) => Option<A> = flatMap_
  .flatten(FlatMap)

/**
 * @since 1.0.0
 */
export const andThen: <B>(that: Option<B>) => <_>(self: Option<_>) => Option<B> = flatMap_
  .andThen(FlatMap)

/**
 * @since 1.0.0
 */
export const composeKleisliArrow: <B, C>(
  bfc: (b: B) => Option<C>
) => <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C> = flatMap_
  .composeKleisliArrow(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<OptionTypeLambda> = {
  ...FlatMap,
  ...Covariant
}

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = chainable
  .bind(Chainable)

/**
 * Sequences the specified `that` option but ignores its value.
 *
 * It is useful when we want to chain multiple operations, but only care about the result of `self`.
 *
 * @param that - The option that will be ignored in the chain and discarded
 * @param self - The option we care about
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThenDiscard: <_>(that: Option<_>) => <A>(self: Option<A>) => Option<A> = chainable
  .andThenDiscard(Chainable)

/**
 * Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
 * unless `f` returns `None`, in which case it returns `None`.
 *
 * This function is useful for performing additional computations on the value of the input `Option` without affecting its value.
 *
 * @param f - Function to apply to the value of the `Option` if it is `Some`
 * @param self - The `Option` to apply the function to
 *
 * @category combinators
 * @since 1.0.0
 */
export const tap: <A, _>(f: (a: A) => Option<_>) => (self: Option<A>) => Option<A> = chainable.tap(
  Chainable
)

/**
 * Useful for debugging purposes, the `onSome` callback is called with the value of `self` if it is a `Some`.
 *
 * @param onSome - callback function that is called with the value of `self` if it is a `Some`
 * @param self - the `Option` to inspect
 *
 * @category debugging
 * @since 1.0.0
 */
export const inspectSome = <A>(
  onSome: (a: A) => void
) =>
  (self: Option<A>): Option<A> => {
    if (isSome(self)) {
      onSome(self.value)
    }
    return self
  }

/**
 * Useful for debugging purposes, the `onNone` callback is is called if `self` is a `None`.
 *
 * @param onNone - callback function that is is called if `self` is a `None`
 * @param self - the `Option` to inspect
 *
 * @category debugging
 * @since 1.0.0
 */
export const inspectNone = (
  onNone: () => void
) =>
  <A>(self: Option<A>): Option<A> => {
    if (isNone(self)) {
      onNone()
    }
    return self
  }

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<OptionTypeLambda> = {
  ...Pointed,
  ...FlatMap
}

const productMany = <A>(
  self: Option<A>,
  collection: Iterable<Option<A>>
): Option<[A, ...Array<A>]> => {
  if (isNone(self)) {
    return option.none
  }
  const out: [A, ...Array<A>] = [self.value]
  for (const o of collection) {
    if (isNone(o)) {
      return option.none
    }
    out.push(o.value)
  }
  return some(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<OptionTypeLambda> = {
  ...Invariant,
  product: (self, that) =>
    isSome(self) && isSome(that) ? some([self.value, that.value]) : option.none,
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
  that: Option<B>
) => (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = semiProduct
  .andThenBind(SemiProduct)

/**
 * Adds an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const element: <B>(
  fb: Option<B>
) => <A extends ReadonlyArray<unknown>>(self: Option<A>) => Option<[...A, B]> = semiProduct
  .element(SemiProduct)

const productAll = <A>(collection: Iterable<Option<A>>): Option<Array<A>> => {
  const out: Array<A> = []
  for (const o of collection) {
    if (isNone(o)) {
      return option.none
    }
    out.push(o.value)
  }
  return some(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<OptionTypeLambda> = {
  ...Of,
  ...SemiProduct,
  productAll
}

/**
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Option<any>>>(
  ...tuple: T
) => Option<{ [I in keyof T]: [T[I]] extends [Option<infer A>] ? A : never }> = product_.tuple(
  Product
)

/**
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Option<any>>>(
  r: R
) => Option<{ [K in keyof R]: [R[K]] extends [Option<infer A>] ? A : never }> = product_
  .struct(Product)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<OptionTypeLambda> = {
  ...SemiProduct,
  ...Covariant
}

/**
 * Monoid that models the combination of values that may be absent, elements that are `None` are ignored
 * while elements that are `Some` are combined using the provided `Semigroup`.
 *
 * @example
 * import { getOptionalMonoid, some, none } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const M = getOptionalMonoid(N.SemigroupSum)
 * assert.deepStrictEqual(M.combine(none(), none()), none())
 * assert.deepStrictEqual(M.combine(some(1), none()), some(1))
 * assert.deepStrictEqual(M.combine(none(), some(1)), some(1))
 * assert.deepStrictEqual(M.combine(some(1), some(2)), some(3))
 *
 * @category lifting
 * @since 1.0.0
 */
export const getOptionalMonoid = <A>(
  Semigroup: Semigroup<A>
): Monoid<Option<A>> =>
  monoid.fromSemigroup(
    semigroup.fromCombine((self, that) =>
      isNone(self) ? that : isNone(that) ? self : some(Semigroup.combine(self.value, that.value))
    ),
    option.none
  )

/**
 * Lifts a binary function into `Option` as uncurried binary function.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A) => (b: B) => C
) => (that: Option<A>) => (self: Option<B>) => Option<C> = semiApplicative
  .lift2(SemiApplicative)

/**
 * @category products
 * @since 1.0.0
 */
export const zipWith: <B, A, C>(
  fb: Option<B>,
  f: (a: A, b: B) => C
) => (fa: Option<A>) => Option<C> = semiApplicative.zipWith(SemiApplicative)

/**
 * @since 1.0.0
 */
export const ap: <A>(
  fa: Option<A>
) => <B>(self: Option<(a: A) => B>) => Option<B> = semiApplicative.ap(
  SemiApplicative
)

/**
 * Semigroup that models the combination of computations that can fail, if at least one element is `None`
 * then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
 * is the combination of the wrapped elements using the provided `Semigroup`.
 *
 * See also `getFailureMonoid` if you need a `Monoid` instead of a `Semigroup`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getFailureSemigroup: <A>(S: Semigroup<A>) => Semigroup<Option<A>> = semiApplicative
  .liftSemigroup(SemiApplicative)

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<OptionTypeLambda> = {
  ...SemiApplicative,
  ...Product
}

/**
 * Monoid that models the combination of computations that can fail, if at least one element is `None`
 * then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
 * is the combination of the wrapped elements using the provided `Monoid`.
 *
 * The `empty` value is `some(M.empty)`.
 *
 * See also `getFailureSemigroup` if you need a `Semigroup` instead of a `Monoid`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getFailureMonoid: <A>(M: Monoid<A>) => Monoid<Option<A>> = applicative.liftMonoid(
  Applicative
)

const coproductMany = <A>(self: Option<A>, collection: Iterable<Option<A>>): Option<A> => {
  let out = self
  if (isSome(out)) {
    return out
  }
  for (out of collection) {
    if (isSome(out)) {
      return out
    }
  }
  return out
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct: semiCoproduct.SemiCoproduct<OptionTypeLambda> = {
  ...Invariant,
  coproduct: (self, that) => isSome(self) ? self : that,
  coproductMany
}

/**
 * Semigroup returning the first `Some` value encountered.
 *
 * @category instances
 * @since 1.0.0
 */
export const getFirstSomeSemigroup: <A>() => Semigroup<Option<A>> = semiCoproduct
  .getSemigroup(SemiCoproduct)

/**
 * @since 1.0.0
 */
export const coproductEither = <B>(that: Option<B>) =>
  <A>(self: Option<A>): Option<Either<A, B>> =>
    isNone(self) ? pipe(that, map(either.right)) : pipe(self, map(either.left))

/**
 * @category instances
 * @since 1.0.0
 */
export const Coproduct: coproduct_.Coproduct<OptionTypeLambda> = {
  ...SemiCoproduct,
  zero: none,
  coproductAll: firstSomeOf
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative: semiAlternative.SemiAlternative<OptionTypeLambda> = {
  ...Covariant,
  ...SemiCoproduct
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Alternative: alternative.Alternative<OptionTypeLambda> = {
  ...SemiAlternative,
  ...Coproduct
}

/**
 * @since 1.0.0
 */
export const reduce = <A, B>(b: B, f: (b: B, a: A) => B) =>
  (self: Option<A>): B => isNone(self) ? b : f(b, self.value)

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<OptionTypeLambda> = {
  reduce
}

/**
 * @since 1.0.0
 */
export const toArray: <A>(self: Option<A>) => Array<A> = foldable.toArray(Foldable)

/**
 * @category instances
 * @since 1.0.0
 */
export const Compactable: compactable.Compactable<OptionTypeLambda> = {
  compact: flatten
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const separate: <A, B>(self: Option<Either<A, B>>) => [Option<A>, Option<B>] = compactable
  .separate({ ...Covariant, ...Compactable })

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap = <A, B>(f: (a: A) => Option<B>) =>
  (self: Option<A>): Option<B> => isNone(self) ? option.none : f(self.value)

/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable: filterable.Filterable<OptionTypeLambda> = {
  filterMap
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: Option<C>) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: Option<B>) => Option<B>
} = filterable.filter(Filterable)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(
  F: applicative.Applicative<F>
) =>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ) =>
    (self: Option<A>): Kind<F, R, O, E, Option<B>> =>
      isNone(self) ? F.of<Option<B>>(option.none) : pipe(f(self.value), F.map(some))

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <R, O, E, A>(fas: Option<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Option<A>> = traversable
  .sequence<OptionTypeLambda>(traverse)

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<OptionTypeLambda> = {
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
) => (self: Option<A>) => Kind<F, R, O, E, Option<A>> = traversable
  .traverseTap(Traversable)

/**
 * Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
 * function when passed the `Option`'s value.
 *
 * @param onNone - The value to be returned if the `Option` is `None`
 * @param onSome - The function to be called if the `Option` is `Some`, it will be passed the `Option`'s value and its result will be returned
 * @param self - The `Option` to match
 *
 * @example
 * import { some, none, match } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none(),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
export const match = <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) =>
  (self: Option<A>): B | C => isNone(self) ? onNone() : onSome(self.value)

/**
 * Returns a *smart constructor* from a function that returns a nullable value.
 *
 * @example
 * import { liftNullable, none, some } from '@fp-ts/core/Option'
 *
 * const f = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const g = liftNullable(f)
 *
 * assert.deepStrictEqual(g('1'), some(1))
 * assert.deepStrictEqual(g('a'), none())
 *
 * @category lifting
 * @since 1.0.0
 */
export const liftNullable = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
): ((...a: A) => Option<NonNullable<B>>) => (...a) => fromNullable(f(...a))

/**
 * This is `flatMap` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, flatMapNullable } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * interface Employee {
 *   company?: {
 *     address?: {
 *       street?: {
 *         name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     flatMapNullable(company => company.address),
 *     flatMapNullable(address => address.street),
 *     flatMapNullable(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     flatMapNullable(company => company.address),
 *     flatMapNullable(address => address.street),
 *     flatMapNullable(street => street.name)
 *   ),
 *   none()
 * )
 *
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapNullable = <A, B>(f: (a: A) => B | null | undefined) =>
  (self: Option<A>): Option<NonNullable<B>> =>
    isNone(self) ? option.none : fromNullable(f(self.value))

/**
 * The `Order` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Order` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 * @example
 * import { none, some, liftOrder } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const O = liftOrder(N.Order)
 * assert.strictEqual(O.compare(none(), none()), 0)
 * assert.strictEqual(O.compare(none(), some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none()), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category sorting
 * @since 1.0.0
 */
export const liftOrder = <A>(O: Order<A>): Order<Option<A>> =>
  order.fromCompare((self, that) =>
    isSome(self) ? (isSome(that) ? O.compare(self.value, that.value) : 1) : -1
  )

/**
 * Returns a *smart constructor* based on the given predicate.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 *
 * const getOption = O.liftPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), O.none())
 * assert.deepStrictEqual(getOption(1), O.some(1))
 *
 * @category lifting
 * @since 1.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Option<B>
} = <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => predicate(b) ? some(b) : option.none

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftEither = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A): Option<B> => fromEither(f(...a))

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapEither = <A, E, B>(f: (a: A) => Either<E, B>) =>
  (self: Option<A>): Option<B> => pipe(self, flatMap(liftEither(f)))

/**
 * Returns a function that checks if an `Option` contains a given value using a provided `equivalence` function.
 *
 * @since 1.0.0
 */
export const contains = <A>(equivalence: Equivalence<A>) =>
  (a: A) => (self: Option<A>): boolean => isNone(self) ? false : equivalence(self.value, a)

/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none(),
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 1.0.0
 */
export const exists = <A>(predicate: Predicate<A>) =>
  (self: Option<A>): boolean => isNone(self) ? false : predicate(self.value)

/**
 * Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.
 *
 * @since 1.0.0
 *
 * @param b - The initial value of the accumulator
 * @param f - The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`
 * @param self - The Iterable of `Option<A>` to be reduced
 *
 * @example
 * import { some, none, reduceAll } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const iterable = [some(1), none(), some(2), none()]
 * assert.strictEqual(pipe(iterable, reduceAll(0, (b, a) => b + a)), 3)
 */
export const reduceAll = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Iterable<Option<A>>): B => {
    let out: B = b
    for (const oa of self) {
      if (isSome(oa)) {
        out = f(out, oa.value)
      }
    }
    return out
  }

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

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sumAll = (self: Iterable<Option<number>>): number => {
  let out = 0
  for (const oa of self) {
    if (isSome(oa)) {
      out += oa.value
    }
  }
  return out
}

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiplyAll = (self: Iterable<Option<number>>): number => {
  let out = 1
  for (const oa of self) {
    if (isSome(oa)) {
      const a: number = oa.value
      if (a === 0) {
        return 0
      }
      out *= a
    }
  }
  return out
}
