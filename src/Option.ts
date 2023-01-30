/**
 * @since 1.0.0
 */
import * as BI from "@fp-ts/core/Bigint"
import type { Either } from "@fp-ts/core/Either"
import type { LazyArg } from "@fp-ts/core/Function"
import { constNull, constUndefined, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { structural } from "@fp-ts/core/internal/effect"
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
 * Creates a new `Option` that represents the absence of a value.
 *
 * This can be useful when working with optional values or to represent a computation that failed.
 * It returns a new `Option` object that does not contain any value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const none = <A = never>(): Option<A> => option.none

/**
 * Creates a new `Option` that wraps the given value.
 *
 * This can be useful when working with optional values or to represent a computation that succeeded with a value.
 *
 * @param value - The value to wrap.
 *
 * @category constructors
 * @since 1.0.0
 */
export const some: <A>(value: A) => Option<A> = option.some

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------

/**
 * Checks if the specified value is an instance of `Option`, returns `true` if it is, `false` otherwise.
 *
 * @param input - The value to check.
 *
 * @example
 * import { some, none, isOption } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(isOption(some(1)), true)
 * assert.deepStrictEqual(isOption(none()), true)
 * assert.deepStrictEqual(isOption({}), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isOption = (u: unknown): u is Option<unknown> =>
  typeof u === "object" && u != null && structural in u && "_tag" in u &&
  (u["_tag"] === "None" || u["_tag"] === "Some")

/**
 * Returns `true` if the `Option` is `None`, `false` otherwise.
 *
 * @param self - The `Option` to check.
 *
 * @example
 * import { some, none, isNone } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(isNone(some(1)), false)
 * assert.deepStrictEqual(isNone(none()), true)
 *
 * @category guards
 * @since 1.0.0
 */
export const isNone: <A>(self: Option<A>) => self is None = option.isNone

/**
 * Returns `true` if the `Option` is an instance of `Some`, `false` otherwise.
 *
 * @param self - The `Option` to check.
 *
 * @example
 * import { some, none, isSome } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(isSome(some(1)), true)
 * assert.deepStrictEqual(isSome(none()), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isSome: <A>(self: Option<A>) => self is Some<A> = option.isSome

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

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
 * Converts an `Iterable` of values into an `Option`. Returns the first value of the `Iterable` wrapped in a `Some`
 * if the `Iterable` is not empty, otherwise returns `None`.
 *
 * @param collection - The `Iterable` to be converted to an `Option`.
 *
 * @example
 * import { fromIterable, some, none } from '@fp-ts/core/Option'
 *
 * const collection = [1, 2, 3]
 * assert.deepStrictEqual(fromIterable(collection), some(1))
 * assert.deepStrictEqual(fromIterable([]), none())
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable = <A>(collection: Iterable<A>): Option<A> => {
  for (const a of collection) {
    return some(a)
  }
  return none()
}

/**
 * Converts a `Either` to an `Option` discarding the error.
 *
 * @param self - The `Either` to convert to an `Option`.
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
 * Converts an `Option` to an `Either`, allowing you to provide a value to be used in the case of a `None`.
 *
 * @param onNone - a function that produces an error value when the `Option` is `None`.
 * @param self - the `Option` to convert.
 *
 * @example
 * import { pipe } from '@fp-ts/core/Function'
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 *
 * const onNone = () => 'error'
 * assert.deepStrictEqual(pipe(O.some(1), O.toEither(onNone)), E.right(1))
 * assert.deepStrictEqual(pipe(O.none(), O.toEither(onNone)), E.left('error'))
 *
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
 * @param onNone - Function that returns the default value to return if the `Option` is `None`.
 * @param self - The `Option` to get the value of.
 *
 * @example
 * import { some, none, getOrElse } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(some(1), getOrElse(() => 0)), 1)
 * assert.deepStrictEqual(pipe(none(), getOrElse(() => 0)), 0)
 *
 * @category error handling
 * @since 1.0.0
 */
export const getOrElse = <B>(onNone: LazyArg<B>) =>
  <A>(self: Option<A>): A | B => isNone(self) ? onNone() : self.value

/**
 * Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.
 *
 * @param that - The `Option` to return if `self` is `None`.
 * @param self - The first `Option` to be checked.
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
 * which contains information about which of the two `Option`s has been chosen.
 *
 * This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.
 *
 * @param that - The second `Option` to be considered if the first `Option` is `None`.
 * @param self - The first `Option` to be checked.
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
 * Given an Iterable collection of `Option`s, the function returns the first `Some` found in the collection.
 *
 * @param collection - An iterable collection of `Option` to be searched.
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
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @param nullableValue - The nullable value to be converted to an `Option`.
 *
 * @example
 * import { none, some, fromNullable } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none())
 * assert.deepStrictEqual(fromNullable(null), none())
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category interop
 * @since 1.0.0
 */
export const fromNullable = <A>(
  nullableValue: A
): Option<
  NonNullable<A>
> => (nullableValue == null ? none() : some(nullableValue as NonNullable<A>))

/**
 * This API is useful for lifting a function that returns `null` or `undefined` into the `Option` context.
 *
 * @example
 * import { liftNullable, none, some } from '@fp-ts/core/Option'
 *
 * const parse = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const parseOption = liftNullable(parse)
 *
 * assert.deepStrictEqual(parseOption('1'), some(1))
 * assert.deepStrictEqual(parseOption('not a number'), none())
 *
 * @category lifting
 * @since 1.0.0
 */
export const liftNullable = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
): ((...a: A) => Option<NonNullable<B>>) => (...a) => fromNullable(f(...a))

