import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type * as nonEmptyTraversable from "@fp-ts/core/typeclass/NonEmptyTraversable"
import type { SemiApplicative } from "@fp-ts/core/typeclass/SemiApplicative"

export type NonEmptyArray<A> = [A, ...Array<A>]

export interface NonEmptyArrayTypeLambda extends TypeLambda {
  type: NonEmptyArray<this["Target"]>
}

export const make = <A>(
  ...as: [A, ...Array<A>]
): [A, ...Array<A>] => as

export const isNonEmpty = <A>(self: Array<A>): self is [A, ...Array<A>] => self.length > 0

export const head = <A>(as: [A, ...Array<A>]): A => as[0]
export const tail = <A>(as: [A, ...Array<A>]): Array<A> => as.slice(1)

export const mapWithIndex = <A, B>(
  f: (a: A, i: number) => B
) =>
  (self: NonEmptyArray<A>): NonEmptyArray<B> => {
    const out: [B, ...Array<B>] = [f(head(self), 0)]
    for (let i = 1; i < self.length; i++) {
      out.push(f(self[i], i))
    }
    return out
  }

export const map = <A, B>(
  f: (a: A) => B
): (self: NonEmptyArray<A>) => NonEmptyArray<B> => mapWithIndex(f)

export const traverseWithIndex = <F extends TypeLambda>(
  F: SemiApplicative<F>
) =>
  <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>) =>
    (self: NonEmptyArray<A>): Kind<F, R, O, E, NonEmptyArray<B>> => {
      const fbs = pipe(self, mapWithIndex(f))
      return pipe(
        head(fbs),
        F.productMany(tail(fbs))
      )
    }

export const traverseNonEmpty = <F extends TypeLambda>(
  F: SemiApplicative<F>
) =>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): ((self: NonEmptyArray<A>) => Kind<F, R, O, E, NonEmptyArray<B>>) => traverseWithIndex(F)(f)

export const Covariant: covariant.Covariant<NonEmptyArrayTypeLambda> = covariant.make(map)

export const NonEmptyTraversable: nonEmptyTraversable.NonEmptyTraversable<
  NonEmptyArrayTypeLambda
> = {
  traverseNonEmpty,
  sequenceNonEmpty: F => self => pipe(self, traverseNonEmpty(F)(identity))
}
