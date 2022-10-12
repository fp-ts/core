/**
 * ```ts
 * type Result<E, A> = Failure<E> | Success<A>
 * ```
 *
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Result` is either an instance of `Failure` or `Success`.
 *
 * A common use of `Result` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Failure` which can contain useful information. `Success` takes the place of `Some`. Convention
 * dictates that `Failure` is used for failure and `Success` is used for success.
 *
 * @since 3.0.0
 */
import * as apply from "@fp-ts/core/Ap"
import type * as applicative from "@fp-ts/core/Applicative"
import type * as kleisliComposable from "@fp-ts/core/ComposeKleisli"
import * as functor from "@fp-ts/core/Covariant"
import * as eq from "@fp-ts/core/Equals"
import type * as extendable from "@fp-ts/core/Extend"
import * as flattenable from "@fp-ts/core/FlatMap"
import { flow, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type * as kleisliCategory from "@fp-ts/core/KleisliCategory"
import * as bifunctor from "@fp-ts/core/MapBoth"
import type * as monad from "@fp-ts/core/Monad"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as alt from "@fp-ts/core/OrElse"
import type { Semigroup } from "@fp-ts/core/Semigroup"
import type { Show } from "@fp-ts/core/Show"
import * as fromIdentity from "@fp-ts/core/Succeed"
import * as traversable from "@fp-ts/core/Traverse"

/**
 * @category model
 * @since 3.0.0
 */
export interface Failure<E> {
  readonly _tag: "Failure"
  readonly failure: E
}

/**
 * @category model
 * @since 3.0.0
 */
export interface Success<A> {
  readonly _tag: "Success"
  readonly success: A
}

/**
 * @category model
 * @since 3.0.0
 */
export type Result<E, A> = Failure<E> | Success<A>

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ResultTypeLambda extends TypeLambda {
  readonly type: Result<this["Out2"], this["Out1"]>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ResultTypeLambdaFix<E> extends TypeLambda {
  readonly type: Result<E, this["Out1"]>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ValidatedT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this["InOut1"], this["In1"], this["Out3"], E, this["Out1"]>
}

/**
 * Returns `true` if the either is an instance of `Failure`, `false` otherwise.
 *
 * @category refinements
 * @since 3.0.0
 */
export const isFailure = <E, A>(self: Result<E, A>): self is Failure<E> => self._tag === "Failure"

/**
 * Returns `true` if the either is an instance of `Success`, `false` otherwise.
 *
 * @category refinements
 * @since 3.0.0
 */
export const isSuccess = <E, A>(self: Result<E, A>): self is Success<A> => self._tag === "Success"

/**
 * Constructs a new `Result` holding a `Failure` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fail = <E>(e: E): Result<E, never> => ({ _tag: "Failure", failure: e })

/**
 * Constructs a new `Result` holding a `Success` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 3.0.0
 */
export const succeed = <A>(a: A): Result<never, A> => ({ _tag: "Success", success: a })

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * Takes two functions and an `Result` value, if the value is a `Failure` the inner value is applied to the first function,
 * if the value is a `Success` the inner value is applied to the second function.
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 * import { pipe } from '@fp-ts/core/data/Function'
 *
 * const onError  = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`
 *
 * const onSuccess = (value: number): string => `Ok: ${value}`
 *
 * assert.strictEqual(
 *   pipe(
 *     E.succeed(1),
 *     E.match(onError , onSuccess)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     E.fail(['error 1', 'error 2']),
 *     E.match(onError , onSuccess)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const match = <E, B, A, C = B>(onError: (e: E) => B, onSuccess: (a: A) => C) =>
  (self: Result<E, A>): B | C => isFailure(self) ? onError(self.failure) : onSuccess(self.success)

/**
 * Returns the wrapped value if it's a `Success` or a default value if is a `Failure`.
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 * import { pipe } from '@fp-ts/core/data/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.succeed(1),
 *     E.getOrElse(0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.fail('error'),
 *     E.getOrElse(0)
 *   ),
 *   0
 * )
 *
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse = <B>(onError: B) =>
  <A>(self: Result<unknown, A>): A | B => isFailure(self) ? onError : self.success

/**
 * Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Success`, if the value is nully use
 * the provided default as a `Failure`.
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 *
 * const parse = E.fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), E.succeed(1))
 * assert.deepStrictEqual(parse(null), E.fail('nully'))
 *
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable = <E>(onNullable: E) =>
  <A>(a: A): Result<E, NonNullable<A>> =>
    a == null ? fail(onNullable) : succeed(a as NonNullable<A>)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => {
  const from = fromNullable(onNullable)
  return (...a: A): Result<E, NonNullable<B>> => from(f(...a))
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable = <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
): (<E1>(self: Result<E1, A>) => Result<E1 | E2, NonNullable<B>>) =>
  flatMap(liftNullable(f, onNullable))

