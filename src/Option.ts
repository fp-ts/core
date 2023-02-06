/**
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/Either"
import type { LazyArg } from "@fp-ts/core/Function"
import { constNull, constUndefined, dual } from "@fp-ts/core/Function"
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
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
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
// models
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

/**
 * Alias of {@link some}.
 *
 * @category constructors
 * @since 1.0.0
 */
export const of: <A>(value: A) => Option<A> = some

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
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
 * function when passed the `Option`'s value.
 *
 * @param self - The `Option` to match
 * @param onNone - The value to be returned if the `Option` is `None`
 * @param onSome - The function to be called if the `Option` is `Some`, it will be passed the `Option`'s value and its result will be returned
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
export const match: {
  <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C): (self: Option<A>) => B | C
  <A, B, C = B>(self: Option<A>, onNone: LazyArg<B>, onSome: (a: A) => C): B | C
} = dual(
  3,
  <A, B, C = B>(self: Option<A>, onNone: LazyArg<B>, onSome: (a: A) => C): B | C =>
    isNone(self) ? onNone() : onSome(self.value)
)

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
 * Converts a `Either` to an `Option` discarding the error.
 *
 * Alias of {@link fromEither}.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 *
 * assert.deepStrictEqual(O.getRight(E.right('ok')), O.some('ok'))
 * assert.deepStrictEqual(O.getRight(E.left('err')), O.none())
 *
 * @category conversions
 * @since 1.0.0
 */
export const getRight: <E, A>(self: Either<E, A>) => Option<A> = fromEither

/**
 * Converts a `Either` to an `Option` discarding the value.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 *
 * assert.deepStrictEqual(O.getLeft(E.right('ok')), O.none())
 * assert.deepStrictEqual(O.getLeft(E.left('err')), O.some('err'))
 *
 * @category conversions
 * @since 1.0.0
 */
export const getLeft: <E, A>(self: Either<E, A>) => Option<E> = either.getLeft

/**
 * Converts an `Option` to an `Either`, allowing you to provide a value to be used in the case of a `None`.
 *
 * @param self - the `Option` to convert.
 * @param onNone - a function that produces an error value when the `Option` is `None`.
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
export const toEither: {
  <A, E>(self: Option<A>, onNone: () => E): Either<E, A>
  <E>(onNone: () => E): <A>(self: Option<A>) => Either<E, A>
} = either.fromOption

// -------------------------------------------------------------------------------------
// error handling
// -------------------------------------------------------------------------------------

/**
 * Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`
 *
 * @param self - The `Option` to get the value of.
 * @param onNone - Function that returns the default value to return if the `Option` is `None`.
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
export const getOrElse: {
  <B>(onNone: LazyArg<B>): <A>(self: Option<A>) => B | A
  <A, B>(self: Option<A>, onNone: LazyArg<B>): A | B
} = dual(
  2,
  <A, B>(self: Option<A>, onNone: LazyArg<B>): A | B => isNone(self) ? onNone() : self.value
)

/**
 * Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.
 *
 * @param self - The first `Option` to be checked.
 * @param that - The `Option` to return if `self` is `None`.
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
export const orElse: {
  <B>(that: LazyArg<Option<B>>): <A>(self: Option<A>) => Option<B | A>
  <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<A | B>
} = dual(
  2,
  <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<A | B> => isNone(self) ? that() : self
)

/**
 * Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
 * which contains information about which of the two `Option`s has been chosen.
 *
 * This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.
 *
 * @param self - The first `Option` to be checked.
 * @param that - The second `Option` to be considered if the first `Option` is `None`.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseEither: {
  <B>(that: LazyArg<Option<B>>): <A>(self: Option<A>) => Option<Either<A, B>>
  <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<Either<A, B>>
} = dual(
  2,
  <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<Either<A, B>> =>
    isNone(self) ? map(that(), either.right) : map(self, either.left)
)

/**
 * Given an `Iterable` collection of `Option`s, the function returns the first `Some` found in the collection.
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
 * @category interop
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
 * @param self - The `Option` to extract the value from.
 * @throws `Error("getOrThrow called on a None")`
 *
 * @example
 * import { pipe } from '@fp-ts/core/Function'
 * import * as O from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(pipe(O.some(1), O.getOrThrow), 1)
 * assert.throws(() => pipe(O.none(), O.getOrThrow))
 *
 * @category interop
 * @since 1.0.0
 */
