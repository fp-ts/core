/**
 * @since 1.0.0
 */

import type { Either, Left, Right } from "@fp-ts/core/Either"
import { proto } from "@fp-ts/core/internal/effect"
import * as option from "@fp-ts/core/internal/Option"
import type { Option } from "@fp-ts/core/Option"

/** @internal */
export const isLeft = <E, A>(ma: Either<E, A>): ma is Left<E> => ma._tag === "Left"

/** @internal */
export const isRight = <E, A>(ma: Either<E, A>): ma is Right<A> => ma._tag === "Right"

/** @internal */
export const left = <E>(e: E): Either<E, never> =>
  Object.setPrototypeOf({ _tag: "Left", left: e }, proto)

/** @internal */
export const right = <A>(a: A): Either<never, A> =>
  Object.setPrototypeOf({ _tag: "Right", right: a }, proto)

/** @internal */
export const getLeft = <E, A>(
  self: Either<E, A>
): Option<E> => (isRight(self) ? option.none : option.some(self.left))

/** @internal */
export const getRight = <E, A>(
  self: Either<E, A>
): Option<A> => (isLeft(self) ? option.none : option.some(self.right))

/** @internal */
export const fromOption = <E>(onNone: () => E) =>
  <A>(fa: Option<A>): Either<E, A> => option.isNone(fa) ? left(onNone()) : right(fa.value)
