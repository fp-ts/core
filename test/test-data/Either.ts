import type { Either, EitherTypeLambda } from "@fp-ts/core/data/Either"
import * as either from "@fp-ts/core/internal/Either"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import * as nonEmptyCoproduct from "@fp-ts/core/typeclass/NonEmptyCoproduct"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"

export const right = either.right

export const left = either.left

const map = <A, B>(f: (a: A) => B) =>
  <E>(self: Either<E, A>): Either<E, B> => either.isRight(self) ? right(f(self.right)) : self

const imap = covariant.imap<EitherTypeLambda>(map)

const coproduct = <E2, B>(
  that: Either<E2, B>
) => <E1, A>(self: Either<E1, A>): Either<E2, A | B> => either.isRight(self) ? self : that

export const NonEmptyCoproduct: nonEmptyCoproduct.NonEmptyCoproduct<EitherTypeLambda> = {
  imap,
  coproduct,
  coproductMany: collection =>
    self => {
      let out = self
      if (either.isRight(out)) {
        return out
      }
      for (out of collection) {
        if (either.isRight(out)) {
          return out
        }
      }
      return out
    }
}

export const getSemigroup: <E, A>() => Semigroup<Either<E, A>> = nonEmptyCoproduct
  .getSemigroup(NonEmptyCoproduct)
