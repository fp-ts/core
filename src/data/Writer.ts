/**
 * @since 3.0.0
 */
import { flow, identity, pipe, SK } from "@fp-ts/core/data/Function"
import * as internal from "@fp-ts/core/data/internal"
import type { NonEmptyReadonlyArray } from "@fp-ts/core/data/NonEmptyReadonlyArray"
import * as nonEmptyReadonlyArrayModule from "@fp-ts/core/data/NonEmptyReadonlyArray"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type * as applicative from "@fp-ts/core/typeclasses/Applicative"
import type { Apply } from "@fp-ts/core/typeclasses/Apply"
import type * as bifunctor from "@fp-ts/core/typeclasses/Bifunctor"
import type * as comonad from "@fp-ts/core/typeclasses/Comonad"
import type { Flattenable } from "@fp-ts/core/typeclasses/Flattenable"
import type { FromIdentity } from "@fp-ts/core/typeclasses/FromIdentity"
import * as functor from "@fp-ts/core/typeclasses/Functor"
import type { Monad } from "@fp-ts/core/typeclasses/Monad"
import type { Monoid } from "@fp-ts/core/typeclasses/Monoid"
import type { Semigroup } from "@fp-ts/core/typeclasses/Semigroup"
import type * as traversable from "@fp-ts/core/typeclasses/Traversable"

/**
 * @category model
 * @since 3.0.0
 */
