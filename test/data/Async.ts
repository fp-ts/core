import type { Result } from "./Result"

export interface Async<R, E, A> {
  (r: R): () => Promise<Result<E, A>>
}
