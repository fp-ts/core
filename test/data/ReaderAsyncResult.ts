import type { TypeLambda } from "@fp-ts/core/HKT"
// import type * as retryable from "@fp-ts/core/Retryable"
import type { Result } from "./Result"
import * as result from "./Result"

export interface ReaderAsyncResult<R, E, A> {
  (r: R): () => Promise<Result<E, A>>
}

export interface ReaderAsyncResultTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncResult<this["In1"], this["Out2"], this["Out1"]>
}

export const firstSuccessOf = <R1, E1, A, R2, E2, B>(
  first: ReaderAsyncResult<R1, E1, A>,
  second: ReaderAsyncResult<R2, E2, B>
): ReaderAsyncResult<R1 & R2, E1 | E2, A | B> =>
  r =>
    () => first(r)().then<Result<E1 | E2, A | B>>(res => result.isSuccess(res) ? res : second(r)())

export const firstSuccessOfWith = <R1, E1, A, R2, E2, B, C>(
  first: ReaderAsyncResult<R1, E1, A>,
  second: ReaderAsyncResult<R2, E2, B>,
  f: (ab: A | B, i: number) => C
): ReaderAsyncResult<R1 & R2, E1 | E2, C> =>
  r =>
    () =>
      first(r)().then<Result<E1 | E2, C>>(resA =>
        result.isSuccess(resA) ?
          result.succeed(f(resA.success, 0)) :
          second(r)().then(resB =>
            result.isSuccess(resB) ? result.succeed(f(resB.success, 1)) : result.fail(resB.failure)
          )
      )

// export const firstSuccessOfMany = <R, E, A>(
//   start: ReaderAsyncResult<R, E, A>,
//   others: Iterable<ReaderAsyncResult<R, E, A>>
// ): ReaderAsyncResult<R, E, A> => {
//   return null as any
// }

// export const firstSuccessOfManyWith = <R, E, A, B>(
//   start: ReaderAsyncResult<R, E, A>,
//   others: Iterable<ReaderAsyncResult<R, E, A>>,
//   f: (a: A, i: number) => B
// ): ReaderAsyncResult<R, E, B> => {
//   return null as any
// }

// export const Retryable: retryable.Retryable<ReaderAsyncResultTypeLambda> = {
//   firstSuccessOf,
//   firstSuccessOfWith,
//   firstSuccessOfMany,
//   firstSuccessOfManyWith
// }
