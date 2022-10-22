/**
 * ```ts
 * type Option<A> = None | Some<A>
 * ```
 *
 * `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
 * an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
 * instance of `None`.
 *
 * An option could be looked at as a collection or foldable structure with either one or zero elements.
 * Another way to look at `Option` is: it represents the effect of a possibly failing computation.
 *
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/data/Either"
import type { Predicate } from "@fp-ts/core/data/Predicate"
import type { Refinement } from "@fp-ts/core/data/Refinement"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import type { LazyArg } from "@fp-ts/core/internal/Function"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import * as nonEmptyReadonlyArray from "@fp-ts/core/internal/NonEmptyReadonlyArray"
import * as option from "@fp-ts/core/internal/Option"
import * as readonlyArray from "@fp-ts/core/internal/ReadonlyArray"
import type * as alternative from "@fp-ts/core/typeclass/Alternative"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import type * as compactable from "@fp-ts/core/typeclass/Compactable"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as extendable from "@fp-ts/core/typeclass/Extendable"
import * as filterable from "@fp-ts/core/typeclass/Filterable"
import * as flatMap_ from "@fp-ts/core/typeclass/FlatMap"
import type * as foldable from "@fp-ts/core/typeclass/Foldable"
import type * as foldableWithIndex from "@fp-ts/core/typeclass/FoldableWithIndex"
import type * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as monad from "@fp-ts/core/typeclass/Monad"
import type * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as nonEmptyAlternative from "@fp-ts/core/typeclass/NonEmptyAlternative"
import * as nonEmptyApplicative from "@fp-ts/core/typeclass/NonEmptyApplicative"
import type * as nonEmptyCoproduct from "@fp-ts/core/typeclass/NonEmptyCoproduct"
import type * as nonEmptyProduct from "@fp-ts/core/typeclass/NonEmptyProduct"
import * as order from "@fp-ts/core/typeclass/Order"
import type * as pointed from "@fp-ts/core/typeclass/Pointed"
import type * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as traversable from "@fp-ts/core/typeclass/Traversable"
import * as traversableFilterable from "@fp-ts/core/typeclass/TraversableFilterable"
import * as nonEmptyArray from "./NonEmptyArray"

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

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this["Target"]>
}

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @exampleTodo
 * import { some, none, isNone } from '@fp-ts/data/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category refinements
 * @since 1.0.0
 */
export const isNone: (fa: Option<unknown>) => fa is None = option.isNone

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @exampleTodo
 * import { some, none, isSome } from '@fp-ts/data/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category refinements
 * @since 1.0.0
 */
export const isSome: <A>(fa: Option<A>) => fa is Some<A> = option.isSome

/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const none: Option<never> = option.none

/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 1.0.0
 */
export const some: <A>(a: A) => Option<A> = option.some

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable = <A>(collection: Iterable<A>): Option<A> => {
  for (const a of collection) {
    return some(a)
  }
  return none
}

/**
 * Converts a `Result` to an `Option` discarding the error.
 *
 * @exampleTodo
 * import * as O from '@fp-ts/data/Option'
 * import * as R from '@fp-ts/data/Result'
 *
 * assert.deepStrictEqual(O.fromResult(R.succeed(1)), O.some(1))
 * assert.deepStrictEqual(O.fromResult(R.fail('a')), O.none)
 *
 * @category conversions
 * @since 1.0.0
 */
export const fromEither: <E, A>(self: Either<E, A>) => Option<A> = either.getRight

/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @exampleTodo
 * import { some, none, match } from '@fp-ts/data/Option'
 * import { pipe } from '@fp-ts/data/Function'
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
 *     none,
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
export const match = <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) =>
  (ma: Option<A>): B | C => isNone(ma) ? onNone() : onSome(ma.value)

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @exampleTodo
 * import { some, none, getOrElse } from '@fp-ts/data/Option'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(0)
 *   ),
 *   0
 * )
 *
 * @category error handling
 * @since 1.0.0
 */
export const getOrElse = <B>(onNone: B) =>
  <A>(ma: Option<A>): A | B => isNone(ma) ? onNone : ma.value

