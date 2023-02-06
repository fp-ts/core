/**
 * @since 1.0.0
 */

import type { Either, Left, Right } from "@fp-ts/core/Either"
import * as E from "@fp-ts/core/Either"
import type { LazyArg } from "@fp-ts/core/Function"
import { constNull, constUndefined, dual } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { proto, structural } from "@fp-ts/core/internal/effect"
import * as N from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import type { Option } from "@fp-ts/core/Option"
import type { Predicate, Refinement } from "@fp-ts/core/Predicate"
import type { NonEmptyReadonlyArray } from "@fp-ts/core/ReadonlyArray"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as bicovariant from "@fp-ts/core/typeclass/Bicovariant"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type { Equivalence } from "@fp-ts/core/typeclass/Equivalence"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
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
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"

/**
 * @category model
 * @since 1.0.0
 */
export interface Both<E, A> {
  readonly _tag: "Both"
  readonly left: E
  readonly right: A
}

/**
 * @category model
 * @since 1.0.0
 */
export type These<E, A> = Either<E, A> | Both<E, A>

/**
 * @category model
 * @since 1.0.0
 */
export type Validated<E, A> = These<NonEmptyReadonlyArray<E>, A>

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface TheseTypeLambda extends TypeLambda {
  readonly type: These<this["Out1"], this["Target"]>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ValidatedTypeLambda extends TypeLambda {
  readonly type: Validated<this["Out1"], this["Target"]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const left: <E>(left: E) => These<E, never> = E.left

/**
 * @category constructors
 * @since 1.0.0
 */
export const right: <A>(right: A) => These<never, A> = E.right

/**
 * Alias of {@link right}.
 *
 * @category constructors
 * @since 1.0.0
 */
export const of: <A>(right: A) => These<never, A> = right

/**
 * @category constructors
 * @since 1.0.0
 */
export const both = <E, A>(left: E, right: A): These<E, A> =>
  Object.setPrototypeOf({ _tag: "Both", left, right }, proto)

/**
 * @category constructors
 * @since 1.0.0
 */
export const leftOrBoth: {
  <E>(onSome: LazyArg<E>): <A>(self: Option<A>) => These<E, A>
  <A, E>(self: Option<A>, onSome: LazyArg<E>): These<E, A>
} = dual(
  2,
  <A, E>(self: Option<A>, onSome: LazyArg<E>): These<E, A> =>
    O.isNone(self) ? left(onSome()) : both(onSome(), self.value)
)

/**
 * @category constructors
 * @since 1.0.0
 */
export const rightOrBoth: {
  <A>(onNone: LazyArg<A>): <E>(self: Option<E>) => These<E, A>
  <E, A>(self: Option<E>, onNone: LazyArg<A>): These<E, A>
} = dual(
  2,
  <E, A>(self: Option<E>, onNone: LazyArg<A>): These<E, A> =>
    O.isNone(self) ? right(onNone()) : both(self.value, onNone())
)

/**
 * @category constructors
 * @since 1.0.0
 */
export const fail = <E>(e: E): Validated<E, never> => left([e])

/**
 * @category constructors
 * @since 1.0.0
 */
export const warn = <E, A>(e: E, a: A): Validated<E, A> => both([e], a)

// -------------------------------------------------------------------------------------
// equivalence
// -------------------------------------------------------------------------------------

/**
 * @category equivalence
 * @since 1.0.0
 */
export const getEquivalence = <E, A>(
  EE: Equivalence<E>,
  EA: Equivalence<A>
): Equivalence<These<E, A>> =>
  equivalence.make((x, y) =>
    isLeft(x)
      ? isLeft(y) && EE(x.left, y.left)
      : isRight(x)
      ? isRight(y) && EA(x.right, y.right)
      : isBoth(y) && EE(x.left, y.left) && EA(x.right, y.right)
  )

/**
 * @category pattern matching
 * @since 1.0.0
 */
export const match: {
  <E, B, A, C = B, D = B>(
    onLeft: (e: E) => B,
    onRight: (a: A) => C,
    onBoth: (e: E, a: A) => D
  ): (self: These<E, A>) => B | C | D
  <E, B, A, C = B, D = B>(
    self: These<E, A>,
    onLeft: (e: E) => B,
    onRight: (a: A) => C,
    onBoth: (e: E, a: A) => D
  ): B | C | D
} = dual(4, <E, B, A, C = B, D = B>(
  self: These<E, A>,
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
): B | C | D => {
  switch (self._tag) {
    case "Left":
      return onLeft(self.left)
    case "Right":
      return onRight(self.right)
    case "Both":
      return onBoth(self.left, self.right)
  }
})

/**
 * @since 1.0.0
 */
export const reverse: <E, A>(self: These<E, A>) => These<A, E> = match(
  right,
  left,
  (e, a) => both(a, e)
)

/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @category guards
 * @since 1.0.0
 */
export const isLeft = <E, A>(self: These<E, A>): self is Left<E> => self._tag === "Left"

/**
 * @category guards
 * @since 1.0.0
 */
export const isLeftOrBoth = <E, A>(self: These<E, A>): self is Left<E> | Both<E, A> =>
  self._tag !== "Right"

/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @category guards
 * @since 1.0.0
 */
export const isRight = <E, A>(self: These<E, A>): self is Right<A> => self._tag === "Right"

/**
 * @category guards
 * @since 1.0.0
 */
export const isRightOrBoth = <E, A>(self: These<E, A>): self is Right<A> | Both<E, A> =>
  self._tag !== "Left"

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @category guards
 * @since 1.0.0
 */
export const isBoth = <E, A>(self: These<E, A>): self is Both<E, A> => self._tag === "Both"

/**
 * Returns `true` if the specified value is an instance of `These`, `false`
 * otherwise.
 *
 * @category guards
 * @since 1.0.0
 */
export const isThese = (u: unknown): u is These<unknown, unknown> =>
  typeof u === "object" && u != null && structural in u && "_tag" in u &&
  (u["_tag"] === "Left" || u["_tag"] === "Right" || u["_tag"] === "Both")

/**
 * Lifts a function that may throw to one returning a `These`.
 *
 * @category interop
 * @since 1.0.0
 */
export const liftThrowable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
): ((...a: A) => These<E, B>) =>
  (...a) => {
    try {
      return right(f(...a))
    } catch (e) {
      return left(onThrow(e))
    }
  }

/**
 * @category interop
 * @since 1.0.0
 */
export const getOrThrow = <E, A>(self: These<E, A>): A => {
  if (isRightOrBoth(self)) {
    return self.right
  }
  throw new Error("getOrThrow called on a Left")
}

/**
 * @category interop
 * @since 1.0.0
 */
export const getRightOnlyOrThrow = <E, A>(self: These<E, A>): A => {
  if (isRight(self)) {
    return self.right
  }
  throw new Error("getRightOnlyOrThrow called on Left or Both")
}

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromNullable: {
  <E>(onNullable: LazyArg<E>): <A>(a: A) => These<E, NonNullable<A>>
  <A, E>(a: A, onNullable: LazyArg<E>): These<E, NonNullable<A>>
} = dual(
  2,
  <A, E>(a: A, onNullable: LazyArg<E>): These<E, NonNullable<A>> =>
    a == null ? left(onNullable()) : right(a as NonNullable<A>)
)

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromEither = <E, A>(self: Either<E, A>): Validated<E, A> =>
  E.isLeft(self) ? left([self.left]) : self

/**
 * @category conversions
 * @since 1.0.0
 */
export const toEither: {
  <E, A>(onBoth: (e: E, a: A) => Either<E, A>): (self: These<E, A>) => Either<E, A>
  <E, A>(self: These<E, A>, onBoth: (e: E, a: A) => Either<E, A>): Either<E, A>
} = dual(
  2,
  <E, A>(self: These<E, A>, onBoth: (e: E, a: A) => Either<E, A>): Either<E, A> =>
    isBoth(self) ? onBoth(self.left, self.right) : self
)

/**
 * @category conversions
 * @since 1.0.0
 */
export const absolve: <E, A>(self: These<E, A>) => Either<E, A> = toEither((
  _,
  a
) => E.right(a))

/**
 * @category conversions
 * @since 1.0.0
 */
export const condemn: <E, A>(self: These<E, A>) => Either<E, A> = toEither((
  e,
  _
) => E.left(e))

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftNullable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A): These<E, NonNullable<B>> => fromNullable(() => onNullable(...a))(f(...a))

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapNullable: {
  <A, B, E2>(
    f: (a: A) => B | null | undefined,
    onNullable: (a: A) => E2
  ): <E1>(self: Validated<E1, A>) => Validated<E1 | E2, NonNullable<B>>
  <E1, A, B, E2>(
    self: Validated<E1, A>,
    f: (a: A) => B | null | undefined,
    onNullable: (a: A) => E2
  ): Validated<E1 | E2, NonNullable<B>>
} = dual(3, <E1, A, B, E2>(
  self: Validated<E1, A>,
  f: (a: A) => B | null | undefined,
  onNullable: (a: A) => E2
): Validated<E1 | E2, NonNullable<B>> => flatMap(self, liftNullable(f, (a) => [onNullable(a)])))

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(
    refinement: Refinement<A, B>,
    onFalse: (c: C) => E
  ): (c: C) => These<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => These<E, B>
} = <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E) =>
  (b: B) => predicate(b) ? right(b) : left(onFalse(b))

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable: {
  <E>(onEmpty: LazyArg<E>): <A>(collection: Iterable<A>) => These<E, A>
  <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): These<E, A>
} = dual(2, <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): These<E, A> => {
  for (const a of collection) {
    return right(a)
  }
  return left(onEmpty())
})

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromOption: {
  <E>(onNone: LazyArg<E>): <A>(self: Option<A>) => These<E, A>
  <A, E>(self: Option<A>, onNone: LazyArg<E>): These<E, A>
} = dual(
  2,
  <A, E>(self: Option<A>, onNone: LazyArg<E>): These<E, A> =>
    O.isNone(self) ? left(onNone()) : right(self.value)
)

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromTuple = <E, A>(self: readonly [E, A]): These<E, A> => both(self[0], self[1])

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftOption = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A): These<E, B> => fromOption(() => onNone(...a))(f(...a))

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftEither = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A): Validated<E, B> => fromEither(f(...a))

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftThese = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => These<E, B>
) => (...a: A): Validated<E, B> => toValidated(f(...a))

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapOption: {
  <A, B, E2>(
    f: (a: A) => Option<B>,
    onNone: (a: A) => E2
  ): <E1>(self: Validated<E1, A>) => Validated<E1 | E2, B>
  <E1, A, B, E2>(
    self: Validated<E1, A>,
    f: (a: A) => Option<B>,
    onNone: (a: A) => E2
  ): Validated<E1 | E2, B>
} = dual(3, <E1, A, B, E2>(
  self: Validated<E1, A>,
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
): Validated<E1 | E2, B> => flatMap(self, liftOption(f, (a) => [onNone(a)])))

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapEither: {
  <A, E2, B>(f: (a: A) => Either<E2, B>): <E1>(self: Validated<E1, A>) => Validated<E1 | E2, B>
  <E1, A, E2, B>(self: Validated<E1, A>, f: (a: A) => Either<E2, B>): Validated<E1 | E2, B>
} = dual(
  2,
  <E1, A, E2, B>(self: Validated<E1, A>, f: (a: A) => Either<E2, B>): Validated<E1 | E2, B> =>
    flatMap(self, liftEither(f))
)

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapThese: {
  <A, E2, B>(f: (a: A) => These<E2, B>): <E1>(self: Validated<E1, A>) => Validated<E1 | E2, B>
  <E1, A, E2, B>(self: Validated<E1, A>, f: (a: A) => These<E2, B>): Validated<E1 | E2, B>
} = dual(
  2,
  <E1, A, E2, B>(self: Validated<E1, A>, f: (a: A) => These<E2, B>): Validated<E1 | E2, B> =>
    flatMap(self, liftThese(f))
)