/**
 * Returns the value of the `Option` if it is a `Some`, otherwise returns `null`.
 *
 * @param self - The `Option` to extract the value from.
 *
 * @example
 * import { some, none, getOrNull } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(some(1), getOrNull), 1)
 * assert.deepStrictEqual(pipe(none(), getOrNull), null)
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrNull: <A>(self: Option<A>) => A | null = getOrElse(constNull)

/**
 * Returns the value of the `Option` if it is a `Some`, otherwise returns `undefined`.
 *
 * @param self - The `Option` to extract the value from.
 *
 * @example
 * import { some, none, getOrUndefined } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(some(1), getOrUndefined), 1)
 * assert.deepStrictEqual(pipe(none(), getOrUndefined), undefined)
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrUndefined: <A>(self: Option<A>) => A | undefined = getOrElse(constUndefined)

/**
 * This is `flatMap` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, flatMapNullable } from '@fp-ts/core/Option'
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
 *     some(employee1),
 *     flatMapNullable(employee => employee.company?.address?.street?.name),
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     some(employee2),
 *     flatMapNullable(employee => employee.company?.address?.street?.name),
 *   ),
 *   none()
 * )
 *
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapNullable = <A, B>(f: (a: A) => B | null | undefined) =>
  (self: Option<A>): Option<NonNullable<B>> => isNone(self) ? none() : fromNullable(f(self.value))

/**
 * A utility function that lifts a function that throws exceptions into a function that returns an `Option`.
 *
 * This function is useful for any function that might throw an exception, allowing the developer to handle
 * the exception in a more functional way.
 *
 * @param f - the function that can throw exceptions.
 *
 * @example
 * import { liftThrowable, some, none } from "@fp-ts/core/Option";
 *
 * const parse = liftThrowable(JSON.parse)
 *
 * assert.deepStrictEqual(parse("1"), some(1))
 * assert.deepStrictEqual(parse(""), none())
 *
 * @category interop
 * @since 1.0.0
 */
export const liftThrowable = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B
): ((...a: A) => Option<B>) =>
  (...a) => {
    try {
      return some(f(...a))
    } catch (e) {
      return none()
    }
  }

/**
 * Returns the contained value if the `Option` is `Some`, otherwise throws an error.
 *
 * @param onNone - An optional function that returns the error to be thrown when the `Option` is `None`.
 * @param self - The `Option` to extract the value from.
 * @throws The error returned by `onNone` if the `Option` is `None`.
 *
 * @example
 * import { pipe } from '@fp-ts/core/Function'
 * import * as O from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(pipe(O.some(1), O.getOrThrow()), 1)
 * assert.throws(() => pipe(O.none(), O.getOrThrow()))
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
 * @param self - An `Option` to map
 *
 * @category mapping
 * @since 1.0.0
 */
export const map = <A, B>(f: (a: A) => B) =>
  (self: Option<A>): Option<B> => isNone(self) ? none() : some(f(self.value))

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
export const flap: <A, B>(self: Option<(a: A) => B>) => (a: A) => Option<B> = covariant
  .flap(Covariant)

