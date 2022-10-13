import type * as firstSuccessOf_ from "@fp-ts/core/FirstSuccessOf"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Result } from "./Result"

export interface Async<R, E, A> {
  (r: R): () => Promise<Result<E, A>>
}

export interface AsyncTypeLambda extends TypeLambda {
  readonly type: Async<this["In1"], this["Out2"], this["Out1"]>
}

export declare const FirstSuccessOf: firstSuccessOf_.FirstSuccessOf<AsyncTypeLambda>

declare const a: Async<{ a: string }, "a", string>
declare const b: Async<{ b: string }, "b", number>
declare const c: Async<{ c: string }, "c", boolean>

export const x = FirstSuccessOf.firstSuccessOf(a, b, c)
export const y = FirstSuccessOf.firstSuccessOfIterable(a, [b, c])
