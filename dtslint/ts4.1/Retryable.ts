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
declare const fb1: ReaderAsyncWriter<{ b: string }, "b", number>
declare const fb2: ReaderAsyncWriter<{ b: string }, "b", number>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: string; }, "a" | "b", string | number>
Retryable.firstSuccessOf(fa, fb1)
// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: string; }, "a" | "b", string | number>
Retryable.firstSuccessOfMany(fa, [fb1, fb2])
