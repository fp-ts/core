import type { TypeLambda } from "@fp-ts/core/HKT"
import type * as orElse_ from "@fp-ts/core/OrElse"
import type { Result } from "./Result"

export interface Async<R, E, A> {
  (r: R): () => Promise<Result<E, A>>
}

export interface AsyncTypeLambda extends TypeLambda {
  readonly type: Async<this["In1"], this["Out2"], this["Out1"]>
}

export declare const OrElse: orElse_.OrElse<AsyncTypeLambda>

// declare const a: Async<{ a: string }, "a", string>
// declare const b: Async<{ b: string }, "b", number>
// declare const c: Async<{ c: string }, "c", boolean>

// const x = OrElse.firstSuccessOf(a, [b, c])
