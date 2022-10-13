export interface Failure<E> {
  readonly _tag: "Failure"
  readonly failure: E
}

export interface Success<A> {
  readonly _tag: "Success"
  readonly success: A
}

export type Result<E, A> = Failure<E> | Success<A>

export const isFailure = <E, A>(self: Result<E, A>): self is Failure<E> => self._tag === "Failure"

export const isSuccess = <E, A>(self: Result<E, A>): self is Success<A> => self._tag === "Success"

export const fail = <E>(e: E): Result<E, never> => ({ _tag: "Failure", failure: e })

export const succeed = <A>(a: A): Result<never, A> => ({ _tag: "Success", success: a })
