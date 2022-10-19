/**
 * @since 1.0.0
 */

import type { Either, Left, Right } from "@fp-ts/core/data/Either"
import type { Option } from "@fp-ts/core/data/Option"
import * as option from "@fp-ts/core/internal/Option"

/**
 * @since 1.0.0
 */
export const isLeft = <E, A>(self: Either<E, A>): self is Left<E> => self._tag === "Left"

/**
 * @since 1.0.0
 */
export const isRight = <E, A>(self: Either<E, A>): self is Right<A> => self._tag === "Right"

/**
 * @since 1.0.0
 */
export const getLeft = <E, A>(
  self: Either<E, A>
): Option<E> => (isRight(self) ? option.none : option.some(self.left))

/**
 * @since 1.0.0
 */
export const getRight = <E, A>(
  self: Either<E, A>
): Option<A> => (isLeft(self) ? option.none : option.some(self.right))
