import type { Either, Left, Right } from "@fp-ts/core/data/Either"
import type { Kind, TypeLambda, Variance } from "@fp-ts/core/HKT"
import type { SemiAlternative } from "@fp-ts/core/typeclass/SemiAlternative"

export interface Both<E, A> {
  readonly _tag: "Both"
  readonly left: E
  readonly right: A
}

export type These<E, A> = Either<E, A> | Both<E, A>

export type NonEmptyChunk<A> = readonly [A, ...Array<A>]

export const left = <E>(left: E): These<E, never> => ({ _tag: "Left", left })

export const right = <A>(right: A): These<never, A> => ({ _tag: "Right", right })

export const both = <E, A>(left: E, right: A): These<E, A> => ({
  _tag: "Both",
  left,
  right
})

export const isLeft = <E, A>(self: These<E, A>): self is Left<E> => self._tag === "Left"

export const isRight = <E, A>(self: These<E, A>): self is Right<A> => self._tag === "Right"

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap = <F extends TypeLambda<Variance.Covariant>>(F: SemiAlternative<F>) =>
  <A, FR, FO, FE, E2, B>(f: (a: A) => These<Kind<F, FR, FO, FE, E2>, B>) =>
    <E1>(self: These<Kind<F, FR, FO, FE, E1>, A>): These<Kind<F, FR, FO, FE, E1 | E2>, B> => {
      type Out = These<Kind<F, FR, FO, FE, E1 | E2>, B>
      if (isLeft(self)) {
        return self
      } else if (isRight(self)) {
        return f(self.right) as Out
      } else {
        const that = f(self.right)
        return isLeft(that)
          ? left(F.coproduct(that.left)(self.left))
          : isRight(that)
          ? (both(self.left, that.right) as Out)
          : both(F.coproduct(that.left)(self.left), that.right)
      }
    }