/**
 * Converts an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * @exampleTodo
 * import { none, some, fromThrowable } from '@fp-ts/data/Option'
 *
 * assert.deepStrictEqual(
 *   fromThrowable(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(fromThrowable(() => 1), some(1))
 *
 * @category interop
 * @see {@link liftThrowable}
 * @since 1.0.0
 */
export const fromThrowable = <A>(f: () => A): Option<A> => {
  try {
    return some(f())
  } catch (e) {
    return none
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
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @exampleTodo
 * import { some, none, toNull } from '@fp-ts/data/Option'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNull
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNull
 *   ),
 *   null
 * )
 *
 * @category conversions
 * @since 1.0.0
 */
export const toNull: <A>(self: Option<A>) => A | null = getOrElse(null)

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @exampleTodo
 * import { some, none, toUndefined } from '@fp-ts/data/Option'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @category conversions
 * @since 1.0.0
 */
export const toUndefined: <A>(self: Option<A>) => A | undefined = getOrElse(undefined)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 1.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B> = (f) =>
  (fa) => isNone(fa) ? none : some(f(fa.value))

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<OptionTypeLambda> = {
  of: some,
  map
}

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Option<B>) => (self: Option<A>) => Option<B> = (f) =>
  (self) => isNone(self) ? none : f(self.value)

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<OptionTypeLambda> = {
  flatMap
}

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThen: <A>(that: Option<A>) => (self: Option<unknown>) => Option<A> = flatMap_
  .andThen(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<OptionTypeLambda> = {
  ...FlatMap,
  map
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
export const tap: <A>(f: (a: A) => Option<unknown>) => (self: Option<A>) => Option<A> = chainable
  .tap(Chainable)

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThenDiscard: (that: Option<unknown>) => <A>(self: Option<A>) => Option<A> =
  chainable
    .andThenDiscard(Chainable)

/**
 * @since 1.0.0
 */
export const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B> = (fa) =>
  (fab) => pipe(fab, flatMap((ab) => pipe(fa, map((a) => ab(a)))))

/**
 * @since 1.0.0
 */
export const flatten: <A>(mma: Option<Option<A>>) => Option<A> = flatMap(identity)

/**
 * Lazy version of `orElse`.
 *
 * @category error handling
 * @since 1.0.0
 */
export const catchAll = <B>(that: LazyArg<Option<B>>) =>
  <A>(self: Option<A>): Option<A | B> => isNone(self) ? that() : self

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * | x       | y       | pipe(x, orElse(y) |
 * | ------- | ------- | ------------------|
 * | none    | none    | none              |
 * | some(a) | none    | some(a)           |
 * | none    | some(b) | some(b)           |
 * | some(a) | some(b) | some(a)           |
 *
 * @exampleTodo
 * import * as O from '@fp-ts/data/Option'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.orElse(O.none)
 *   ),
 *   O.none
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.orElse<string>(O.none)
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.orElse(O.some('b'))
 *   ),
 *   O.some('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.orElse(O.some('b'))
 *   ),
 *   O.some('a')
 * )
 *
 * @category instance operations
 * @since 1.0.0
 */
export const orElse = <B>(that: Option<B>): (<A>(self: Option<A>) => Option<A | B>) =>
  catchAll(() => that)

/**
 * @since 1.0.0
 */
export const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B> = (f) =>
  (wa) => isNone(wa) ? none : some(f(wa))

/**
 * @since 1.0.0
 */
export const duplicate: <A>(ma: Option<A>) => Option<Option<A>> = extend(identity)

/**
 * @category filtering
 * @since 1.0.0
 */
export const compact: <A>(foa: Option<Option<A>>) => Option<A> = flatten

const defaultSeparated = [none, none] as const

/**
 * @category filtering
 * @since 1.0.0
 */
export const separate: <A, B>(fe: Option<Either<A, B>>) => readonly [Option<A>, Option<B>] = (ma) =>
  isNone(ma) ? defaultSeparated : [either.getLeft(ma.value), fromEither(ma.value)]

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B> = (f) =>
  (fa) => isNone(fa) ? none : f(fa.value)