export const getOrThrow = <A>(self: Option<A>): A => {
  if (isSome(self)) {
    return self.value
  }
  throw new Error("getOrThrow called on a None")
}

// -------------------------------------------------------------------------------------
// mapping
// -------------------------------------------------------------------------------------

/**
 * Maps the `Some` side of an `Option` value to a new `Option` value.
 *
 * @param self - An `Option` to map
 * @param f - The function to map over the value of the `Option`
 *
 * @category mapping
 * @since 1.0.0
 */
export const map: {
  <A, B>(f: (a: A) => B): (self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => B): Option<B>
} = dual(
  2,
  <A, B>(self: Option<A>, f: (a: A) => B): Option<B> => isNone(self) ? none() : some(f(self.value))
)

const imap = covariant.imap<OptionTypeLambda>(map)

/**
 * @category mapping
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<OptionTypeLambda> = {
  imap,
  map
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<OptionTypeLambda> = {
  imap
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const tupled: <A>(self: Option<A>) => Option<[A]> = invariant.tupled(Invariant)

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: {
  <A, B>(a: A, self: Option<(a: A) => B>): Option<B>
  <A, B>(self: Option<(a: A) => B>): (a: A) => Option<B>
} = covariant.flap(Covariant)

/**
 * Maps the `Some` value of this `Option` to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: {
  <_, B>(self: Option<_>, b: B): Option<B>
  <B>(b: B): <_>(self: Option<_>) => Option<B>
} = covariant.as(Covariant)

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
export const Of: of_.Of<OptionTypeLambda> = {
  of
}

/**
 * @since 1.0.0
 */
export const unit: Option<void> = of_.unit(Of)

/**
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<OptionTypeLambda> = {
  of,
  imap,
  map
}

// -------------------------------------------------------------------------------------
// sequencing
// -------------------------------------------------------------------------------------

/**
 * Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap: {
  <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>
} = dual(
  2,
  <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B> =>
    isNone(self) ? none() : f(self.value)
)

/**
 * Applies a provided function that returns an `Either` to the contents of an `Option`, flattening the result into another `Option`.
 *
 * @param self - The `Option` to apply the function to.
 * @param f - The function to be applied to the contents of the `Option`.
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
export const flatMapEither: {
  <A, E, B>(f: (a: A) => Either<E, B>): (self: Option<A>) => Option<B>
  <A, E, B>(self: Option<A>, f: (a: A) => Either<E, B>): Option<B>
} = dual(
  2,
  <A, E, B>(self: Option<A>, f: (a: A) => Either<E, B>): Option<B> => flatMap(self, liftEither(f))
)

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
export const flatMapNullable: {
  <A, B>(f: (a: A) => B | null | undefined): (self: Option<A>) => Option<NonNullable<B>>
  <A, B>(self: Option<A>, f: (a: A) => B | null | undefined): Option<NonNullable<B>>
} = dual(
  2,
  <A, B>(self: Option<A>, f: (a: A) => B | null | undefined): Option<NonNullable<B>> =>
    isNone(self) ? none() : fromNullable(f(self.value))
)

/**
 * @category sequencing
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<OptionTypeLambda> = {
  flatMap
}

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatten: <A>(self: Option<Option<A>>) => Option<A> = flatMap_.flatten(FlatMap)

/**
 * @category sequencing
 * @since 1.0.0
 */
export const andThen: {
  <_, B>(self: Option<_>, that: Option<B>): Option<B>
  <B>(that: Option<B>): <_>(self: Option<_>) => Option<B>
} = flatMap_.andThen(FlatMap)