/**
 * Maps the `Some` value of this `Option` to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: <B>(b: B) => <_>(self: Option<_>) => Option<B> = covariant.as(Covariant)

/**
 * Returns the `Option` resulting from mapping the `Some` value to `void`.
 *
 * This is useful when the value of the `Option` is not needed, but the presence or absence of the value is important.
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
  of,
  imap: Invariant.imap,
  map
}

/**
 * Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap = <A, B>(f: (a: A) => Option<B>) =>
  (self: Option<A>): Option<B> => isNone(self) ? none() : f(self.value)

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
  imap: Invariant.imap,
  map,
  flatMap
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
 * Sequences the specified `that` `Option` but ignores its value.
 *
 * It is useful when we want to chain multiple operations, but only care about the result of `self`.
 *
 * @param that - The `Option` that will be ignored in the chain and discarded
 * @param self - The `Option` we care about
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
  imap: Invariant.imap,
  of,
  map,
  flatMap
}

const productMany = <A>(
  self: Option<A>,
  collection: Iterable<Option<A>>
): Option<[A, ...Array<A>]> => {
  if (isNone(self)) {
    return none()
  }
  const out: [A, ...Array<A>] = [self.value]
  for (const o of collection) {
    if (isNone(o)) {
      return none()
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
  imap: Invariant.imap,
  product: (self, that) => isSome(self) && isSome(that) ? some([self.value, that.value]) : none(),
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
      return none()
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
  of,
  imap: Invariant.imap,
  product: SemiProduct.product,
  productMany: SemiProduct.productMany,
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
  imap: Invariant.imap,
  map: Covariant.map,
  product: SemiProduct.product,
  productMany: SemiProduct.productMany
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
    none()
  )

/**
 * Applies a function to the contained value of two `Option`s, returning a new `Option` of the result.
 * If either of the `Option`s is `None`, the result will be `None`.
 *
 * @param f - A function to apply to the contained values of the `Option`s
 * @param that - An `Option` to lift the function over
 * @param self - An `Option` to lift the function over
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A) => (b: B) => C
) => (that: Option<A>) => (self: Option<B>) => Option<C> = semiApplicative
  .lift2(SemiApplicative)

/**
 * Zips two `Option` values together using a provided function, returning a new `Option` of the result.
 *
 * @param fa - The left-hand side of the zip operation
 * @param fb - The right-hand side of the zip operation
 * @param f - The function used to combine the values of the two `Option`s
 *
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
  imap: Invariant.imap,
  of,
  map,
  product: SemiProduct.product,
  productMany: SemiProduct.productMany,
  productAll
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
  imap: Invariant.imap,
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
  map,
  imap: Invariant.imap,
  coproduct: SemiCoproduct.coproduct,
  coproductMany: SemiCoproduct.coproductMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Alternative: alternative.Alternative<OptionTypeLambda> = {
  map,
  imap: Invariant.imap,
  coproduct: SemiCoproduct.coproduct,
  coproductMany: SemiCoproduct.coproductMany,
  coproductAll: Coproduct.coproductAll,
  zero: Coproduct.zero
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
 * Transforms an `Option` into an `Array`.
 * If the input is `None`, an empty array is returned.
 * If the input is `Some`, the value is wrapped in an array.
 *
 * @param self - The `Option` to convert to an array.
 *
 * @example
 * import { some, none, toArray } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(toArray(some(1)), [1])
 * assert.deepStrictEqual(toArray(none()), [])
 *
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
 * Maps over the value of an `Option` and filters out `None`s.
 *
 * Useful when in addition to filtering you also want to change the type of the `Option`.
 *
 * @param f - A function to apply to the value of the `Option`.
 * @param self - The `Option` to map over.
 *
 * @category filtering
 * @since 1.0.0
 */
export const filterMap = <A, B>(f: (a: A) => Option<B>) =>
  (self: Option<A>): Option<B> => isNone(self) ? none() : f(self.value)

/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable: filterable.Filterable<OptionTypeLambda> = {
  filterMap
}

