import type { invariant, invariantSemigroupalProduct, semigroupalProduct } from "@fp-ts/core"
import { contravariant } from "@fp-ts/core"
import type { TypeLambda } from "@fp-ts/core/HKT"

export interface Predicate<A> {
  (a: A): boolean
}

export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this["Target"]>
}

const contramap = <B, A>(f: (b: B) => A) => (self: Predicate<A>): Predicate<B> => b => self(f(b))

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: contravariant.Contravariant<PredicateTypeLambda> = {
  contramap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<PredicateTypeLambda> = {
  imap: contravariant.imap(Covariant)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupalProduct: semigroupalProduct.SemigroupalProduct<PredicateTypeLambda> = {
  product: (that) => (self) => ([a, b]) => self(a) && that(b),
  productMany: <A>(
    others: Iterable<Predicate<A>>
  ) =>
    (start: Predicate<A>): Predicate<readonly [A, ...Array<A>]> => {
      return ([head, ...tail]) => {
        if (start(head) === false) {
          return false
        }
        const ps = Array.from(others)
        return ps.every((p, i) => p(tail[i]))
      }
    }
}

/**
 * @category instances
 * @since 1.0.0
 */
export const InvariantSemigroupalProduct: invariantSemigroupalProduct.InvariantSemigroupalProduct<
  PredicateTypeLambda
> = {
  ...SemigroupalProduct,
  ...Invariant
}
