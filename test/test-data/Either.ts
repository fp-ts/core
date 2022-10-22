import type { Either, EitherTypeLambda } from "@fp-ts/core/data/Either"
import { isRight } from "@fp-ts/core/internal/Either"
import type * as nonEmptyCoproduct from "@fp-ts/core/typeclass/NonEmptyCoproduct"

const coproduct = <E2, B>(
  that: Either<E2, B>
) => <E1, A>(self: Either<E1, A>): Either<E2, A | B> => isRight(self) ? self : that

export const NonEmptyCoproduct: nonEmptyCoproduct.NonEmptyCoproduct<EitherTypeLambda> = {
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
