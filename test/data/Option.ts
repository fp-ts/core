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
import { identity, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type * as extendable from "@fp-ts/core/test/limbo/Extendable"
import type * as alternative from "@fp-ts/core/typeclass/Alternative"
import type * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import * as flatMap_ from "@fp-ts/core/typeclass/FlatMap"
import type * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as monad from "@fp-ts/core/typeclass/Monad"
import type * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as of_ from "@fp-ts/core/typeclass/Of"
import * as order from "@fp-ts/core/typeclass/Order"
import type * as pointed from "@fp-ts/core/typeclass/Pointed"
import type * as product from "@fp-ts/core/typeclass/Product"
import type * as semiAlternative from "@fp-ts/core/typeclass/SemiAlternative"
import * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import type * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"
import type * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"
import type * as foldableWithIndex from "../limbo/FoldableWithIndex"
import * as nonEmptyArray from "./NonEmptyArray"
import * as nonEmptyReadonlyArray from "./NonEmptyReadonlyArray"

export interface LazyArg<A> {
  (): A
}

export interface None {
  readonly _tag: "None"
}

export interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

export type Option<A> = None | Some<A>

export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this["Target"]>
}

export const isNone = <A>(fa: Option<A>): fa is None => fa._tag === "None"

export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === "Some"

export const none: Option<never> = { _tag: "None" }

export const some = <A>(a: A): Option<A> => ({ _tag: "Some", value: a })

export const fromIterable = <A>(collection: Iterable<A>): Option<A> => {
  for (const a of collection) {
    return some(a)
  }
  return none
}

export const match = <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) =>
  (ma: Option<A>): B | C => isNone(ma) ? onNone() : onSome(ma.value)

export const getOrElse = <B>(onNone: B) =>
  <A>(ma: Option<A>): A | B => isNone(ma) ? onNone : ma.value

export const fromThrowable = <A>(f: () => A): Option<A> => {
  try {
    return some(f())
  } catch (e) {
    return none
  }
}

export const liftThrowable = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B
): ((...a: A) => Option<B>) => (...a) => fromThrowable(() => f(...a))

export const toNull: <A>(self: Option<A>) => A | null = getOrElse(null)

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @exampleTodo
 * import { some, none, toUndefined } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
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
export const Covariant: covariant.Covariant<OptionTypeLambda> = covariant.make(map)

export const Of: of_.Of<OptionTypeLambda> = {
  of: some
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<OptionTypeLambda> = {
  ...Covariant,
  ...Of
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
  ...Covariant
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
 * import * as O from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
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

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B> = (f) =>
  (fa) => isNone(fa) ? none : f(fa.value)

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
 * import { none, some, liftOrder } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
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
 * import { getMonoid, some, none } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
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
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<OptionTypeLambda> = {
  imap: covariant.imap<OptionTypeLambda>(Covariant.map)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<OptionTypeLambda> = {
  imap: Invariant.imap,
  product: that => self => isSome(self) && isSome(that) ? some([self.value, that.value]) : none,
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
export const SemiApplicative: semiApplicative.SemiApplicative<OptionTypeLambda> = {
  ...Covariant,
  ...SemiProduct
}

const coproduct = <B>(
  that: Option<B>
) => <A>(self: Option<A>): Option<A | B> => isSome(self) ? self : isSome(that) ? that : none

export const SemiCoproduct: semiCoproduct.SemiCoproduct<OptionTypeLambda> = {
  imap: Invariant.imap,
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

export const SemiAlternative: semiAlternative.SemiAlternative<OptionTypeLambda> = {
  ...Covariant,
  ...SemiCoproduct
}

export const Alternative: alternative.Alternative<OptionTypeLambda> = {
  ...SemiAlternative,
  zero: () => none,
  coproductAll: collection => SemiAlternative.coproductMany(collection)(none)
}

/**
 * Lifts a binary function into `Option`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Option<A>, fb: Option<B>) => Option<C> =
  semiApplicative.lift2(SemiApplicative)

/**
 * Lifts a ternary function into `Option`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Option<A>, fb: Option<B>, fc: Option<C>) => Option<D> = semiApplicative.lift3(
  SemiApplicative
)

export const Product: product.Product<OptionTypeLambda> = {
  ...SemiProduct,
  ...Of,
  productAll: collection => {
    const as = Array.from(collection)
    return nonEmptyReadonlyArray.isNonEmpty(as) ?
      SemiApplicative.productMany(nonEmptyReadonlyArray.tail(as))(
        nonEmptyReadonlyArray.head(as)
      ) :
      some([])
  }
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<OptionTypeLambda> = {
  ...SemiApplicative,
  ...Product
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<OptionTypeLambda> = {
  ...Covariant,
  ...Of,
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
  reduce
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
  ...Covariant,
  extend
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
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

export const exists = <A>(predicate: (a: A) => boolean) =>
  (ma: Option<A>): boolean => isNone(ma) ? false : predicate(ma.value)

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
) => <A>(self: Option<A>) => Option<{ readonly [K in N]: A }> = invariant.bindTo(Invariant)

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
export const andThenBind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  semiProduct.andThenBind(SemiApplicative)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 1.0.0
 */
export const Zip: Option<readonly []> = some([])

/**
 * @since 1.0.0
 */
export const tupled: <A>(self: Option<A>) => Option<readonly [A]> = invariant.tupled(Invariant)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 1.0.0
 */
export const productFlatten: <B>(
  fb: Option<B>
) => <A extends ReadonlyArray<unknown>>(self: Option<A>) => Option<readonly [...A, B]> = semiProduct
  .productFlatten(SemiProduct)
