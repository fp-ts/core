import type * as functor from "@fp-ts/core/Functor"
import type { TypeLambda } from "@fp-ts/core/HKT"
import * as semigroupal from "@fp-ts/core/Semigroupal"

export interface Failure<E> {
  readonly _tag: "Failure"
  readonly failure: E
}

export interface Success<A> {
  readonly _tag: "Success"
  readonly success: A
}

export type Result<E, A> = Failure<E> | Success<A>

export interface ResultTypeLambda extends TypeLambda {
  readonly type: Result<this["Out2"], this["Out1"]>
}

export const isFailure = <E, A>(self: Result<E, A>): self is Failure<E> => self._tag === "Failure"

export const isSuccess = <E, A>(self: Result<E, A>): self is Success<A> => self._tag === "Success"

export const fail = <E>(e: E): Result<E, never> => ({ _tag: "Failure", failure: e })

export const succeed = <A>(a: A): Result<never, A> => ({ _tag: "Success", success: a })

export const map = <A, B>(f: (a: A) => B) =>
  <E>(self: Result<E, A>): Result<E, B> => isFailure(self) ? self : succeed(f(self.success))

export const Functor: functor.Functor<ResultTypeLambda> = {
  map
}

const zipMany = <E, A>(
  start: Result<E, A>,
  others: Iterable<Result<E, A>>
): Result<E, [A, ...ReadonlyArray<A>]> => {
  if (isFailure(start)) {
    return start
  }
  const out: [A, ...Array<A>] = [start.success]
  for (const r of others) {
    if (isFailure(r)) {
      return r
    }
    out.push(r.success)
  }
  return succeed(out)
}

export const Semigroupal: semigroupal.Semigroupal<ResultTypeLambda> = {
  map,
  zipWith: (fa, fb, f) =>
    isFailure(fa) ? fa : isFailure(fb) ? fb : succeed(f(fa.success, fb.success)),
  zipMany
}

export const zip: <E2, B, A>(
  that: Result<E2, B>
) => <E1>(self: Result<E1, A>) => Result<E2 | E1, readonly [A, B]> = semigroupal.zip(Semigroupal)

export const zipWith: <E2, B, A, C>(
  that: Result<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: Result<E1, A>) => Result<E2 | E1, C> = semigroupal.zipWith(Semigroupal)
