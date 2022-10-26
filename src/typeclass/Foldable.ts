/**
 * @since 1.0.0
 */

import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import type { Coproduct } from "@fp-ts/core/typeclass/Coproduct"
import type { Monad } from "@fp-ts/core/typeclass/Monad"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => B

  readonly reduceRight: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => B
}

/**
 * Returns a default `reduce` composition.
 *
 * @since 1.0.0
 */
export const reduceComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) =>
  <B, A>(b: B, f: (b: B, a: A) => B) =>
    <FR, FO, FE, GR, GO, GE>(
      self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
    ): B => pipe(self, F.reduce(b, (b, ga) => pipe(ga, G.reduce(b, f))))

/**
 * Returns a default `reduceRight` composition.
 *
 * @since 1.0.0
 */
export const reduceRightComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) =>
  <B, A>(b: B, f: (b: B, a: A) => B) =>
    <FR, FO, FE, GR, GO, GE>(
      self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
    ): B => pipe(self, F.reduceRight(b, (b, ga) => pipe(ga, G.reduceRight(b, f))))

/**
 * Returns a default `reduceRight` implementation.
 *
 * @since 1.0.0
 */
export const reduceRight = <F extends TypeLambda>(
  reduce: Foldable<F>["reduce"]
): Foldable<F>["reduceRight"] =>
  <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) =>
    <R, O, E>(self: Kind<F, R, O, E, A>): B =>
      internalToReadonlyArrayWith(reduce)(self, identity).reduceRight(f, b)

/**
 * @since 1.0.0
 */
export const foldMap = <F extends TypeLambda>(F: Foldable<F>) =>
  <M>(M: Monoid<M>) =>
    <A>(f: (a: A) => M) =>
      <R, O, E>(self: Kind<F, R, O, E, A>): M => M.combineAll(toReadonlyArrayWith(F)(f)(self))

/**
 * @since 1.0.0
 */
export const toReadonlyArrayWith = <F extends TypeLambda>(
  F: Foldable<F>
) =>
  <A, B>(f: (a: A) => B) =>
    <R, O, E>(self: Kind<F, R, O, E, A>): ReadonlyArray<B> =>
      internalToReadonlyArrayWith(F.reduce)(self, f)

/**
 * @since 1.0.0
 */
export const toReadonlyArray = <F extends TypeLambda>(
  F: Foldable<F>
): <R, O, E, A>(self: Kind<F, R, O, E, A>) => ReadonlyArray<A> => toReadonlyArrayWith(F)(identity)

/**
 * @since 1.0.0
 */
export const reduceKind = <F extends TypeLambda>(F: Foldable<F>) =>
  <G extends TypeLambda>(G: Monad<G>) =>
    <B, A, R, O, E>(
      b: B,
      f: (b: B, a: A) => Kind<G, R, O, E, B>
    ): <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B> =>
      F.reduce<A, Kind<G, R, O, E, B>>(
        G.of(b),
        (gb, a) => pipe(gb, G.flatMap(b => f(b, a)))
      )

/**
 * @since 1.0.0
 */
export const reduceRightKind = <F extends TypeLambda>(F: Foldable<F>) =>
  <G extends TypeLambda>(G: Monad<G>) =>
    <B, A, R, O, E>(
      b: B,
      f: (b: B, a: A) => Kind<G, R, O, E, B>
    ): <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B> =>
      F.reduceRight<A, Kind<G, R, O, E, B>>(
        G.of(b),
        (gb, a) => pipe(gb, G.flatMap(b => f(b, a)))
      )

/**
 * @since 1.0.0
 */
export const foldMapKind = <F extends TypeLambda>(F: Foldable<F>) =>
  <G extends TypeLambda>(G: Coproduct<G>) =>
    <A, R, O, E, B>(
      f: (a: A) => Kind<G, R, O, E, B>
    ): <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B> =>
      F.reduce<A, Kind<G, R, O, E, B>>(
        G.zero(),
        (gb, a) => pipe(gb, G.coproduct(f(a)))
      )

const internalToReadonlyArrayWith = <F extends TypeLambda>(
  reduce: Foldable<F>["reduce"]
) =>
  <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): ReadonlyArray<B> =>
    reduce<A, Array<B>>([], (out, a) => {
      out.push(f(a))
      return out
    })(self)