/**
 * @category sequencing
 * @since 1.0.0
 */
export const composeKleisliArrow: {
  <A, B, C>(afb: (a: A) => Option<B>, bfc: (b: B) => Option<C>): (a: A) => Option<C>
  <B, C>(bfc: (b: B) => Option<C>): <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C>
} = flatMap_.composeKleisliArrow(FlatMap)

/**
 * @category sequencing
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<OptionTypeLambda> = {
  imap,
  map,
  flatMap
}

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
export const andThenDiscard: {
  <A, _>(self: Option<A>, that: Option<_>): Option<A>
  <_>(that: Option<_>): <A>(self: Option<A>) => Option<A>
} = chainable.andThenDiscard(Chainable)

/**
 * Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
 * unless `f` returns `None`, in which case it returns `None`.
 *
 * This function is useful for performing additional computations on the value of the input `Option` without affecting its value.
 *
 * @param f - Function to apply to the value of the `Option` if it is `Some`
 * @param self - The `Option` to apply the function to
 *
 * @category sequencing
 * @since 1.0.0
 */
export const tap: {
  <A, _>(self: Option<A>, f: (a: A) => Option<_>): Option<A>
  <A, _>(f: (a: A) => Option<_>): (self: Option<A>) => Option<A>
} = chainable.tap(Chainable)

// -------------------------------------------------------------------------------------
// debugging
// -------------------------------------------------------------------------------------

/**
 * Useful for debugging purposes, the `onSome` callback is called with the value of `self` if it is a `Some`.
 *
 * @param self - the `Option` to inspect
 * @param onSome - callback function that is called with the value of `self` if it is a `Some`
 *
 * @category debugging
 * @since 1.0.0
 */
export const inspectSome: {
  <A>(onSome: (a: A) => void): (self: Option<A>) => Option<A>
  <A>(self: Option<A>, onSome: (a: A) => void): Option<A>
} = dual(2, <A>(self: Option<A>, onSome: (a: A) => void): Option<A> => {
  if (isSome(self)) {
    onSome(self.value)
  }
  return self
})

/**
 * Useful for debugging purposes, the `onNone` callback is is called if `self` is a `None`.
 *
 * @param self - the `Option` to inspect
 * @param onNone - callback function that is is called if `self` is a `None`
 *
 * @category debugging
 * @since 1.0.0
 */