/**
 * @category filtering
 * @since 1.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Option<A>) => readonly [Option<B>, Option<C>] = (f) => oa => pipe(oa, map(f), separate)

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
    (ta: Option<A>): Kind<F, R, O, E, Option<B>> =>
      isNone(ta) ? F.of<Option<B>>(none) : pipe(f(ta.value), F.map(some))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * The `Sortable` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Sortable` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 * @exampleTodo
 * import { none, some, liftOrder } from '@fp-ts/data/Option'
 * import * as N from '@fp-ts/data/number'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * const O = liftOrder(N.Order)
 * assert.strictEqual(pipe(none, O.compare(none)), 0)
 * assert.strictEqual(pipe(none, O.compare(some(1))), -1)
 * assert.strictEqual(pipe(some(1), O.compare(none)), 1)
 * assert.strictEqual(pipe(some(1), O.compare(some(2))), -1)
 * assert.strictEqual(pipe(some(1), O.compare(some(1))), 0)
 *
 * @category instances
 * @since 1.0.0
 */
export const liftOrder = <A>(O: order.Order<A>): order.Order<Option<A>> =>
  order.fromCompare((that) =>
    (self) => isSome(self) ? (isSome(that) ? O.compare(that.value)(self.value) : 1) : -1
  )

/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * combined using the provided `Semigroup`
 *
 * | x       | y       | combine(y)(x)       |
 * | ------- | ------- | ------------------- |
 * | none    | none    | none                |
 * | some(a) | none    | some(a)             |
 * | none    | some(a) | some(a)             |
 * | some(a) | some(b) | some(combine(b)(a)) |
 *
 * @exampleTodo
 * import { getMonoid, some, none } from '@fp-ts/data/Option'
 * import * as N from '@fp-ts/data/number'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * const M = getMonoid(N.SemigroupSum)
 * assert.deepStrictEqual(pipe(none, M.combine(none)), none)
 * assert.deepStrictEqual(pipe(some(1), M.combine(none)), some(1))
 * assert.deepStrictEqual(pipe(none, M.combine(some(1))), some(1))
 * assert.deepStrictEqual(pipe(some(1), M.combine(some(2))), some(3))
 *
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = <A>(
  S: semigroup.Semigroup<A>
): monoid.Monoid<Option<A>> => {
  const combine = (that: Option<A>) =>
    (self: Option<A>): Option<A> =>
      isNone(self) ? that : isNone(that) ? self : some(S.combine(that.value)(self.value))
  return ({
    combine,
    combineMany: (others) =>
      (start) => {
        let c = start
        for (const o of others) {
          c = combine(o)(c)
        }
        return c
      },
    combineAll: (collection: Iterable<Option<A>>): Option<A> => {
      let c: Option<A> = none
      for (const o of collection) {
        c = combine(o)(c)
      }
      return c
    },
    empty: none
  })
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<OptionTypeLambda> = {
  map
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
export const as: <B>(b: B) => (self: Option<unknown>) => Option<B> = covariant.as(Covariant)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 1.0.0
 */
export const asUnit: (self: Option<unknown>) => Option<void> = covariant.asUnit(Covariant)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 1.0.0
 */
export const product = <B>(
  that: Option<B>
) =>
  <A>(self: Option<A>): Option<readonly [A, B]> =>
    isSome(self) && isSome(that) ? some([self.value, that.value]) : none

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<OptionTypeLambda> = {
  imap: covariant.imap(Covariant)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const NonEmptyProduct: nonEmptyProduct.NonEmptyProduct<OptionTypeLambda> = {
  imap: Invariant.imap,
  product,
  productMany: collection =>
    self => {
      if (isNone(self)) {
        return none
      }
      const out = nonEmptyArray.make(self.value)
      for (const o of collection) {
        if (isNone(o)) {
          return none
        }
        out.push(o.value)
      }
      return some(out)
    }
}

/**
 * @category instances
 * @since 1.0.0
 */
export const NonEmptyApplicative: nonEmptyApplicative.NonEmptyApplicative<OptionTypeLambda> = {
  ...Covariant,
  ...NonEmptyProduct
}

const coproduct = <B>(
  that: Option<B>
) => <A>(self: Option<A>): Option<A | B> => isSome(self) ? self : isSome(that) ? that : none

export const NonEmptyCoproduct: nonEmptyCoproduct.NonEmptyCoproduct<OptionTypeLambda> = {
  coproduct,
  coproductMany: collection =>
    self => {
      if (isSome(self)) {
        return self
      }
      for (const o of collection) {
        if (isSome(o)) {
          return o
        }
      }
      return none
    }
}

export const NonEmptyAlternative: nonEmptyAlternative.NonEmptyAlternative<OptionTypeLambda> = {
  map,
  ...NonEmptyCoproduct
}

export const Alternative: alternative.Alternative<OptionTypeLambda> = {
  ...NonEmptyAlternative,
  zero: () => none,
  coproductAll: collection => NonEmptyAlternative.coproductMany(collection)(none)
}

/**
 * Lifts a binary function into `Option`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Option<A>, fb: Option<B>) => Option<C> =
  nonEmptyApplicative.lift2(NonEmptyApplicative)

/**
 * Lifts a ternary function into `Option`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Option<A>, fb: Option<B>, fc: Option<C>) => Option<D> = nonEmptyApplicative.lift3(
  NonEmptyApplicative
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<OptionTypeLambda> = {
  ...NonEmptyApplicative,
  of: some,
  productAll: collection => {
    const as = readonlyArray.fromIterable(collection)
    return nonEmptyReadonlyArray.isNonEmpty(as) ?
      NonEmptyApplicative.productMany(nonEmptyReadonlyArray.tail(as))(
        nonEmptyReadonlyArray.head(as)
      ) :
      some([])
  }
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<OptionTypeLambda> = {
  map,
  of: some,
  flatMap
}

/**
 * @category conversions
 * @since 1.0.0
 */
export const toReadonlyArray = <A>(
  self: Option<A>
): ReadonlyArray<A> => (isNone(self) ? [] : [self.value])

/**
 * @category folding
 * @since 1.0.0
 */
export const reduce = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Option<A>): B => isNone(self) ? b : f(b, self.value)

/**
 * @category folding
 * @since 1.0.0
 */
export const foldMap = <M>(Monoid: monoid.Monoid<M>) =>
  <A>(f: (a: A) => M) => (self: Option<A>): M => isNone(self) ? Monoid.empty : f(self.value)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRight = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Option<A>): B => isNone(self) ? b : f(b, self.value)

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<OptionTypeLambda> = {
  reduce,
  reduceRight
}

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceWithIndex = <B, A>(b: B, f: (b: B, a: A, i: number) => B) =>
  (self: Option<A>): B => isNone(self) ? b : f(b, self.value, 0)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRightWithIndex = <B, A>(b: B, f: (b: B, a: A, i: number) => B) =>
  (self: Option<A>): B => isNone(self) ? b : f(b, self.value, 0)

/**
 * @category instances
 * @since 1.0.0
 */
export const FoldableWithIndex: foldableWithIndex.FoldableWithIndex<OptionTypeLambda, number> = {
  reduceWithIndex,
  reduceRightWithIndex
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Extendable: extendable.Extendable<OptionTypeLambda> = {
  map,
  extend
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Compactable: compactable.Compactable<OptionTypeLambda> = {
  compact
}

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
 * @category filtering
 * @since 1.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(
    refinement: Refinement<A, B>
  ): (fc: Option<C>) => readonly [Option<C>, Option<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: Option<B>) => readonly [Option<B>, Option<B>]
} = filterable.partition(Filterable)

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<OptionTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <R, O, E, A>(fas: Option<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Option<A>> = traversable
  .sequence(Traversable)

/**
 * @category filtering
 * @since 1.0.0
 */
export const traverseFilterMap: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<F, R, O, E, Option<B>>
) => (ta: Option<A>) => Kind<F, R, O, E, Option<B>> = traversableFilterable.traverseFilterMap(
  { ...Traversable, ...Compactable }
)

/**
 * @category filtering
 * @since 1.0.0
 */
export const traversePartitionMap: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <A, R, O, E, B, C>(
  f: (a: A) => Kind<F, R, O, E, Either<B, C>>
) => (wa: Option<A>) => Kind<F, R, O, E, readonly [Option<B>, Option<C>]> = traversableFilterable
  .traversePartitionMap({ ...Traversable, ...Covariant, ...Compactable })

/**
 * @category instances
 * @since 1.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<
  OptionTypeLambda
> = {
  traverseFilterMap,
  traversePartitionMap
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const traverseFilter: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <B extends A, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, R, O, E, boolean>
) => (self: Option<B>) => Kind<F, R, O, E, Option<B>> = traversableFilterable.traverseFilter(
  TraversableFilterable
)

/**
 * @category filtering
 * @since 1.0.0
 */
export const traversePartition: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <B extends A, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, R, O, E, boolean>
) => (self: Option<B>) => Kind<F, R, O, E, readonly [Option<B>, Option<B>]> = traversableFilterable
  .traversePartition(TraversableFilterable)

// TODO
// /**
//  * Returns a *smart constructor* based on the given predicate.
//  *
//  * @exampleTodo
//  * import * as O from '@fp-ts/data/Option'
//  *
//  * const getOption = O.liftPredicate((n: number) => n >= 0)
//  *
//  * assert.deepStrictEqual(getOption(-1), O.none)
//  * assert.deepStrictEqual(getOption(1), O.some(1))
//  *
//  * @category lifting
//  * @since 1.0.0
//  */
// export const liftPredicate: {
//   <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Option<B>
//   <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Option<B>
// } = fromOption_.liftPredicate(FromOption)

// TODO
// /**
//  * @category instances
//  * @since 1.0.0
//  */
// export const FromResult: fromResult_.FromResult<OptionTypeLambda> = {
//   fromResult: fromEither
// }

// TODO
// /**
//  * @category lifting
//  * @since 1.0.0
//  */
// export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
//   f: (...a: A) => Result<E, B>
// ) => (...a: A) => Option<B> = fromResult_.liftResult(FromResult)

// TODO
// /**
//  * @category sequencing
//  * @since 1.0.0
//  */
// export const flatMapResult: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: Option<A>) => Option<B> =
//   fromResult_.flatMapResult(FromResult, FlatMap)

// TODO
// /**
//  * Tests whether a value is a member of a `Option`.
//  *
//  * @exampleTodo
//  * import * as O from '@fp-ts/data/Option'
//  * import * as N from '@fp-ts/data/number'
//  * import { pipe } from '@fp-ts/data/Function'
//  *
//  * assert.strictEqual(pipe(O.some(1), O.elem(N.Eq)(1)), true)
//  * assert.strictEqual(pipe(O.some(1), O.elem(N.Eq)(2)), false)
//  * assert.strictEqual(pipe(O.none, O.elem(N.Eq)(1)), false)
//  *
//  * @since 1.0.0
//  */
// export const elem = <A>(a: A) =>
//   (ma: Option<A>): boolean => isNone(ma) ? false : equals(ma.value)(a)

/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @exampleTodo
 * import { some, none, exists } from '@fp-ts/data/Option'
 * import { pipe } from '@fp-ts/data/Function'
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
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 1.0.0
 */
export const exists = <A>(predicate: Predicate<A>) =>
  (ma: Option<A>): boolean => isNone(ma) ? false : predicate(ma.value)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 1.0.0
 */
export const Do: Option<{}> = some({})

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(self: Option<A>) => Option<{ readonly [K in N]: A }> = covariant.bindTo(Covariant)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  covariant.let(Covariant)

export { let_ as let }

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  chainable.bind(Chainable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  nonEmptyApplicative.bindRight(NonEmptyApplicative)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 1.0.0
 */
export const Zip: Option<readonly []> = some([])

/**
 * @category tuple sequencing
 * @since 1.0.0
 */
export const tupled: <A>(self: Option<A>) => Option<readonly [A]> = covariant.tupled(Covariant)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 1.0.0
 */
export const productFlatten: <B>(
  fb: Option<B>
) => <A extends ReadonlyArray<unknown>>(self: Option<A>) => Option<readonly [...A, B]> =
  nonEmptyApplicative
    .productFlatten(NonEmptyApplicative)