/**
 * Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.
 *
 * If you need to change the type of the `Option` in addition to filtering, see `filterMap`.
 *
 * @param predicate - A predicate function to apply to the `Option` value.
 * @param fb - The `Option` to filter.
 *
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
      isNone(self) ? F.of<Option<B>>(none()) : pipe(f(self.value), F.map(some))

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
 * assert.deepStrictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.deepStrictEqual(
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
 * assert.deepStrictEqual(O.compare(none(), none()), 0)
 * assert.deepStrictEqual(O.compare(none(), some(1)), -1)
 * assert.deepStrictEqual(O.compare(some(1), none()), 1)
 * assert.deepStrictEqual(O.compare(some(1), some(2)), -1)
 * assert.deepStrictEqual(O.compare(some(1), some(1)), 0)
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
} = <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => predicate(b) ? some(b) : none()

/**
 * Lifts an `Either` function to an `Option` function.
 *
 * @param f - Any variadic function that returns an `Either`.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 *
 * const parse = (s: string) =>
 *   isNaN(+s) ? E.left(`Error: ${s} is not a number`) : E.right(+s)
 *
 * const parseNumber = O.liftEither(parse)
 *
 * assert.deepEqual(parseNumber('12'), O.some(12))
 * assert.deepEqual(parseNumber('not a number'), O.none())
 *
 * @category lifting
 * @since 1.0.0
 */
export const liftEither = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A): Option<B> => fromEither(f(...a))

/**
 * Applies a provided function that returns an `Either` to the contents of an `Option`, flattening the result into another `Option`.
 *
 * @param f - The function to be applied to the contents of the `Option`.
 * @param self - The `Option` to apply the function to.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const f = (n: number) => (n > 2 ? E.left('Too big') : E.right(n + 1))
 *
 * assert.deepStrictEqual(pipe(O.some(1), O.flatMapEither(f)), O.some(2))
 * assert.deepStrictEqual(pipe(O.some(3), O.flatMapEither(f)), O.none())
 *
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapEither = <A, E, B>(f: (a: A) => Either<E, B>) =>
  (self: Option<A>): Option<B> => pipe(self, flatMap(liftEither(f)))

/**
 * Returns a function that checks if an `Option` contains a given value using a provided `Equivalence` instance.
 *
 * @param equivalence - An `Equivalence` instance to compare values of the `Option`.
 * @param a - The value to compare against the `Option`.
 *
 * @example
 * import { some, none, contains } from '@fp-ts/core/Option'
 * import { Equivalence } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(some(2), contains(Equivalence)(2)), true)
 * assert.deepStrictEqual(pipe(some(1), contains(Equivalence)(2)), false)
 * assert.deepStrictEqual(pipe(none(), contains(Equivalence)(2)), false)
 *
 * @since 1.0.0
 */
export const contains = <A>(equivalence: Equivalence<A>) =>
  (a: A) => (self: Option<A>): boolean => isNone(self) ? false : equivalence(self.value, a)

/**
 * Check if a value in an `Option` type meets a certain predicate.
 *
 * @param predicate - The condition to check.
 * @param self - The `Option` to check.
 *
 * @example
 * import { some, none, exists } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const isEven = (n: number) => n % 2 === 0
 *
 * assert.deepStrictEqual(pipe(some(2), exists(isEven)), true)
 * assert.deepStrictEqual(pipe(some(1), exists(isEven)), false)
 * assert.deepStrictEqual(pipe(none(), exists(isEven)), false)
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
 * @param b - The initial value of the accumulator.
 * @param f - The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.
 * @param self - The Iterable of `Option<A>` to be reduced.
 *
 * @example
 * import { some, none, reduceAll } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const iterable = [some(1), none(), some(2), none()]
 * assert.deepStrictEqual(pipe(iterable, reduceAll(0, (b, a) => b + a)), 3)
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
 * Sum all numbers in an iterable of `Option<number>` ignoring the `None` values.
 *
 * @param self - The iterable of `Option<number>` to be summed.
 *
 * @example
 * import { sumAll, some, none } from '@fp-ts/core/Option'
 *
 * const iterable = [some(2), none(), some(3), none()]
 * assert.deepStrictEqual(sumAll(iterable), 5)
 *
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
 * Multiply all numbers in an iterable of `Option<number>` ignoring the `None` values.
 *
 * @param self - The iterable of `Option<number>` to be multiplied.
 *
 * @example
 * import { multiplyAll, some, none } from '@fp-ts/core/Option'
 *
 * const iterable = [some(2), none(), some(3), none()]
 * assert.deepStrictEqual(multiplyAll(iterable), 6)
 *
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
