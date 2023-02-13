/**
 * @since 1.0.0
 */

import { dual } from "@fp-ts/core/Function"
import { proto } from "@fp-ts/core/internal/effect"
import * as option from "@fp-ts/core/internal/Option"
import type { Option } from "@fp-ts/core/Option"
import type { Failure, Result, Success } from "@fp-ts/core/Result"

/** @internal */
export const isFailure = <E, A>(self: Result<E, A>): self is Failure<E> => self._tag === "Failure"

/** @internal */
export const isSuccess = <E, A>(self: Result<E, A>): self is Success<A> => self._tag === "Success"

/** @internal */
export const failure = <E>(e: E): Result<E, never> =>
  Object.setPrototypeOf({ _tag: "Failure", failure: e }, proto)

/** @internal */
export const success = <A>(a: A): Result<never, A> =>
  Object.setPrototypeOf({ _tag: "Success", success: a }, proto)

/** @internal */
export const getFailure = <E, A>(
  self: Result<E, A>
): Option<E> => (isSuccess(self) ? option.none() : option.some(self.failure))

/** @internal */
export const getSuccess = <E, A>(
  self: Result<E, A>
): Option<A> => (isFailure(self) ? option.none() : option.some(self.success))

/** @internal */
export const fromOption: {
  <E>(onNone: () => E): <A>(self: Option<A>) => Result<E, A>
  <A, E>(self: Option<A>, onNone: () => E): Result<E, A>
} = dual(
  2,
  <A, E>(self: Option<A>, onNone: () => E): Result<E, A> =>
    option.isNone(self) ? failure(onNone()) : success(self.value)
)
