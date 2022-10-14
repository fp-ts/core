import type * as retryable from "@fp-ts/core/Retryable"
import type { TypeLambda } from "@fp-ts/core/HKT"

export interface ReaderAsyncWriter<R, E, A> {
  (r: R): () => Promise<[E, A]>
}

export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this["In1"], this["Out2"], this["Out1"]>
}

export declare const Retryable: retryable.Retryable<ReaderAsyncWriterTypeLambda>

declare const fa: ReaderAsyncWriter<{ a: string }, "a", string>
declare const fb: ReaderAsyncWriter<{ b: number }, "b", number>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: number; }, "a" | "b", string | number>
Retryable.firstSuccessOf(fa, fb)
