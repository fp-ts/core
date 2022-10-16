import * as semigroupKind from "@fp-ts/core/SemigroupKind"
import type { TypeLambda } from "@fp-ts/core/HKT"

export interface ReaderAsyncWriter<R, E, A> {
  (r: R): () => Promise<[E, A]>
}

export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this["In1"], this["Out2"], this["Out1"]>
}

declare const fa: ReaderAsyncWriter<{ a: string }, "a", string>
declare const fb: ReaderAsyncWriter<{ b: number }, "b", number>

export declare const SemigroupKind: semigroupKind.SemigroupKind<ReaderAsyncWriterTypeLambda>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: number; }, "a" | "b", string | number>
SemigroupKind.combineKind(fa, fb)