/**
 * Constructs a new `Result` from a function that might throw.
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 * import { identity } from '@fp-ts/core/data/Function'
 *
 * const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: ReadonlyArray<A>): E.Result<unknown, A> =>
 *   E.fromThrowable(() => unsafeHead(as), identity)
 *
 * assert.deepStrictEqual(head([]), E.fail(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), E.succeed(1))
 *
 * @see {@link liftThrowable}
 * @category interop
 * @since 3.0.0
 */
export const fromThrowable = <A, E>(f: () => A, onThrow: (error: unknown) => E): Result<E, A> => {
  try {
    return succeed(f())
  } catch (e) {
    return fail(onThrow(e))
  }
}

/**
 * Lifts a function that may throw to one returning a `Result`.
 *
 * @category interop
 * @since 3.0.0
 */
export const liftThrowable = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
): ((...a: A) => Result<E, B>) => (...a) => fromThrowable(() => f(...a), onThrow)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: Result<E, A>) => E | A = match(e => e, a => a)

/**
 * @since 3.0.0
 */
export const reverse = <E, A>(ma: Result<E, A>): Result<A, E> =>
  isFailure(ma) ? succeed(ma.failure) : fail(ma.success)

/**
 * Recovers from all errors.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll: <E1, E2, B>(
  onError: (e: E1) => Result<E2, B>
) => <A>(self: Result<E1, A>) => Result<E2, A | B> = (onError) =>
  (self) => isFailure(self) ? onError(self.failure) : self

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (self: Result<E, A>) => Result<G, B> = (f, g) =>
  (fa) => isFailure(fa) ? fail(f(fa.failure)) : succeed(g(fa.success))

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Result` returns the left-most non-`Failure` value (or the right-most `Failure` value if both values are `Failure`).
 *
 * | x          | y          | pipe(x, orElse(y) |
 * | ---------- | ---------- | ------------------|
 * | fail(a)    | fail(b)    | fail(b)           |
 * | fail(a)    | succeed(2) | succeed(2)        |
 * | succeed(1) | fail(b)    | succeed(1)        |
 * | succeed(1) | succeed(2) | succeed(1)        |
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 * import { pipe } from '@fp-ts/core/data/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.fail('a'),
 *     E.orElse(E.fail('b'))
 *   ),
 *   E.fail('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.fail('a'),
 *     E.orElse(E.succeed(2))
 *   ),
 *   E.succeed(2)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.succeed(1),
 *     E.orElse(E.fail('b'))
 *   ),
 *   E.succeed(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.succeed(1),
 *     E.orElse(E.succeed(2))
 *   ),
 *   E.succeed(1)
 * )
 *
 * @category error handling
 * @since 3.0.0
 */
export const orElse: <E2, B>(
  that: Result<E2, B>
) => <E1, A>(self: Result<E1, A>) => Result<E2, A | B> = (that) => (fa) => isFailure(fa) ? that : fa

/**
 * @since 3.0.0
 */
export const extend: <E, A, B>(f: (wa: Result<E, A>) => B) => (wa: Result<E, A>) => Result<E, B> = (
  f
) => (wa) => isFailure(wa) ? wa : succeed(f(wa))

/**
 * @since 3.0.0
 */
export const duplicate: <E, A>(ma: Result<E, A>) => Result<E, Result<E, A>> = extend(r => r)

