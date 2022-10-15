import * as flatMap_ from "@fp-ts/core/FlatMap"
import * as foldable from "@fp-ts/core/Foldable"
import * as functor from "@fp-ts/core/Functor"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import type * as monoidal from "@fp-ts/core/Monoidal"
import * as monoidKind from "@fp-ts/core/MonoidKind"
import * as semigroupal from "@fp-ts/core/Semigroupal"
import type * as semigroupKind from "@fp-ts/core/SemigroupKind"
import type * as succeed_ from "@fp-ts/core/Succeed"

export interface None {
  readonly _tag: "None"
}

export interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

export type Option<A> = None | Some<A>

export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this["Out1"]>
}

export const isNone = <A>(fa: Option<A>): fa is None => fa._tag === "None"

export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === "Some"

export const none: Option<never> = { _tag: "None" }

export const some = <A>(a: A): Option<A> => ({ _tag: "Some", value: a })

export const Succeed: succeed_.Succeed<OptionTypeLambda> = {
  succeed: some
}

export const reduce = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Option<A>): B => isNone(self) ? b : f(b, self.value)

export const reduceRight = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Option<A>): B => isNone(self) ? b : f(b, self.value)

export const Foldable: foldable.Foldable<OptionTypeLambda> = {
  reduce,
  reduceRight
}

export const foldMap: <M>(
  Monoid: Monoid<M>
) => <A>(f: (a: A) => M) => (self: Option<A>) => M = foldable.foldMap(Foldable)

export const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B> = (f) =>
  (fa) => isNone(fa) ? none : some(f(fa.value))

export const Functor: functor.Functor<OptionTypeLambda> = {
  map
}

export const bindTo: <N extends string>(
  name: N
) => <A>(self: Option<A>) => Option<{ readonly [K in N]: A }> = functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  functor.let(Functor)

export { let_ as let }

export const tupled: <A>(self: Option<A>) => Option<readonly [A]> = functor.tupled(Functor)

export const flatMap: <A, B>(f: (a: A) => Option<B>) => (self: Option<A>) => Option<B> = (f) =>
  (self) => isNone(self) ? none : f(self.value)

export const FlatMap: flatMap_.FlatMap<OptionTypeLambda> = {
  map,
  flatMap
}

export const tap: <A>(f: (a: A) => Option<unknown>) => (self: Option<A>) => Option<A> = flatMap_
  .tap(FlatMap)

export const composeKind: <B, C>(
  bfc: (b: B) => Option<C>
) => <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C> = flatMap_.composeKind(
  FlatMap
)

export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  flatMap_.bind(FlatMap)

const zipManyWith = <A, B>(
  start: Option<A>,
  others: Iterable<Option<A>>,
  f: (as: [A, ...ReadonlyArray<A>]) => B
): Option<B> => {
  if (isNone(start)) {
    return none
  }
  const out: [A, ...Array<A>] = [start.value]
  for (const o of others) {
    if (isNone(o)) {
      return none
    }
    out.push(o.value)
  }
  return some(f(out))
}

export const Semigroupal: semigroupal.Semigroupal<OptionTypeLambda> = {
  map,
  zipWith: (fa, fb, f) => isNone(fa) ? none : isNone(fb) ? none : some(f(fa.value, fb.value)),
  zipManyWith
}

export const zip: <B, A>(
  that: Option<B>
) => (self: Option<A>) => Option<readonly [A, B]> = semigroupal.zip(Semigroupal)

export const zipWith: <B, A, C>(
  that: Option<B>,
  f: (a: A, b: B) => C
) => (self: Option<A>) => Option<C> = semigroupal.zipWith(Semigroupal)

export const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B> = semigroupal
  .ap(
    Semigroupal
  )

export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Option<A>, fb: Option<B>) => Option<C> =
  semigroupal.lift2(Semigroupal)

export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Option<A>, fb: Option<B>, fc: Option<C>) => Option<D> = semigroupal.lift3(Semigroupal)

export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  semigroupal.bindRight(Semigroupal)

export const zipFlatten: <B>(
  fb: Option<B>
) => <A extends ReadonlyArray<unknown>>(self: Option<A>) => Option<readonly [...A, B]> = semigroupal
  .zipFlatten(Semigroupal)

export const catchAll = <B>(that: () => Option<B>) =>
  <A>(self: Option<A>): Option<A | B> => isNone(self) ? that() : self

export const Do: Option<{}> = some({})

const zipAllWith = <A, B>(
  collection: Iterable<A>,
  f: (a: A, i: number) => Option<B>
): Option<ReadonlyArray<B>> => {
  const out = []
  let i = 0
  for (const a of collection) {
    const ob = f(a, i++)
    if (isNone(ob)) {
      return none
    }
    out.push(ob.value)
  }
  return some(out)
}

export const Monoidal: monoidal.Monoidal<OptionTypeLambda> = {
  ...Semigroupal,
  succeed: some,
  zipAllWith
}

const combineKind = <A, B>(
  first: Option<A>,
  second: Option<B>
): Option<A | B> => isSome(first) ? first : isSome(second) ? second : none

export const combineKindMany = <A>(
  start: Option<A>,
  others: Iterable<Option<A>>
): Option<A> => {
  let out = start
  if (isSome(out)) {
    return out
  }
  for (out of others) {
    if (isSome(out)) {
      return out
    }
  }
  return none
}

export const SemigroupKind: semigroupKind.SemigroupKind<OptionTypeLambda> = {
  map,
  combineKind,
  combineKindMany
}

export const MonoidKind: monoidKind.MonoidKind<OptionTypeLambda> = monoidKind
  .fromSemigroupKind(SemigroupKind, () => none)