/**
 * Converts a `These` to an `Option` discarding the error (`Both` included).
 *
 * @category getters
 * @since 1.0.0
 */
export const getRight = <E, A>(
  self: These<E, A>
): Option<A> => isLeft(self) ? O.none() : O.some(self.right)

/**
 * Returns the value if and only if the value is a `Right` (i.e. `Both` is excluded).
 *
 * @category getters
 * @since 1.0.0
 */
export const getRightOnly = <E, A>(
  self: These<E, A>
): Option<A> => isRight(self) ? O.some(self.right) : O.none()

/**
 * Converts a `These` to an `Option` discarding the value (`Both` included).
 *
 * @category getters
 * @since 1.0.0
 */
export const getLeft = <E, A>(
  self: These<E, A>
): Option<E> => isRight(self) ? O.none() : O.some(self.left)

/**
 * Returns the error if and only if the value is a `Left` (i.e. `Both` is excluded).
 *
 * @category getters
 * @since 1.0.0
 */
export const getLeftOnly = <E, A>(
  self: These<E, A>
): Option<E> => isLeft(self) ? O.some(self.left) : O.none()

/**
 * @category getters
 * @since 1.0.0
 */
export const getBoth = <E, A>(
  self: These<E, A>
): Option<readonly [E, A]> => isBoth(self) ? O.some([self.left, self.right]) : O.none()

