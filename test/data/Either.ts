import type { TypeLambda } from "@fp-ts/core/HKT"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"

export interface Left<out E> {
  readonly _tag: "Left"
  readonly left: E
}

export interface Right<out A> {
  readonly _tag: "Right"
  readonly right: A
}

export type Either<E, A> = Left<E> | Right<A>

export interface EitherTypeLambda extends TypeLambda {
  readonly type: Either<this["Out1"], this["Target"]>
}

export const left = <E>(e: E): Either<E, never> => ({ _tag: "Left", left: e })

export const right = <A>(a: A): Either<never, A> => ({ _tag: "Right", right: a })

/**
 * @since 1.0.0
 */
export const isLeft = <E, A>(self: Either<E, A>): self is Left<E> => self._tag === "Left"

/**
 * @since 1.0.0
 */
export const isRight = <E, A>(self: Either<E, A>): self is Right<A> => self._tag === "Right"

const map = <A, B>(f: (a: A) => B) =>
  <E>(self: Either<E, A>): Either<E, B> => isRight(self) ? right(f(self.right)) : self

const imap = covariant.imap<EitherTypeLambda>(map)

const coproduct = <E2, B>(
  that: Either<E2, B>
) => <E1, A>(self: Either<E1, A>): Either<E2, A | B> => isRight(self) ? self : that

export const SemiCoproduct: semiCoproduct.SemiCoproduct<EitherTypeLambda> = {
  imap,
  coproduct,
  coproductMany: collection =>
    self => {
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
}

export const getSemigroup: <E, A>() => Semigroup<Either<E, A>> = semiCoproduct
  .getSemigroup(SemiCoproduct)