export type Writer<E, A> = readonly [E, A]

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface WriterTypeLambda extends TypeLambda {
  readonly type: Writer<this["Out2"], this["Out1"]>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface WriterTypeLambdaFix<E> extends TypeLambda {
  readonly type: Writer<E, this["Out1"]>
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const toReadonlyArray = <E, A>(self: Writer<E, A>): ReadonlyArray<A> => [right(self)]

/**
 * @category getters
 * @since 3.0.0
 */
export const left = <E, A>(self: Writer<E, A>): E => self[0]

/**
 * @category getters
 * @since 3.0.0
 */
export const right = <E, A>(self: Writer<E, A>): A => self[1]

/**
 * @since 3.0.0
 */
export const reverse = <E, A>(self: Writer<E, A>): Writer<A, E> => [right(self), left(self)]

/**
 * Appends a value to the accumulator.
 *
 * @category constructors
 * @since 3.0.0
 */
export const tell = <E>(e: E): Writer<E, void> => [e, undefined]

/**
 * Modifies the result to include the changes to the accumulator.
 *
 * @since 3.0.0
 */
export const listen = <E, A>(self: Writer<E, A>): Writer<E, readonly [E, A]> => {
  const [e, a] = self
  return [e, [e, a]]
}

/**
 * Applies the returned function to the accumulator.
 *
 * @since 3.0.0
 */
export const pass = <E, A>(self: Writer<E, readonly [A, (e: E) => E]>): Writer<E, A> => {
  const [e, [a, f]] = self
  return [f(e), a]
}

/**
 * Projects a value from modifications made to the accumulator during an action.
 *
 * @since 3.0.0
 */
export const listens = <E, B>(f: (e: E) => B) =>
  <A>(self: Writer<E, A>): Writer<E, readonly [A, B]> => {
    const [e, a] = self
    return [e, [a, f(e)]]
  }

/**
 * Modify the final accumulator value by applying a function.
 *
 * @since 3.0.0
 */
export const censor = <E>(f: (e: E) => E) =>
  <A>(self: Writer<E, A>): Writer<E, A> => {
    const [e, a] = self
    return [f(e), a]
  }

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map = <A, B>(f: (a: A) => B) =>
  <E>(self: Writer<E, A>): Writer<E, B> => {
    const [e, a] = self
    return [e, f(a)]
  }

/**
 * @since 3.0.0
 */
export const mapLeft = <E, G>(f: (e: E) => G) =>
  <A>(self: Writer<E, A>): Writer<G, A> => {
    const [e, a] = self
    return [f(e), a]
  }

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth = <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) =>
  (self: Writer<E, A>): Writer<G, B> => [f(left(self)), g(right(self))]

/**
 * @since 3.0.0
 */
export const extend = <E, A, B>(f: (self: Writer<E, A>) => B) =>
  (self: Writer<E, A>): Writer<E, B> => [left(self), f(self)]

/**
 * @since 3.0.0
 */
export const duplicate: <E, A>(self: Writer<E, A>) => Writer<E, Writer<E, A>> = extend(identity)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce = <B, A>(b: B, f: (b: B, a: A) => B) =>
  <E>(self: Writer<E, A>): B => f(b, right(self))

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap = <M>(_: Monoid<M>) =>
  <A>(f: (a: A) => M) => <E>(self: Writer<E, A>): M => f(right(self))

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight = <B, A>(b: B, f: (a: A, b: B) => B) =>
  <E>(self: Writer<E, A>): B => f(right(self), b)

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse = <F extends TypeLambda>(F: Apply<F>) =>
  <A, S, R, O, FE, B>(f: (a: A) => Kind<F, S, R, O, FE, B>) =>
    <E>(self: Writer<E, A>): Kind<F, S, R, O, FE, Writer<E, B>> =>
      pipe(
        f(right(self)),
        F.map((b) => [left(self), b])
      )

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence = <F extends TypeLambda>(
  F: Apply<F>
): <W, S, R, O, E, A>(
  self: Writer<W, Kind<F, S, R, O, E, A>>
) => Kind<F, S, R, O, E, Writer<W, A>> => traverse(F)(identity)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<WriterTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<WriterTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: Writer<E, (a: A) => B>) => Writer<E, B> = functor.flap(
  Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: comonad.Comonad<WriterTypeLambda> = {
  map,
  extend,
  extract: right
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<WriterTypeLambda> = {
  traverse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromIdentity = <E>(Monoid: Monoid<E>): FromIdentity<WriterTypeLambdaFix<E>> => ({
  of: (a) => [Monoid.empty, a]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(Semigroup: Semigroup<E>): Apply<WriterTypeLambdaFix<E>> => ({
  map,
  ap: (fa) =>
    (fab) => {
      const [w1, f] = fab
      const [w2, a] = fa
      return [Semigroup.combine(w2)(w1), f(a)]
    }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(
  Monoid: Monoid<E>
): applicative.Applicative<WriterTypeLambdaFix<E>> => {
  const Apply = getApply(Monoid)
  const FromIdentity = getFromIdentity(Monoid)
  return {
    map,
    ap: Apply.ap,
    of: FromIdentity.of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFlattenable = <E>(S: Semigroup<E>): Flattenable<WriterTypeLambdaFix<E>> => {
  return {
    map,
    flatMap: (f) =>
      (ma) => {
        const [w1, a] = ma
        const [w2, b] = f(a)
        return [S.combine(w2)(w1), b]
      }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(M: Monoid<E>): Monad<WriterTypeLambdaFix<E>> => {
  const P = getFromIdentity(M)
  const C = getFlattenable(M)
  return {
    map,
    of: P.of,
    flatMap: C.flatMap
  }
}

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <E>(Semigroup: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => Writer<E, B>) =>
    (as: NonEmptyReadonlyArray<A>): Writer<E, NonEmptyReadonlyArray<B>> => {
      // TODO
      return nonEmptyReadonlyArrayModule.traverseWithIndex(getApply(Semigroup))(f)(as)
    }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <E>(Monoid: Monoid<E>) =>
  <A, B>(
    f: (index: number, a: A) => Writer<E, B>
  ): ((as: ReadonlyArray<A>) => Writer<E, ReadonlyArray<B>>) => {
    const g = traverseNonEmptyReadonlyArrayWithIndex(Monoid)(f)
    return (as) => (internal.isNonEmpty(as) ? g(as) : [Monoid.empty, internal.empty])
  }

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(getApply(S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <E>(Semigroup: Semigroup<E>) => {
  const traverseNonEmptyReadonlyArrayWithIndexS = traverseNonEmptyReadonlyArrayWithIndex(Semigroup)
  return <A, B>(
    f: (a: A) => Writer<E, B>
  ): ((as: NonEmptyReadonlyArray<A>) => Writer<E, NonEmptyReadonlyArray<B>>) => {
    return traverseNonEmptyReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <E>(Monoid: Monoid<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndex(Monoid)
  return <A, B>(
    f: (a: A) => Writer<E, B>
  ): ((as: ReadonlyArray<A>) => Writer<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <E>(
  Monoid: Monoid<E>
): (<A>(arr: ReadonlyArray<Writer<E, A>>) => Writer<E, ReadonlyArray<A>>) =>
  traverseReadonlyArray(Monoid)(identity)