/**
 * @category getters
 * @since 1.0.0
 */
export const getBothOrElse: {
  <E, A>(e: LazyArg<E>, a: LazyArg<A>): (self: These<E, A>) => [E, A]
  <E, A>(self: These<E, A>, e: LazyArg<E>, a: LazyArg<A>): [E, A]
} = dual(3, <E, A>(self: These<E, A>, e: LazyArg<E>, a: LazyArg<A>): [E, A] =>
  isLeft(self) ?
    [self.left, a()] :
    isRight(self) ?
    [e(), self.right] :
    [self.left, self.right])

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrElse: {
  <B>(onLeft: LazyArg<B>): <E, A>(self: These<E, A>) => A | B
  <E, A, B>(self: These<E, A>, onLeft: LazyArg<B>): A | B
} = dual(
  2,
  <E, A, B>(self: These<E, A>, onLeft: LazyArg<B>): A | B => isLeft(self) ? onLeft() : self.right
)

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrNull: <E, A>(self: These<E, A>) => A | null = getOrElse(constNull)

/**
 * @category getters
 * @since 1.0.0
 */
export const getOrUndefined: <E, A>(self: These<E, A>) => A | undefined = getOrElse(constUndefined)

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectRight: {
  <A>(onRight: (a: A) => void): <E>(self: These<E, A>) => These<E, A>
  <E, A>(self: These<E, A>, onRight: (a: A) => void): These<E, A>
} = dual(2, <E, A>(self: These<E, A>, onRight: (a: A) => void): These<E, A> => {
  if (isRight(self)) {
    onRight(self.right)
  }
  return self
})

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectRightOrBoth: {
  <A>(onRightOrBoth: (a: A) => void): <E>(self: These<E, A>) => These<E, A>
  <E, A>(self: These<E, A>, onRightOrBoth: (a: A) => void): These<E, A>
} = dual(2, <E, A>(self: These<E, A>, onRightOrBoth: (a: A) => void): These<E, A> => {
  if (isRightOrBoth(self)) {
    onRightOrBoth(self.right)
  }
  return self
})

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectLeft: {
  <E>(onLeft: (e: E) => void): <A>(self: These<E, A>) => These<E, A>
  <E, A>(self: These<E, A>, onLeft: (e: E) => void): These<E, A>
} = dual(2, <E, A>(self: These<E, A>, onLeft: (e: E) => void): These<E, A> => {
  if (isLeft(self)) {
    onLeft(self.left)
  }
  return self
})

