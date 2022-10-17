import type * as foldable from "@fp-ts/core/Foldable"
import type * as foldableWithIndex from "@fp-ts/core/FoldableWithIndex"
import type * as functor from "@fp-ts/core/Functor"
import type * as functorWithIndex from "@fp-ts/core/FunctorWithIndex"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type * as monoidal from "@fp-ts/core/Monoidal"
import type * as semigroupal from "@fp-ts/core/Semigroupal"
import type { Sortable } from "@fp-ts/core/Sortable"
import type * as traverse_ from "@fp-ts/core/Traversable"
import type * as traverseWithIndex_ from "@fp-ts/core/TraversableWithIndex"
import type { NonEmptyReadonlyArray } from "./NonEmptyReadonlyArray"
import * as O from "./Option"

export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Out1"]>
}

const map = <A, B>(f: (a: A) => B) =>
  (self: ReadonlyArray<A>): ReadonlyArray<B> => self.map(a => f(a))

export const Functor: functor.Functor<ReadonlyArrayTypeLambda> = {
  map
}

export const FunctorWithIndex: functorWithIndex.FunctorWithIndex<ReadonlyArrayTypeLambda, number> =
  {
    mapWithIndex: (f) => (self) => self.map((a, i) => f(a, i))
  }

export const Foldable: foldable.Foldable<ReadonlyArrayTypeLambda> = {
  reduce: (b, f) => self => self.reduce((b, a) => f(b, a), b),
  reduceRight: (b, f) => self => self.reduceRight((b, a) => f(b, a), b)
}

export const reduceWithIndex = <A, B>(
  b: B,
  f: (b: B, a: A, i: number) => B
) => (self: ReadonlyArray<A>) => self.reduce((b, a, i) => f(b, a, i), b)

export const reduceRightWithIndex = <A, B>(b: B, f: (b: B, a: A, i: number) => B) =>
  (self: ReadonlyArray<A>): B => self.reduceRight((b, a, i) => f(b, a, i), b)

export const FoldableWithIndex: foldableWithIndex.FoldableWithIndex<
  ReadonlyArrayTypeLambda,
  number
> = {
  reduceWithIndex,
  reduceRightWithIndex
}

export const isNonEmpty = <A>(self: ReadonlyArray<A>): self is NonEmptyReadonlyArray<A> =>
  self.length > 0

export const head = <A>(
  self: ReadonlyArray<A>
): O.Option<A> => (isNonEmpty(self) ? O.some(self[0]) : O.none)

export const sort = <B>(Compare: Sortable<B>) =>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
    as.length <= 1 ? as : as.slice().sort((a1, a2) => Compare.compare(a2)(a1))

export function concat<B>(
  that: NonEmptyReadonlyArray<B>
): <A>(self: ReadonlyArray<A>) => NonEmptyReadonlyArray<A | B>
export function concat<B>(
  that: ReadonlyArray<B>
): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyReadonlyArray<A | B>
export function concat<B>(
  that: ReadonlyArray<B>
): <A>(self: NonEmptyReadonlyArray<A>) => ReadonlyArray<A | B> {
  return <A>(self: NonEmptyReadonlyArray<A | B>) => self.concat(that)
}

export const traverseWithIndex = <F extends TypeLambda>(Monoidal: monoidal.Monoidal<F>) =>
  <A, S, R, O, E, B>(f: (a: A, i: number) => Kind<F, S, R, O, E, B>) =>
    (self: Iterable<A>): Kind<F, S, R, O, E, ReadonlyArray<B>> =>
      Monoidal.zipAll(Array.from(self).map((a, i) => f(a, i)))

export const traverse = <F extends TypeLambda>(
  Monoidal: monoidal.Monoidal<F>
) =>
  <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, B>
  ): (self: ReadonlyArray<A>) => Kind<F, S, R, O, E, ReadonlyArray<B>> =>
    traverseWithIndex(Monoidal)((a) => f(a))

export const Traverse: traverse_.Traversable<ReadonlyArrayTypeLambda> = {
  traverse
}

export const TraverseWithIndex: traverseWithIndex_.TraversableWithIndex<
  ReadonlyArrayTypeLambda,
  number
> = {
  traverseWithIndex
}

export const zipWith = <B, A, C>(that: ReadonlyArray<B>, f: (a: A, b: B) => C) =>
  (self: ReadonlyArray<A>): ReadonlyArray<C> => {
    const out: Array<C> = []
    for (const a of self) {
      for (const b of that) {
        out.push(f(a, b))
      }
    }
    return out
  }

export const Semigroupal: semigroupal.Semigroupal<ReadonlyArrayTypeLambda> = {
  map,
  zipWith,
  zipMany: <A>(collection: Iterable<ReadonlyArray<A>>) =>
    (self: ReadonlyArray<A>): ReadonlyArray<readonly [A, ...Array<A>]> => {
      const fa: ReadonlyArray<readonly [A, ...Array<A>]> = pipe(
        self,
        Functor.map(a => [a] as const)
      )
      const fas = Array.from(collection)
      if (fas.length === 0) {
        return fa
      }
      let out = fa
      for (const c of fas) {
        out = pipe(out, zipWith(c, (a, b) => [...a, b]))
      }
      return out
    }
}
