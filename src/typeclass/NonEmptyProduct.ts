/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface NonEmptyProduct<F extends TypeLambda> extends Invariant<F> {
  readonly product: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>

  readonly productMany: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, readonly [A, ...ReadonlyArray<A>]>
}

/**
 * @since 1.0.0
 */
export const bindRight = <F extends TypeLambda>(F: NonEmptyProduct<F>) =>
  <N extends string, A extends object, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    fb: Kind<F, R2, O2, E2, B>
  ) =>
    <R1, O1, E1>(
      self: Kind<F, R1, O1, E1, A>
    ): Kind<
      F,
      R1 & R2,
      O1 | O2,
      E1 | E2,
      { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
    > =>
      pipe(
        self,
        F.product(fb),
        F.imap(
          ([a, b]) => Object.assign({}, a, { [name]: b }) as any,
          ({ [name]: b, ...rest }) => [rest, b] as any
        )
      )

/**
 * @since 1.0.0
 */
export const productFlatten = <F extends TypeLambda>(F: NonEmptyProduct<F>) =>
  <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) =>
    <R1, O1, E1, A extends ReadonlyArray<any>>(
      self: Kind<F, R1, O1, E1, A>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]> =>
      pipe(
        self,
        F.product(that),
        F.imap(([a, b]) => [...a, b] as const, ab => [ab.slice(0, -1), ab[ab.length - 1]] as any)
      )
