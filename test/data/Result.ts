import type * as functor from "@fp-ts/core/Functor"
import type { TypeLambda } from "@fp-ts/core/HKT"
import * as zippable from "@fp-ts/core/Zippable"

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

export const Zippable: zippable.Zippable<ResultTypeLambda> = zippable.fromFunctor(
  Functor,
  <E, A>(start: Result<E, A>, others: Iterable<Result<E, A>>) => {
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
)

export const zip: <E1, A, E2, B>(
  fa: Result<E1, A>,
  fb: Result<E2, B>
) => Result<E1 | E2, readonly [A, B]> = zippable.zip(Zippable)

export const zip3: <E1, A, E2, B, E3, C>(
  fa: Result<E1, A>,
  fb: Result<E2, B>,
  fc: Result<E3, C>
) => Result<E1 | E2 | E3, readonly [A, B, C]> = zippable.zip3(Zippable)
