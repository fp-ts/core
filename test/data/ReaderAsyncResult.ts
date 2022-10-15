import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Result } from "./Result"
import * as result from "./Result"

export interface ReaderAsyncResult<R, E, A> {
  (r: R): () => Promise<Result<E, A>>
}

export interface ReaderAsyncResultTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncResult<this["In1"], this["Out2"], this["Out1"]>
}

export const combineKind = <R1, E1, A, R2, E2, B>(
  first: ReaderAsyncResult<R1, E1, A>,
  second: ReaderAsyncResult<R2, E2, B>
): ReaderAsyncResult<R1 & R2, E1 | E2, A | B> =>
  r =>
    () => first(r)().then<Result<E1 | E2, A | B>>(res => result.isSuccess(res) ? res : second(r)())
