/**
 * ```ts
 * type Either<E, A> = Left<E> | Right<A>
 * ```
 *
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * @since 1.0.0
 */
import type { LazyArg } from "@fp-ts/core/Function"
import { constNull, constUndefined, identity, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import * as option from "@fp-ts/core/internal/Option"
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
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"

/**
 * @category models
 * @since 1.0.0
 */
export type Left<E> = {
  readonly _tag: "@fp-ts/core/Either/Left"
  readonly left: E
}

/**
 * @category models
 * @since 1.0.0
 */
export type Right<A> = {
  readonly _tag: "@fp-ts/core/Either/Right"
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

/**
 * Returns `true` if the specified value is an instance of `Either`, `false`
 * otherwise.
 *
 * @category guards
 * @since 1.0.0
 */
export const isEither: (u: unknown) => u is Either<unknown, unknown> = either.isEither

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

/**
 * Returns an effect whose Right is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 1.0.0
 */
export const map = <A, B>(f: (a: A) => B) =>
  <E>(self: Either<E, A>): Either<E, B> => isRight(self) ? right(f(self.right)) : self

/**
 * @category mapping
 * @since 1.0.0
 */
export const imap: <A, B>(
  to: (a: A) => B,
  from: (b: B) => A
) => <E>(self: Either<E, A>) => Either<E, B> = covariant.imap<EitherTypeLambda>(map)

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
export const tupled: <E, A>(self: Either<E, A>) => Either<E, readonly [A]> = invariant.tupled(
  Invariant
)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(self: Either<E, A>) => Either<E, { readonly [K in N]: A }> = invariant.bindTo(Invariant)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<EitherTypeLambda> = {
  ...Invariant,
  map
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: <A>(a: A) => <E, B>(self: Either<E, (a: A) => B>) => Either<E, B> = covariant
  .flap(
    Covariant
  )

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
) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = covariant.let(
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
  ...Of,
  ...Covariant
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
  ...FlatMap,
  ...Covariant
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
  ...Pointed,
  ...FlatMap
}

/**
 * @since 1.0.0
 */
export const product = <E2, B>(
  that: Either<E2, B>
) =>
  <E1, A>(self: Either<E1, A>): Either<E1 | E2, readonly [A, B]> =>
    isRight(self) ? (isRight(that) ? right([self.right, that.right]) : that) : self

/**
 * @category error handling
 * @since 1.0.0
 */
export const productMany = <E, A>(
  collection: Iterable<Either<E, A>>
) =>
  (self: Either<E, A>): Either<E, readonly [A, ...Array<A>]> => {
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

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<EitherTypeLambda> = {
  ...Invariant,
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
) => Either<E1 | E2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = semiProduct
  .andThenBind(SemiProduct)

/**
 * @since 1.0.0
 */
export const productFlatten: <E2, B>(
  that: Either<E2, B>
) => <E1, A extends ReadonlyArray<any>>(
  self: Either<E1, A>
) => Either<E1 | E2, readonly [...A, B]> = semiProduct
  .productFlatten(SemiProduct)

/**
 * @since 1.0.0
 */
export const productAll = <E, A>(
  collection: Iterable<Either<E, A>>
): Either<E, ReadonlyArray<A>> => {
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
  ...Of,
  ...SemiProduct,
  productAll
}

/**
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Either<any, any>>>(
  ...tuple: T
) => Either<
  [T[number]] extends [Either<infer E, any>] ? E : never,
  Readonly<{ [I in keyof T]: [T[I]] extends [Either<any, infer A>] ? A : never }>
> = product_
  .tuple(Product)

/**
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Either<any, any>>>(
  r: R
) => Either<
  [R[keyof R]] extends [Either<infer E, any>] ? E : never,
  { readonly [K in keyof R]: [R[K]] extends [Either<any, infer A>] ? A : never }
> = product_
  .struct(Product)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<EitherTypeLambda> = {
  ...SemiProduct,
  ...Covariant
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
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: Either<E1, A>, fb: Either<E2, B>) => Either<E1 | E2, C> = semiApplicative
  .lift2(SemiApplicative)

/**
 * @category lifting
 * @since 1.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(
  fa: Either<E1, A>,
  fb: Either<E2, B>,
  fc: Either<E3, C>
) => Either<E1 | E2 | E3, D> = semiApplicative.lift3(
  SemiApplicative
)

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
  ...SemiApplicative,
  ...Product
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
export const firstSuccessOf = <E, A>(collection: Iterable<Either<E, A>>) =>
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

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct: semiCoproduct.SemiCoproduct<EitherTypeLambda> = {
  ...Invariant,
  coproduct: (that) => (self) => isRight(self) ? self : that,
  coproductMany: firstSuccessOf
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
 *   pipe(
 *     E.right(1),
 *     E.getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('error'),
 *     E.getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category getters
 * @since 1.0.0
 */
export const getOrElse = <B>(onLeft: LazyArg<B>) =>
  <E, A>(self: Either<E, A>): A | B => isLeft(self) ? onLeft() : self.right

/**
 * Recovers from all errors.
 *
 * @category error handling
 * @since 1.0.0
 */
export const catchAll = <E1, E2, B>(
  onLeft: (e: E1) => Either<E2, B>
) => <A>(self: Either<E1, A>): Either<E2, A | B> => isLeft(self) ? onLeft(self.left) : self

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
export const orElse = <E2, B>(
  that: Either<E2, B>
) => <E1, A>(self: Either<E1, A>): Either<E2, A | B> => isLeft(self) ? that : self

/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseEither = <E2, B>(
  that: Either<E2, B>
) =>
  <E1, A>(self: Either<E1, A>): Either<E2, Either<A, B>> =>
    isLeft(self) ?
      pipe(that, map(right)) :
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
): <E1, A>(self: Either<E1, A>) => Either<E2, A> => catchAll(() => left(onLeft()))

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * succeeds with the specified value.
 *
 * @category error handling
 * @since 1.0.0
 */
export const orElseSucceed = <B>(
  onLeft: LazyArg<B>
): <E, A>(self: Either<E, A>) => Either<E, A | B> => catchAll(() => right(onLeft()))

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative: semiAlternative.SemiAlternative<EitherTypeLambda> = {
  ...Covariant,
  ...SemiCoproduct
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<EitherTypeLambda> = {
  reduce: (b, f) => (self) => isLeft(self) ? b : f(b, self.right)
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
 * assert.strictEqual(
 *   pipe(
 *     E.right(1),
 *     E.match(onLeft , onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
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
 * @category conversions
 * @since 1.0.0
 */
export const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => Either<E, NonNullable<A>> =
  either.fromNullable

/**
 * @category lifting
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
 * Returns a `Refinement` from a `Either` returning function.
 * This function ensures that a `Refinement` definition is type-safe.
 *
 * @category conversions
 * @since 1.0.0
 */
export const toRefinement = <A, E, B extends A>(f: (a: A) => Either<E, B>): Refinement<A, B> =>
  (a: A): a is B => isRight(f(a))

/**
 * Constructs a new `Either` from a function that might throw.
 *
 * @example
 * import * as E from '@fp-ts/core/Either'
 * import { identity } from '@fp-ts/core/Function'
 *
 * const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: ReadonlyArray<A>): E.Either<unknown, A> =>
 *   E.fromThrowable(() => unsafeHead(as), identity)
 *
 * assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
 *
 * @category interop
 * @since 1.0.0
 */
export const fromThrowable = <A, E>(
  f: () => A,
  onThrow: (error: unknown) => E
): Either<E, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(onThrow(e))
  }
}

/**
 * @category interop
 * @since 1.0.0
 */
export const getOrThrow = <E>(onLeft: (e: E) => unknown) =>
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
): ((...a: A) => Either<E, B>) => (...a) => fromThrowable(() => f(...a), onThrow)

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
 * assert.deepStrictEqual(pipe(O.none, E.fromOption(() => 'error')), E.left('error'))
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromOption: <E>(onNone: LazyArg<E>) => <A>(self: Option<A>) => Either<E, A> =
  either.fromOption

/**
 * Converts a `Either` to an `Option` discarding the Right.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Either'
 *
 * assert.deepStrictEqual(E.getLeft(E.right('ok')), O.none)
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
 * assert.deepStrictEqual(E.getRight(E.left('err')), O.none)
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
    onFalse: LazyArg<E>
  ): (c: C) => Either<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: LazyArg<E>): (b: B) => Either<E, B>
} = <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: LazyArg<E>) =>
  (b: B) => predicate(b) ? right(b) : left(onFalse())

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
 * assert.strictEqual(f(E.left('a')), false)
 * assert.strictEqual(f(E.right(1)), false)
 * assert.strictEqual(f(E.right(3)), true)
 *
 * @since 1.0.0
 */
export const exists = <A>(predicate: Predicate<A>) =>
  <E>(self: Either<E, A>): boolean => isLeft(self) ? false : predicate(self.right)
