import type { Either, EitherTypeLambda } from "@fp-ts/core/data/Either"
import { isRight, right } from "@fp-ts/core/internal/Either"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as nonEmptyCoproduct from "@fp-ts/core/typeclass/NonEmptyCoproduct"

const map = <A, B>(f: (a: A) => B) =>
  <E>(self: Either<E, A>): Either<E, B> => isRight(self) ? right(f(self.right)) : self

const imap = covariant.imap<EitherTypeLambda>(map)

const coproduct = <E2, B>(
  that: Either<E2, B>
) => <E1, A>(self: Either<E1, A>): Either<E2, A | B> => isRight(self) ? self : that

export const NonEmptyCoproduct: nonEmptyCoproduct.NonEmptyCoproduct<EitherTypeLambda> = {
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
