import * as coproduct from "@fp-ts/core/typeclass/Coproduct"
import type { TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/data/Function"

export interface ReaderAsyncWriter<R, E, A> {
  (r: R): () => Promise<[E, A]>
}

export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this["In"], this["Out2"], this["Out"]>
}

declare const fa: ReaderAsyncWriter<{ a: string }, "a", string>
declare const fb: ReaderAsyncWriter<{ b: number }, "b", number>

export declare const Coproduct: coproduct.Coproduct<ReaderAsyncWriterTypeLambda>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: number; }, "b", string | number>
pipe(fa, Coproduct.coproduct(fb))