/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from '@fp-ts/core/data/Function'
 * import * as RA from '@fp-ts/core/data/ReadonlyArray'
 * import * as E from '@fp-ts/core/data/Result'
 * import * as O from '@fp-ts/core/data/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.succeed(['a']), E.traverse(O.Applicative)(RA.head)),
 *   O.some(E.succeed('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.succeed([]), E.traverse(O.Applicative)(RA.head)),
 *   O.none,
 * )
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverse = <F extends TypeLambda>(F: applicative.Applicative<F>) =>
  <A, FS, FR, FO, FE, B>(f: (a: A) => Kind<F, FS, FR, FO, FE, B>) =>
    <E>(ta: Result<E, A>): Kind<F, FS, FR, FO, FE, Result<E, B>> =>
      isFailure(ta) ? F.succeed(fail(ta.failure)) : pipe(f(ta.success), F.map(succeed))

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <E, A>(ShowE: Show<E>, ShowA: Show<A>): Show<Result<E, A>> => ({
  show: (
    self
  ) => (isFailure(self) ?
    `fail(${ShowE.show(self.failure)})` :
    `succeed(${ShowA.show(self.success)})`)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <E, A>(EE: eq.Equals<E>, EA: eq.Equals<A>): eq.Equals<Result<E, A>> =>
  eq.fromEquals(
    (that) =>
      (self) =>
        isFailure(self)
          ? isFailure(that) && EE.equals(that.failure)(self.failure)
          : isSuccess(that) && EA.equals(that.success)(self.success)
  )

/**
 * Semigroup returning the left-most non-`Failure` value. If both operands are `Success`es then the inner values are
 * combined using the provided `Semigroup`.
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 * import * as N from '@fp-ts/core/data/number'
 * import { pipe } from '@fp-ts/core/data/Function'
 *
 * const S = E.getSemigroup(N.SemigroupSum)<string>()
 * assert.deepStrictEqual(pipe(E.fail('a'), S.combine(E.fail('b'))), E.fail('a'))
 * assert.deepStrictEqual(pipe(E.fail('a'), S.combine(E.succeed(2))), E.succeed(2))
 * assert.deepStrictEqual(pipe(E.succeed(1), S.combine(E.fail('b'))), E.succeed(1))
 * assert.deepStrictEqual(pipe(E.succeed(1), S.combine(E.succeed(2))), E.succeed(3))
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(Semigroup: Semigroup<A>) =>
  <E>(): Semigroup<Result<E, A>> => ({
    combine: (that) =>
      (self) =>
        isFailure(that) ?
          self :
          isFailure(self) ?
          that :
          succeed(Semigroup.combine(that.success)(self.success))
  })

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <E>(
  onEmpty: E
) => <A, B>(self: Result<E, Result<A, B>>) => readonly [Result<E, A>, Result<E, B>] = (onEmpty) => {
  return (self) =>
    isFailure(self)
      ? [self, self]
      : isFailure(self.success)
      ? [succeed(self.success.failure), fail(onEmpty)]
      : [fail(onEmpty), succeed(self.success.success)]
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const traversePartitionMap = <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => {
  const traverse_ = traverse(Applicative)
  return <A, S, R, O, FE, B, C, E>(
    f: (a: A) => Kind<F, S, R, O, FE, Result<B, C>>,
    onNone: E
  ): ((self: Result<E, A>) => Kind<F, S, R, O, FE, readonly [Result<E, B>, Result<E, C>]>) => {
    return flow(traverse_(f), Applicative.map(separate(onNone)))
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.MapBoth<ResultTypeLambda> = {
  mapBoth
}

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: Result<E, A>) => Result<G, A> = bifunctor
  .mapLeft(Bifunctor)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Result<E, A>) => Result<E, B> = bifunctor.map(
  Bifunctor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Covariant<ResultTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: Result<E, (a: A) => B>) => Result<E, B> = functor.flap(
  Functor
)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <E>(self: Result<E, unknown>) => Result<E, B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <E>(self: Result<E, unknown>) => Result<E, void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.Succeed<ResultTypeLambda> = {
  succeed
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <E1>(self: Result<E1, A>) => Result<E1 | E2, B> = (f) =>
  (self) => isFailure(self) ? self : f(self.success)

/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 *
 * assert.deepStrictEqual(E.flatten(E.succeed(E.succeed('a'))), E.succeed('a'))
 * assert.deepStrictEqual(E.flatten(E.succeed(E.fail('e'))), E.fail('e'))
 * assert.deepStrictEqual(E.flatten(E.fail('e')), E.fail('e'))
 *
 * @category sequencing
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(mma: Result<E1, Result<E2, A>>) => Result<E1 | E2, A> = flatMap(
  r => r
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.FlatMap<ResultTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, E2, C>(
  bfc: (b: B) => Result<E2, C>
) => <A, E1>(afb: (a: A) => Result<E1, B>) => (a: A) => Result<E2 | E1, C> = flattenable
  .composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.ComposeKleisli<ResultTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => Result<never, A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<ResultTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: <E2>(
  that: Result<E2, unknown>
) => <E1, A>(self: Result<E1, A>) => Result<E2 | E1, A> = flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <E2, A>(
  that: Result<E2, A>
) => <E1>(self: Result<E1, unknown>) => Result<E2 | E1, A> = flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <E2, A>(
  fa: Result<E2, A>
) => <E1, B>(fab: Result<E1, (a: A) => B>) => Result<E1 | E2, B> = flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Ap<ResultTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `Result`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: Result<E1, A>, fb: Result<E2, B>) => Result<E1 | E2, C> = apply.lift2(Apply)

/**
 * Lifts a ternary function into `Result`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(
  fa: Result<E1, A>,
  fb: Result<E2, B>,
  fc: Result<E3, C>
) => Result<E1 | E2 | E3, D> = apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ResultTypeLambda> = {
  map,
  ap,
  succeed
}

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @example
 * import * as A from '@fp-ts/core/typeclasses/Apply'
 * import * as E from '@fp-ts/core/data/Result'
 * import { pipe } from '@fp-ts/core/data/Function'
 * import * as S from '@fp-ts/core/typeclasses/Semigroup'
 * import * as string from '@fp-ts/core/data/string'
 *
 * const parseString = (u: unknown): E.Result<string, string> =>
 *   typeof u === 'string' ? E.succeed(u) : E.fail('not a string')
 *
 * const parseNumber = (u: unknown): E.Result<string, number> =>
 *   typeof u === 'number' ? E.succeed(u) : E.fail('not a number')
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const parsePerson = (
 *   input: Record<string, unknown>
 * ): E.Result<string, Person> =>
 *   pipe(
 *     E.Do,
 *     E.bindRight('name', parseString(input.name)),
 *     E.bindRight('age', parseNumber(input.age))
 *   )
 *
 * assert.deepStrictEqual(parsePerson({}), E.fail('not a string')) // <= first error
 *
 * const Applicative = E.getValidatedApplicative(
 *   pipe(string.Semigroup, S.intercalate(', '))
 * )
 *
 * const bindRight = A.bindRight(Applicative)
 *
 * const parsePersonAll = (
 *   input: Record<string, unknown>
 * ): E.Result<string, Person> =>
 *   pipe(
 *     E.Do,
 *     bindRight('name', parseString(input.name)),
 *     bindRight('age', parseNumber(input.age))
 *   )
 *
 * assert.deepStrictEqual(parsePersonAll({}), E.fail('not a string, not a number')) // <= all errors
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedApplicative = <E>(
  Semigroup: Semigroup<E>
): applicative.Applicative<ValidatedT<ResultTypeLambda, E>> => ({
  map,
  ap: (fa) =>
    (fab) =>
      isFailure(fab)
        ? isFailure(fa)
          ? fail(Semigroup.combine(fa.failure)(fab.failure))
          : fab
        : isFailure(fa)
        ? fa
        : succeed(fab.success(fa.success)),
  succeed
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ResultTypeLambda> = {
  map,
  succeed,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category error handling
 * @since 3.0.0
 */
export const tapError: <E1, E2>(
  onError: (e: E1) => Result<E2, unknown>
) => <A>(self: Result<E1, A>) => Result<E1 | E2, A> = (onError) =>
  (self) => {
    if (isSuccess(self)) {
      return self
    }
    const out = onError(self.failure)
    return isFailure(out) ? out : self
  }

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A, E2>(
  f: (a: A) => Result<E2, unknown>
) => <E1>(self: Result<E1, A>) => Result<E1 | E2, A> = flattenable.tap(Flattenable)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toReadonlyArray = <E, A>(self: Result<E, A>): ReadonlyArray<A> =>
  isFailure(self) ? [] : [self.success]

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce = <B, A>(b: B, f: (b: B, a: A) => B) =>
  <E>(self: Result<E, A>): B => isFailure(self) ? b : f(b, self.success)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap = <M>(Monoid: Monoid<M>) =>
  <A>(f: (a: A) => M) =>
    <E>(self: Result<E, A>): M => isFailure(self) ? Monoid.empty : f(self.success)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight = <B, A>(b: B, f: (a: A, b: B) => B) =>
  <E>(self: Result<E, A>): B => isFailure(self) ? b : f(self.success, b)

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traverse<ResultTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <E, FS, FR, FO, FE, A>(
  fa: Result<E, Kind<F, FS, FR, FO, FE, A>>
) => Kind<F, FS, FR, FO, FE, Result<E, A>> = traversable.sequence(Traversable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.OrElse<ResultTypeLambda> = {
  orElse
}

/**
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @category error handling
 * @since 3.0.0
 */
export const firstSuccessOf: <E, A>(
  startWith: Result<E, A>
) => (collection: Iterable<Result<E, A>>) => Result<E, A> = alt.firstSuccessOf(Alt)

/**
 * The default [`Alt`](#semigroupkind) instance returns the last error, if you want to
 * get all errors you need to provide a way to combine them via a `Semigroup`.
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 * import { pipe } from '@fp-ts/core/data/Function'
 * import * as S from '@fp-ts/core/typeclasses/Semigroup'
 * import * as string from '@fp-ts/core/data/string'
 *
 * const parseString = (u: unknown): E.Result<string, string> =>
 *   typeof u === 'string' ? E.succeed(u) : E.fail('not a string')
 *
 * const parseNumber = (u: unknown): E.Result<string, number> =>
 *   typeof u === 'number' ? E.succeed(u) : E.fail('not a number')
 *
 * const parse = (u: unknown): E.Result<string, string | number> =>
 *   pipe(
 *     parseString(u),
 *     E.orElse<string, string | number>(parseNumber(u))
 *   )
 *
 * assert.deepStrictEqual(parse(true), E.fail('not a number')) // <= last error
 *
 * const Alt = E.getValidatedAlt(pipe(string.Semigroup, S.intercalate(', ')))
 *
 * const parseAll = (u: unknown): E.Result<string, string | number> =>
 *   pipe(parseString(u), Alt.orElse(parseNumber(u) as E.Result<string, string | number>))
 *
 * assert.deepStrictEqual(parseAll(true), E.fail('not a string, not a number')) // <= all errors
 *
 * @category error handling
 * @since 3.0.0
 */
export const getValidatedAlt = <E>(
  Semigroup: Semigroup<E>
): alt.OrElse<ValidatedT<ResultTypeLambda, E>> => ({
  orElse: (that) =>
    (self) => {
      if (isSuccess(self)) {
        return self
      }
      return isFailure(that) ? fail(Semigroup.combine(that.failure)(self.failure)) : that
    }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Extendable: extendable.Extend<ResultTypeLambda> = {
  map,
  extend
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const toNull: <E, A>(self: Result<E, A>) => A | null = getOrElse(null)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toUndefined: <E, A>(self: Result<E, A>) => A | undefined = getOrElse(undefined)

/**
 * Tests whether a value is a member of a `Result`.
 *
 * @since 3.0.0
 */
export const elem = <A>(E: eq.Equals<A>) =>
  (a: A) => <E>(ma: Result<E, A>): boolean => isFailure(ma) ? false : E.equals(ma.success)(a)

/**
 * Returns `false` if `Failure` or returns the result of the application of the given predicate to the `Success` value.
 *
 * @example
 * import * as E from '@fp-ts/core/data/Result'
 *
 * const f = E.exists((n: number) => n > 2)
 *
 * assert.strictEqual(f(E.fail('a')), false)
 * assert.strictEqual(f(E.succeed(1)), false)
 * assert.strictEqual(f(E.succeed(3)), true)
 *
 * @since 3.0.0
 */
export const exists = <A>(predicate: (a: A) => boolean) =>
  (ma: Result<unknown, A>): boolean => isFailure(ma) ? false : predicate(ma.success)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Result<never, {}> = succeed({})

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(self: Result<E, A>) => Result<E, { readonly [K in N]: A }> = functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(
  self: Result<E, A>
) => Result<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor.let(Functor)

export { let_ as let }

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Result<E2, B>
) => <E1>(
  self: Result<E1, A>
) => Result<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = flattenable
  .bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Result<E2, B>
) => <E1>(
  self: Result<E1, A>
) => Result<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Result<never, readonly []> = succeed([])

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <E, A>(self: Result<E, A>) => Result<E, readonly [A]> = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <E2, B>(
  fb: Result<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(
  self: Result<E1, A>
) => Result<E1 | E2, readonly [...A, B]> = apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <E2, B, A, C>(
  that: Result<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: Result<E1, A>) => Result<E2 | E1, C> = apply.zipWith(Apply)
