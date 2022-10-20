/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Associative } from "@fp-ts/core/typeclass/Associative"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"
import type { SemigroupalProduct } from "@fp-ts/core/typeclass/SemigroupalProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface InvariantSemigroupalProduct<F extends TypeLambda>
  extends SemigroupalProduct<F>, Invariant<F>
{}

/**
 * Lift an `Associative` into 'F', the inner values are combined using the provided `Associative`.
 *
 * @since 1.0.0
 */
export const liftAssociative = <F extends TypeLambda>(
  F: InvariantSemigroupalProduct<F>
) =>
  <A, S, R, O, E>(Associative: Associative<A>): Associative<Kind<F, S, R, O, E, A>> => ({
    combine: (that) =>
      (self) =>
        pipe(
          self,
          F.product(that),
          F.imap(([a1, a2]) => Associative.combine(a2)(a1), (a) => {
            console.log("a", a)
            return [a, a] as const
          })
        ),
    combineMany: (collection) =>
      (self) =>
        pipe(
          self,
          F.productMany(collection),
          F.imap(
            ([head, ...tail]) => pipe(head, Associative.combineMany(tail)),
            (a) => [a] as const
          )
        )
  })
