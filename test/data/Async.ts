import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Result } from "./Result"

export interface Async<R, E, A> {
  (r: R): () => Promise<Result<E, A>>
}

export interface AsyncTypeLambda extends TypeLambda {
  readonly type: Async<this["In1"], this["Out2"], this["Out1"]>
}
