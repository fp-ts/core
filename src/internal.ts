/**
 * @since 3.0.0
 */
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { None, Option, Some } from '@fp-ts/core/Option'
import type { Failure, Result, Success } from '@fp-ts/core/Result'

// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------

/** @internal */
export const isNone = <A>(fa: Option<A>): fa is None => fa._tag === 'None'

/** @internal */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === 'Some'

/** @internal */
export const none: Option<never> = { _tag: 'None' }

/** @internal */
export const some = <A>(a: A): Option<A> => ({ _tag: 'Some', value: a })

/** @internal */
export const fromNullableToOption = <A>(a: A): Option<NonNullable<A>> => (a == null ? none : some(a as NonNullable<A>))

// -------------------------------------------------------------------------------------
// Result
// -------------------------------------------------------------------------------------

/** @internal */
export const isFailure = <E, A>(ma: Result<E, A>): ma is Failure<E> => ma._tag === 'Failure'

/** @internal */
export const isSuccess = <E, A>(ma: Result<E, A>): ma is Success<A> => ma._tag === 'Success'

/** @internal */
export const fail = <E>(e: E): Result<E, never> => ({ _tag: 'Failure', failure: e })

/** @internal */
export const succeed = <A>(a: A): Result<never, A> => ({ _tag: 'Success', success: a })

/** @internal */
export const getFailure = <E, A>(self: Result<E, A>): Option<E> => (isSuccess(self) ? none : some(self.failure))

/** @internal */
export const getSuccess = <E, A>(self: Result<E, A>): Option<A> => (isFailure(self) ? none : some(self.success))

/** @internal */
export const fromNullableToResult =
  <E>(onNullable: E) =>
  <A>(a: A): Result<E, NonNullable<A>> =>
    a == null ? fail(onNullable) : succeed(a as NonNullable<A>)

/** @internal */
export const fromOptionToResult =
  <E>(onNone: E) =>
  <A>(fa: Option<A>): Result<E, A> =>
    isNone(fa) ? fail(onNone) : succeed(fa.value)

// -------------------------------------------------------------------------------------
// ReadonlyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const empty: readonly [] = []

/** @internal */
export const Arrayfrom = <A>(collection: Iterable<A>): ReadonlyArray<A> =>
  Array.isArray(collection) ? collection : Array.from(collection)

// -------------------------------------------------------------------------------------
// NonEmptyReadonlyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const isNonEmpty = <A>(as: ReadonlyArray<A>): as is NonEmptyReadonlyArray<A> => as.length > 0

/** @internal */
export const head = <A>(as: NonEmptyReadonlyArray<A>): A => as[0]

/** @internal */
export const tail = <A>(as: NonEmptyReadonlyArray<A>): ReadonlyArray<A> => as.slice(1)

// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------

/** @internal */
export const Do: Readonly<{}> = {}

/** @internal */
export const has = Object.prototype.hasOwnProperty

// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------

/**
 * @internal
 * @since 3.0.0
 */
export type NonEmptyArray<A> = [A, ...Array<A>]

/** @internal */
export const toNonEmptyArray = <A>(a: A): NonEmptyArray<A> => [a]

/** @internal */
export const fromNonEmptyReadonlyArray = <A>(as: NonEmptyReadonlyArray<A>): NonEmptyArray<A> => [head(as), ...tail(as)]