/**
 * @category debugging
 * @since 1.0.0
 */
export const inspectBoth: {
  <E, A>(onBoth: (e: E, a: A) => void): (self: These<E, A>) => These<E, A>
  <E, A>(self: These<E, A>, onBoth: (e: E, a: A) => void): These<E, A>
} = dual(2, <E, A>(self: These<E, A>, onBoth: (e: E, a: A) => void): These<E, A> => {
  if (isBoth(self)) {
    onBoth(self.left, self.right)
  }
  return self
})

/**
 * @category mapping
 * @since 1.0.0
 */
export const bimap: {
  <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B): (self: These<E1, A>) => These<E2, B>
  <E1, A, E2, B>(self: These<E1, A>, f: (e: E1) => E2, g: (a: A) => B): These<E2, B>
} = dual(
  3,
  <E1, A, E2, B>(self: These<E1, A>, f: (e: E1) => E2, g: (a: A) => B): These<E2, B> =>
    isLeft(self) ?
      left(f(self.left)) :
      isRight(self) ?
      right(g(self.right)) :
      both(f(self.left), g(self.right))
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Bicovariant: bicovariant.Bicovariant<TheseTypeLambda> = {
  bimap
}

/**
 * Maps the `Left` side of an `These` value to a new `These` value.
 *
 * @param self - The input `These` value to map.
 * @param f - A transformation function to apply to the `Left` value of the input `These`.
 *
 * @category error handling
 * @since 1.0.0
 */
export const mapLeft: {
  <E, G>(f: (e: E) => G): <A>(self: These<E, A>) => These<G, A>
  <E, A, G>(self: These<E, A>, f: (e: E) => G): These<G, A>
} = bicovariant.mapLeft(Bicovariant)

/**
 * @category conversions
 * @since 1.0.0
 */
export const toValidated: <E, A>(self: These<E, A>) => Validated<E, A> = mapLeft((e) => [e])

/**
 * Maps the `Right` side of an `These` value to a new `These` value.
 *
 * @param self - An `These` to map
 * @param f - The function to map over the value of the `These`
 *
 * @category mapping
 * @since 1.0.0
 */
export const map: {
  <E, A, B>(self: These<E, A>, f: (a: A) => B): These<E, B>
  <A, B>(f: (a: A) => B): <E>(self: These<E, A>) => These<E, B>
} = bicovariant.map(Bicovariant)

const imap = covariant.imap<TheseTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<TheseTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<TheseTypeLambda> = {
  imap
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const tupled: <E, A>(self: These<E, A>) => These<E, [A]> = invariant.tupled(
  Invariant
)

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: {
  <A, E, B>(a: A, self: These<E, (a: A) => B>): These<E, B>
  <E, A, B>(self: These<E, (a: A) => B>): (a: A) => These<E, B>
} = covariant.flap(Covariant)

/**
 * Maps the right value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: {
  <E, _, B>(self: These<E, _>, b: B): These<E, B>
  <B>(b: B): <E, _>(self: These<E, _>) => These<E, B>
} = covariant.as(Covariant)

/**
 * Returns the effect resulting from mapping the right of this effect to unit.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asUnit: <E, _>(self: These<E, _>) => These<E, void> = covariant.asUnit(Covariant)

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<TheseTypeLambda> = {
  of
}

/**
 * @since 1.0.0
 */
export const unit: These<never, void> = of_.unit(Of)

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<TheseTypeLambda> = {
  of,
  imap,
  map
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): <TE>(self: These<TE, A>) => Kind<F, R, O, E, These<TE, B>>
  <TE, A, R, O, E, B>(
    self: These<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, These<TE, B>>
} =>
  dual(2, <TE, A, R, O, E, B>(
    self: These<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, These<TE, B>> =>
    isLeft(self)
      ? F.of<These<TE, B>>(self)
      : isRight(self)
      ? F.map<R, O, E, B, These<TE, B>>(f(self.right), right)
      : F.map(f(self.right), (b) => both(self.left, b)))

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<TheseTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <TE, R, O, E, A>(
  self: These<TE, Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, These<TE, A>> = traversable.sequence(Traversable)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <TE, A, R, O, E, B>(
    self: These<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, These<TE, A>>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): <TE>(self: These<TE, A>) => Kind<F, R, O, E, These<TE, A>>
} = traversable.traverseTap(Traversable)

/**
 * Returns a function that checks if a `These` contains a given value using a provided `equivalence` function.
 *
 * @since 1.0.0
 */
export const contains = <A>(isEquivalent: (self: A, that: A) => boolean): {
  (a: A): <E>(self: These<E, A>) => boolean
  <E>(self: These<E, A>, a: A): boolean
} =>
  dual(
    2,
    <E>(self: These<E, A>, a: A): boolean => isLeft(self) ? false : isEquivalent(self.right, a)
  )

/**
 * @category predicates
 * @since 1.0.0
 */
export const exists: {
  <A>(predicate: Predicate<A>): <E>(self: These<E, A>) => boolean
  <E, A>(self: These<E, A>, predicate: Predicate<A>): boolean
} = dual(
  2,
  <E, A>(self: These<E, A>, predicate: Predicate<A>): boolean =>
    isLeft(self) ? false : predicate(self.right)
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<TheseTypeLambda> = {
  reduce: dual(
    3,
    <E, A, B>(self: These<E, A>, b: B, f: (b: B, a: A) => B): B =>
      isLeft(self) ? b : f(b, self.right)
  )
}

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElse: {
  <E1, E2, B>(that: (e1: E1) => These<E2, B>): <A>(self: These<E1, A>) => These<E1 | E2, A | B>
  <E1, A, E2, B>(self: These<E1, A>, that: (e1: E1) => These<E2, B>): These<E1 | E2, A | B>
} = dual(
  2,
  <E1, A, E2, B>(self: These<E1, A>, that: (e1: E1) => These<E2, B>): These<E1 | E2, A | B> =>
    isLeft(self) ? that(self.left) : self
)

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseEither: {
  <E1, E2, B>(
    that: (e1: E1) => These<E2, B>
  ): <A>(self: These<E1, A>) => These<E1 | E2, Either<A, B>>
  <E1, A, E2, B>(
    self: These<E1, A>,
    that: (e1: E1) => These<E2, B>
  ): These<E1 | E2, Either<A, B>>
} = dual(2, <E1, A, E2, B>(
  self: These<E1, A>,
  that: (e1: E1) => These<E2, B>
): These<E1 | E2, Either<A, B>> =>
  isLeft(self) ?
    map(that(self.left), E.right) :
    map(self, E.left))

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseFail: {
  <E2>(onLeft: LazyArg<E2>): <E1, A>(self: These<E1, A>) => These<E1 | E2, A>
  <E1, A, E2>(self: These<E1, A>, onLeft: LazyArg<E2>): These<E1 | E2, A>
} = dual(
  2,
  <E1, A, E2>(self: These<E1, A>, onLeft: LazyArg<E2>): These<E1 | E2, A> =>
    orElse(self, () => left(onLeft()))
)

/**
 * @category error handling
 * @since 1.0.0
 */
export const firstRightOrBothOf: {
  <E, A>(collection: Iterable<These<E, A>>): (self: These<E, A>) => These<E, A>
  <E, A>(self: These<E, A>, collection: Iterable<These<E, A>>): These<E, A>
} = dual(2, <E, A>(self: These<E, A>, collection: Iterable<These<E, A>>): These<E, A> => {
  let out = self
  if (isRightOrBoth(out)) {
    return out
  }
  for (out of collection) {
    if (isRightOrBoth(out)) {
      return out
    }
  }
  return out
})

const coproduct: {
  <E2, B>(that: These<E2, B>): <E1, A>(self: These<E1, A>) => These<E2 | E1, B | A>
  <E1, A, E2, B>(self: These<E1, A>, that: These<E2, B>): These<E1 | E2, A | B>
} = dual(
  2,
  <E1, A, E2, B>(self: These<E1, A>, that: These<E2, B>): These<E1 | E2, A | B> =>
    isRightOrBoth(self) ? self : that
)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct: semiCoproduct.SemiCoproduct<TheseTypeLambda> = {
  imap,
  coproduct,
  coproductMany: firstRightOrBothOf
}

/**
 * @category combining
 * @since 1.0.0
 */
export const getFirstRightOrBothSemigroup: <E, A>() => Semigroup<These<E, A>> = semiCoproduct
  .getSemigroup(SemiCoproduct)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative: semiAlternative.SemiAlternative<TheseTypeLambda> = {
  map,
  imap,
  coproduct,
  coproductMany: firstRightOrBothOf
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const compact: {
  <E>(onNone: LazyArg<E>): <A>(self: These<E, Option<A>>) => These<E, A>
  <E, A>(self: These<E, Option<A>>, onNone: LazyArg<E>): These<E, A>
} = dual(2, <E, A>(self: These<E, Option<A>>, onNone: LazyArg<E>): These<E, A> =>
  isLeft(self) ?
    self :
    O.isNone(self.right) ?
    left(onNone()) :
    isBoth(self) ?
    both(self.left, self.right.value) :
    right(self.right.value))

/**
 * @category filtering
 * @since 1.0.0
 */
export const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(
    self: These<E1, C>
  ) => These<E1 | E2, B>
  <B extends A, E2, A = B>(
    predicate: Predicate<A>,
    onFalse: LazyArg<E2>
  ): <E1>(self: These<E1, B>) => These<E1 | E2, B>
  <E1, C extends A, B extends A, E2, A = C>(
    self: These<E1, C>,
    refinement: Refinement<A, B>,
    onFalse: LazyArg<E2>
  ): These<E1 | E2, B>
  <E1, B extends A, E2, A = B>(
    self: These<E1, B>,
    predicate: Predicate<A>,
    onFalse: LazyArg<E2>
  ): These<E1 | E2, B>
} = dual(3, <E1, B extends A, E2, A = B>(
  self: These<E1, B>,
  predicate: Predicate<A>,
  onFalse: LazyArg<E2>
): These<E1 | E2, B> => isLeft(self) ? self : predicate(self.right) ? self : left(onFalse()))

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap: {
  <A, B, E2>(
    f: (a: A) => Option<B>,
    onNone: LazyArg<E2>
  ): <E1>(self: These<E1, A>) => These<E1 | E2, B>
  <E1, A, B, E2>(
    self: These<E1, A>,
    f: (a: A) => Option<B>,
    onNone: LazyArg<E2>
  ): These<E1 | E2, B>
} = dual(3, <E1, A, B, E2>(
  self: These<E1, A>,
  f: (a: A) => Option<B>,
  onNone: LazyArg<E2>
): These<E1 | E2, B> => {
  if (isLeft(self)) {
    return self
  }
  if (isRight(self)) {
    const ob = f(self.right)
    return O.isNone(ob) ? left(onNone()) : right(ob.value)
  }
  const ob = f(self.right)
  return O.isNone(ob) ? left(onNone()) : both(self.left, ob.value)
})

const product: {
  <E2, B>(that: Validated<E2, B>): <E1, A>(self: Validated<E1, A>) => Validated<E2 | E1, [A, B]>
  <E1, A, E2, B>(self: Validated<E1, A>, that: Validated<E2, B>): Validated<E1 | E2, [A, B]>
} = dual(
  2,
  <E1, A, E2, B>(self: Validated<E1, A>, that: Validated<E2, B>): Validated<E1 | E2, [A, B]> => {
    if (isLeft(self)) {
      return self
    }
    if (isRight(self)) {
      if (isLeft(that)) {
        return that
      }
      if (isRight(that)) {
        return right([self.right, that.right])
      }
      return both(that.left, [self.right, that.right])
    }
    if (isLeft(that)) {
      return left(RA.appendAllNonEmpty(that.left)(self.left))
    }
    if (isRight(that)) {
      return both(self.left, [self.right, that.right])
    }
    return both(RA.appendAllNonEmpty(that.left)(self.left), [self.right, that.right])
  }
)

const productAll = <E, A>(
  collection: Iterable<Validated<E, A>>
): Validated<E, Array<A>> => {
  const rights: Array<A> = []
  const lefts: Array<E> = []
  let isFatal = false
  for (const t of collection) {
    if (isLeft(t)) {
      lefts.push(...t.left)
      isFatal = true
      break
    } else if (isRight(t)) {
      rights.push(t.right)
    } else {
      lefts.push(...t.left)
      rights.push(t.right)
    }
  }
  if (RA.isNonEmpty(lefts)) {
    return isFatal ? left(lefts) : both(lefts, rights)
  }
  return right(rights)
}

const productMany: {
  <E, A>(
    collection: Iterable<Validated<E, A>>
  ): (self: Validated<E, A>) => Validated<E, [A, ...Array<A>]>
  <E, A>(
    self: Validated<E, A>,
    collection: Iterable<Validated<E, A>>
  ): Validated<E, [A, ...Array<A>]>
} = dual(
  2,
  <E, A>(
    self: Validated<E, A>,
    collection: Iterable<Validated<E, A>>
  ): Validated<E, [A, ...Array<A>]> =>
    map(product(self, productAll(collection)), ([a, as]) => [a, ...as])
)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<ValidatedTypeLambda> = {
  imap,
  product,
  productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<ValidatedTypeLambda> = {
  imap,
  map,
  product,
  productMany
}

/**
 * Lifts a binary function into `These`.
 *
 * @param f - The function to lift.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => {
  <E1, E2>(self: Validated<E1, A>, that: Validated<E2, B>): Validated<E1 | E2, C>
  <E2>(that: Validated<E2, B>): <E1>(self: Validated<E1, A>) => Validated<E2 | E1, C>
} = semiApplicative.lift2(SemiApplicative)

/**
 * @category combining
 * @since 1.0.0
 */
export const zipWith: {
  <E1, A, E2, B, C>(
    self: Validated<E1, A>,
    that: Validated<E2, B>,
    f: (a: A, b: B) => C
  ): Validated<E1 | E2, C>
  <E2, B, A, C>(
    that: Validated<E2, B>,
    f: (a: A, b: B) => C
  ): <E1>(self: Validated<E1, A>) => Validated<E2 | E1, C>
} = semiApplicative.zipWith(SemiApplicative)

/**
 * @since 1.0.0
 */
export const ap: {
  <E1, A, B, E2>(self: Validated<E1, (a: A) => B>, that: Validated<E2, A>): Validated<E1 | E2, B>
  <E2, A>(
    that: Validated<E2, A>
  ): <E1, B>(self: Validated<E1, (a: A) => B>) => Validated<E2 | E1, B>
} = semiApplicative.ap(SemiApplicative)

/**
 * @category combining
 * @since 1.0.0
 */
export const getFirstLeftSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Validated<E, A>> =
  semiApplicative.getSemigroup(SemiApplicative)

/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const appendElement: {
  <E1, A extends ReadonlyArray<any>, E2, B>(
    self: Validated<E1, A>,
    that: Validated<E2, B>
  ): Validated<E1 | E2, [...A, B]>
  <E2, B>(
    that: Validated<E2, B>
  ): <E1, A extends ReadonlyArray<any>>(self: Validated<E1, A>) => Validated<E2 | E1, [...A, B]>
} = semiProduct.appendElement(SemiProduct)

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<ValidatedTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll
}

/**
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Validated<any, any>>>(...tuple: T) => Validated<
  [T[number]] extends [Validated<infer E, any>] ? E : never,
  { [I in keyof T]: [T[I]] extends [Validated<any, infer A>] ? A : never }
> = product_.tuple(Product)

/**
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Validated<any, any>>>(
  r: R
) => Validated<
  [R[keyof R]] extends [Validated<infer E, any>] ? E : never,
  { [K in keyof R]: [R[K]] extends [Validated<any, infer A>] ? A : never }
> = product_
  .struct(Product)

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap: {
  <A, E2, B>(f: (a: A) => Validated<E2, B>): <E1>(self: Validated<E1, A>) => Validated<E1 | E2, B>
  <E1, A, E2, B>(self: Validated<E1, A>, f: (a: A) => Validated<E2, B>): Validated<E1 | E2, B>
} = dual(
  2,
  <E1, A, E2, B>(self: Validated<E1, A>, f: (a: A) => Validated<E2, B>): Validated<E1 | E2, B> => {
    if (isLeft(self)) {
      return self
    }
    if (isRight(self)) {
      return f(self.right)
    }
    const that = f(self.right)
    if (isLeft(that)) {
      return left(RA.appendAllNonEmpty(that.left)(self.left))
    }
    if (isRight(that)) {
      return both(self.left, that.right)
    }
    return both(RA.appendAllNonEmpty(that.left)(self.left), that.right)
  }
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<ValidatedTypeLambda> = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll
}

/**
 * @category combining
 * @since 1.0.0
 */
export const getFirstLeftMonoid: <A, E>(M: Monoid<A>) => Monoid<Validated<E, A>> = applicative
  .getMonoid(
    Applicative
  )

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<ValidatedTypeLambda> = {
  flatMap
}

/**
 * @since 1.0.0
 */
export const flatten: <E2, E1, A>(
  self: Validated<E2, Validated<E1, A>>
) => Validated<E2 | E1, A> = flatMap_.flatten(FlatMap)

/**
 * @since 1.0.0
 */
export const andThen: {
  <E1, _, E2, B>(self: Validated<E1, _>, that: Validated<E2, B>): Validated<E1 | E2, B>
  <E2, B>(that: Validated<E2, B>): <E1, _>(self: Validated<E1, _>) => Validated<E2 | E1, B>
} = flatMap_.andThen(FlatMap)

/**
 * @since 1.0.0
 */
export const composeKleisliArrow: {
  <A, E1, B, E2, C>(
    afb: (a: A) => Validated<E1, B>,
    bfc: (b: B) => Validated<E2, C>
  ): (a: A) => Validated<E1 | E2, C>
  <B, E2, C>(
    bfc: (b: B) => Validated<E2, C>
  ): <A, E1>(afb: (a: A) => Validated<E1, B>) => (a: A) => Validated<E2 | E1, C>
} = flatMap_.composeKleisliArrow(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<ValidatedTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThenDiscard: {
  <E1, A, E2, _>(self: Validated<E1, A>, that: Validated<E2, _>): Validated<E1 | E2, A>
  <E2, _>(that: Validated<E2, _>): <E1, A>(self: Validated<E1, A>) => Validated<E2 | E1, A>
} = chainable.andThenDiscard(Chainable)

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tap: {
  <E1, A, E2, _>(self: Validated<E1, A>, f: (a: A) => Validated<E2, _>): Validated<E1 | E2, A>
  <A, E2, _>(f: (a: A) => Validated<E2, _>): <E1>(self: Validated<E1, A>) => Validated<E2 | E1, A>
} = chainable.tap(Chainable)

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<ValidatedTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

// -------------------------------------------------------------------------------------
// algebraic operations
// -------------------------------------------------------------------------------------

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sum: {
  <E1, E2>(self: Validated<E1, number>, that: Validated<E2, number>): Validated<E1 | E2, number>
  <E2>(that: Validated<E2, number>): <E1>(self: Validated<E1, number>) => Validated<E2 | E1, number>
} = lift2(N.sum)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiply: {
  <E1, E2>(self: Validated<E1, number>, that: Validated<E2, number>): Validated<E1 | E2, number>
  <E2>(that: Validated<E2, number>): <E1>(self: Validated<E1, number>) => Validated<E2 | E1, number>
} = lift2(N.multiply)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const subtract: {
  <E1, E2>(self: Validated<E1, number>, that: Validated<E2, number>): Validated<E1 | E2, number>
  <E2>(that: Validated<E2, number>): <E1>(self: Validated<E1, number>) => Validated<E2 | E1, number>
} = lift2(N.subtract)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const divide: {
  <E1, E2>(self: Validated<E1, number>, that: Validated<E2, number>): Validated<E1 | E2, number>
  <E2>(that: Validated<E2, number>): <E1>(self: Validated<E1, number>) => Validated<E2 | E1, number>
} = lift2(N.divide)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: {
  <N extends string>(name: N): <E, A>(self: These<E, A>) => These<E, { [K in N]: A }>
  <E, A, N extends string>(self: These<E, A>, name: N): These<E, { [K in N]: A }>
} = invariant.bindTo(Invariant)

const let_: {
  <N extends string, A extends object, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): <E>(self: These<E, A>) => These<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E, A extends object, N extends string, B>(
    self: These<E, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): These<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
export const Do: These<never, {}> = of_.Do(Of)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: {
  <N extends string, A extends object, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Validated<E2, B>
  ): <E1>(
    self: Validated<E1, A>
  ) => Validated<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Validated<E1, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Validated<E2, B>
  ): Validated<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = chainable.bind(Chainable)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindEither: {
  <N extends string, A extends object, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Either<E2, B>
  ): <E1>(
    self: Validated<E1, A>
  ) => Validated<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Validated<E1, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Either<E2, B>
  ): Validated<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
} = dual(3, <E1, A extends object, N extends string, E2, B>(
  self: Validated<E1, A>,
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
): Validated<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =>
  bind(self, name, (a) => fromEither(f(a))))

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindThese: {
  <N extends string, A extends object, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => These<E2, B>
  ): <E1>(
    self: Validated<E1, A>
  ) => Validated<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Validated<E1, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => These<E2, B>
  ): Validated<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
} = dual(3, <E1, A extends object, N extends string, E2, B>(
  self: Validated<E1, A>,
  name: Exclude<N, keyof A>,
  f: (a: A) => These<E2, B>
): Validated<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =>
  bind(self, name, (a) => toValidated(f(a))))

/**
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: {
  <N extends string, A extends object, E2, B>(
    name: Exclude<N, keyof A>,
    that: Validated<E2, B>
  ): <E1>(
    self: Validated<E1, A>
  ) => Validated<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Validated<E1, A>,
    name: Exclude<N, keyof A>,
    that: Validated<E2, B>
  ): Validated<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
} = semiProduct.andThenBind(SemiProduct)
