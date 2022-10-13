/**
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Covariant<F extends TypeLambda> extends TypeClass<F> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}

/**
 * Returns a default `map` composition.
 *
 * @since 3.0.0
 */
export const mapComposition = <F extends TypeLambda, G extends TypeLambda>(
  CovariantF: Covariant<F>,
  CovariantG: Covariant<G>
): (<A, B>(
  f: (a: A) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>) =>
  (f) => CovariantF.map(CovariantG.map(f))

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap = <F extends TypeLambda>(Covariant: Covariant<F>) =>
  <A>(a: A): (<S, R, O, E, B>(self: Kind<F, S, R, O, E, (a: A) => B>) => Kind<F, S, R, O, E, B>) =>
    Covariant.map(f => f(a))

/**
 * @category mapping
 * @since 3.0.0
 */
export const as = <F extends TypeLambda>(Covariant: Covariant<F>) =>
  <B>(b: B): (<S, R, O, E>(self: Kind<F, S, R, O, E, unknown>) => Kind<F, S, R, O, E, B>) =>
    Covariant.map(() => b)

/**
 * @category mapping
 * @since 3.0.0
 */
export const unit = <F extends TypeLambda>(
  Covariant: Covariant<F>
): (<S, R, O, E>(self: Kind<F, S, R, O, E, unknown>) => Kind<F, S, R, O, E, void>) =>
  as(Covariant)(undefined)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo = <F extends TypeLambda>(Covariant: Covariant<F>) =>
  <N extends string>(
    name: N
  ): (<S, R, O, E, A>(
    self: Kind<F, S, R, O, E, A>
  ) => Kind<F, S, R, O, E, { readonly [K in N]: A }>) =>
    Covariant.map((a) => ({ [name]: a } as any))

const let_ = <F extends TypeLambda>(
  F: Covariant<F>
): (<N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, O, E>(
  self: Kind<F, S, R, O, E, A>
) => Kind<F, S, R, O, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) => {
  return (name, f) => F.map((a) => Object.assign({}, a, { [name]: f(a) }) as any)
}

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled = <F extends TypeLambda>(
  Covariant: Covariant<F>
): (<S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, readonly [A]>) =>
  Covariant.map((a) => [a])