export const inspectNone: {
  (onNone: () => void): <A>(self: Option<A>) => Option<A>
  <A>(self: Option<A>, onNone: () => void): Option<A>
} = dual(2, <A>(self: Option<A>, onNone: () => void): Option<A> => {
  if (isNone(self)) {
    onNone()
  }
  return self
})

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<OptionTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<OptionTypeLambda> = semiProduct.make(
  Invariant,
  (self, that) => isSome(self) && isSome(that) ? some([self.value, that.value]) : none(),
  <A>(
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
)

/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const appendElement: {
  <A extends ReadonlyArray<any>, B>(self: Option<A>, that: Option<B>): Option<[...A, B]>
  <B>(that: Option<B>): <A extends ReadonlyArray<any>>(self: Option<A>) => Option<[...A, B]>
} = semiProduct.appendElement(SemiProduct)

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
  imap,
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
) => Option<{ [K in keyof R]: [R[K]] extends [Option<infer A>] ? A : never }> = product_.struct(
  Product
)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<OptionTypeLambda> = {
  imap,
  map,
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
 * @category instances
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

// -------------------------------------------------------------------------------------
// combining
// -------------------------------------------------------------------------------------

/**
 * Zips two `Option` values together using a provided function, returning a new `Option` of the result.
 *
 * @param self - The left-hand side of the zip operation
 * @param that - The right-hand side of the zip operation
 * @param f - The function used to combine the values of the two `Option`s
 *
 * @category combining
 * @since 1.0.0
 */
export const zipWith: {
  <A, B, C>(self: Option<A>, that: Option<B>, f: (a: A, b: B) => C): Option<C>
  <B, A, C>(that: Option<B>, f: (a: A, b: B) => C): (self: Option<A>) => Option<C>
} = semiApplicative.zipWith(SemiApplicative)

/**
 * @category combining
 * @since 1.0.0
 */
export const ap: {
  <A, B>(self: Option<(a: A) => B>, that: Option<A>): Option<B>
  <A>(that: Option<A>): <B>(self: Option<(a: A) => B>) => Option<B>
} = semiApplicative.ap(SemiApplicative)

/**
 * Semigroup that models the combination of computations that can fail, if at least one element is `None`
 * then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
 * is the combination of the wrapped elements using the provided `Semigroup`.
 *
 * See also `getFailureMonoid` if you need a `Monoid` instead of a `Semigroup`.
 *
 * @category combining
 * @since 1.0.0
 */
export const getFailureSemigroup: <A>(S: Semigroup<A>) => Semigroup<Option<A>> = semiApplicative
  .getSemigroup(SemiApplicative)

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<OptionTypeLambda> = {
  imap,
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
 * @category combining
 * @since 1.0.0
 */
export const getFailureMonoid: <A>(M: Monoid<A>) => Monoid<Option<A>> = applicative.getMonoid(
  Applicative
)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct: semiCoproduct.SemiCoproduct<OptionTypeLambda> = semiCoproduct.make(
  Invariant,
  (self, that) => isSome(self) ? self : that,
  (self, collection) => {
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
)

/**
 * Semigroup returning the first `Some` value encountered.
 *
 * @category combining
 * @since 1.0.0
 */
export const getFirstSomeSemigroup: <A>() => Semigroup<Option<A>> = semiCoproduct
  .getSemigroup(SemiCoproduct)

/**
 * @category instances
 * @since 1.0.0
 */
export const Coproduct: coproduct_.Coproduct<OptionTypeLambda> = {
  imap,
  coproduct: SemiCoproduct.coproduct,
  coproductMany: SemiCoproduct.coproductMany,
  zero: none,
  coproductAll: firstSomeOf
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative: semiAlternative.SemiAlternative<OptionTypeLambda> = {
  map,
  imap,
  coproduct: SemiCoproduct.coproduct,
  coproductMany: SemiCoproduct.coproductMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Alternative: alternative.Alternative<OptionTypeLambda> = {
  map,
  imap,
  coproduct: SemiCoproduct.coproduct,
  coproductMany: SemiCoproduct.coproductMany,
  coproductAll: firstSomeOf,
  zero: none
}

// -------------------------------------------------------------------------------------
// folding
// -------------------------------------------------------------------------------------

/**
 * Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.
 *
 * @param self - The Iterable of `Option<A>` to be reduced.
 * @param b - The initial value of the accumulator.
 * @param f - The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.
 *
 * @example
 * import { some, none, reduceCompact } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const iterable = [some(1), none(), some(2), none()]
 * assert.deepStrictEqual(pipe(iterable, reduceCompact(0, (b, a) => b + a)), 3)
 *
 * @category folding
 * @since 1.0.0
 */
export const reduceCompact: {
  <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<Option<A>>) => B
  <A, B>(self: Iterable<Option<A>>, b: B, f: (b: B, a: A) => B): B
} = dual(
  3,
  <A, B>(self: Iterable<Option<A>>, b: B, f: (b: B, a: A) => B): B => {
    let out: B = b
    for (const oa of self) {
      if (isSome(oa)) {
        out = f(out, oa.value)
      }
    }
    return out
  }
)

/**
 * @category folding
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<OptionTypeLambda> = {
  reduce: dual(
    3,
    <A, B>(self: Option<A>, b: B, f: (b: B, a: A) => B): B => isNone(self) ? b : f(b, self.value)
  )
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
 * @category conversions
 * @since 1.0.0
 */
export const toArray: <A>(self: Option<A>) => Array<A> = foldable.toArray(Foldable)

// -------------------------------------------------------------------------------------
// filtering
// -------------------------------------------------------------------------------------

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
export const partitionMap: {
  <A, B, C>(f: (a: A) => Either<B, C>): (self: Option<A>) => [Option<B>, Option<C>]
  <A, B, C>(self: Option<A>, f: (a: A) => Either<B, C>): [Option<B>, Option<C>]
} = dual(2, <A, B, C>(
  self: Option<A>,
  f: (a: A) => Either<B, C>
): [Option<B>, Option<C>] => {
  if (isNone(self)) {
    return [none(), none()]
  }
  const e = f(self.value)
  return either.isLeft(e) ? [some(e.left), none()] : [none(), some(e.right)]
})

/**
 * Maps over the value of an `Option` and filters out `None`s.
 *
 * Useful when in addition to filtering you also want to change the type of the `Option`.
 *
 * @param self - The `Option` to map over.
 * @param f - A function to apply to the value of the `Option`.
 *
 * @category filtering
 * @since 1.0.0
 */
export const filterMap: {
  <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>
} = dual(
  2,
  <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B> =>
    isNone(self) ? none() : f(self.value)
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable: filterable.Filterable<OptionTypeLambda> = {
  partitionMap,
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
  <C extends A, B extends A, A = C>(self: Option<C>, refinement: (a: A) => a is B): Option<B>
  <B extends A, A = B>(self: Option<B>, predicate: (a: A) => boolean): Option<B>
  <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): (self: Option<C>) => Option<B>
  <B extends A, A = B>(predicate: (a: A) => boolean): (self: Option<B>) => Option<B>
} = filterable.filter(Filterable)

// -------------------------------------------------------------------------------------
// traversing
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<OptionTypeLambda> = traversable.make(<
  F extends TypeLambda
>(F: applicative.Applicative<F>) =>
  <A, R, O, E, B>(self: Option<A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Option<B>> =>
    isNone(self) ? F.of<Option<B>>(none()) : F.map(f(self.value), some)
)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): (self: Option<A>) => Kind<F, R, O, E, Option<B>>
  <A, R, O, E, B>(
    self: Option<A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Option<B>>
} = Traversable.traverse

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <R, O, E, A>(self: Option<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Option<A>> = traversable
  .sequence(Traversable)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(
    self: Option<A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Option<A>>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): (self: Option<A>) => Kind<F, R, O, E, Option<A>>
} = traversable.traverseTap(Traversable)

// -------------------------------------------------------------------------------------
// equivalence
// -------------------------------------------------------------------------------------

/**
 * @example
 * import { none, some, getEquivalence } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/number'
 *
 * const isEquivalent = getEquivalence(N.Equivalence)
 * assert.deepStrictEqual(isEquivalent(none(), none()), true)
 * assert.deepStrictEqual(isEquivalent(none(), some(1)), false)
 * assert.deepStrictEqual(isEquivalent(some(1), none()), false)
 * assert.deepStrictEqual(isEquivalent(some(1), some(2)), false)
 * assert.deepStrictEqual(isEquivalent(some(1), some(1)), true)
 *
 * @category equivalence
 * @since 1.0.0
 */
export const getEquivalence = <A>(E: Equivalence<A>): Equivalence<Option<A>> =>
  equivalence.make((x, y) =>
    x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E(x.value, y.value))
  )

// -------------------------------------------------------------------------------------
// sorting
// -------------------------------------------------------------------------------------

/**
 * The `Order` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Order` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 * @example
 * import { none, some, getOrder } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const O = getOrder(N.Order)
 * assert.deepStrictEqual(O.compare(none(), none()), 0)
 * assert.deepStrictEqual(O.compare(none(), some(1)), -1)
 * assert.deepStrictEqual(O.compare(some(1), none()), 1)
 * assert.deepStrictEqual(O.compare(some(1), some(2)), -1)
 * assert.deepStrictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category sorting
 * @since 1.0.0
 */
export const getOrder = <A>(O: Order<A>): Order<Option<A>> =>
  order.make((self, that) =>
    isSome(self) ? (isSome(that) ? O.compare(self.value, that.value) : 1) : -1
  )

// -------------------------------------------------------------------------------------
// lifting
// -------------------------------------------------------------------------------------

/**
 * Lifts a binary function into `Option`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => {
  (self: Option<A>, that: Option<B>): Option<C>
  (that: Option<B>): (self: Option<A>) => Option<C>
} = semiApplicative.lift2(SemiApplicative)

/**
 * Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
 * if the predicate returns `false`.
 *
 * @param predicate - A `Predicate` function that takes in a value of type `A` and returns a boolean.
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

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Returns a function that checks if an `Option` contains a given value using a provided `Equivalence` instance.
 *
 * @param equivalent - An `Equivalence` instance to compare values of the `Option`.
 * @param self - The `Option` to apply the comparison to.
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
export const contains = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (a: A): (self: Option<A>) => boolean
  (self: Option<A>, a: A): boolean
} => dual(2, (self: Option<A>, a: A): boolean => isNone(self) ? false : isEquivalent(self.value, a))

/**
 * Check if a value in an `Option` type meets a certain predicate.
 *
 * @param self - The `Option` to check.
 * @param predicate - The condition to check.
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
export const exists: {
  <A>(predicate: Predicate<A>): (self: Option<A>) => boolean
  <A>(self: Option<A>, predicate: Predicate<A>): boolean
} = dual(
  2,
  <A>(self: Option<A>, predicate: Predicate<A>): boolean =>
    isNone(self) ? false : predicate(self.value)
)

// -------------------------------------------------------------------------------------
// algebraic operations
// -------------------------------------------------------------------------------------

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sum: {
  (self: Option<number>, that: Option<number>): Option<number>
  (that: Option<number>): (self: Option<number>) => Option<number>
} = lift2(N.sum)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiply: {
  (self: Option<number>, that: Option<number>): Option<number>
  (that: Option<number>): (self: Option<number>) => Option<number>
} = lift2(N.multiply)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const subtract: {
  (self: Option<number>, that: Option<number>): Option<number>
  (that: Option<number>): (self: Option<number>) => Option<number>
} = lift2(N.subtract)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const divide: {
  (self: Option<number>, that: Option<number>): Option<number>
  (that: Option<number>): (self: Option<number>) => Option<number>
} = lift2(N.divide)

/**
 * Sum all numbers in an iterable of `Option<number>` ignoring the `None` values.
 *
 * @param self - The iterable of `Option<number>` to be summed.
 *
 * @example
 * import { sumCompact, some, none } from '@fp-ts/core/Option'
 *
 * const iterable = [some(2), none(), some(3), none()]
 * assert.deepStrictEqual(sumCompact(iterable), 5)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const sumCompact = (self: Iterable<Option<number>>): number => {
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
 * import { multiplyCompact, some, none } from '@fp-ts/core/Option'
 *
 * const iterable = [some(2), none(), some(3), none()]
 * assert.deepStrictEqual(multiplyCompact(iterable), 6)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiplyCompact = (self: Iterable<Option<number>>): number => {
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

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: {
  <N extends string>(name: N): <A>(self: Option<A>) => Option<{ [K in N]: A }>
  <A, N extends string>(self: Option<A>, name: N): Option<{ [K in N]: A }>
} = invariant.bindTo(Invariant)

const let_: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Option<A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
export const bind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Option<B>
  ): (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Option<A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Option<B>
  ): Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = chainable.bind(Chainable)

/**
 * @category do notation
 * @since 1.0.0
 */
export const Do: Option<{}> = of_.Do(Of)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    that: Option<B>
  ): (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Option<A>,
    name: Exclude<N, keyof A>,
    that: Option<B>
  ): Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = semiProduct.andThenBind(SemiProduct)
