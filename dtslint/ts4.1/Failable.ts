import type * as failable from "@fp-ts/core/Failable"
import type { TypeLambda } from "@fp-ts/core/HKT"

export interface ReaderAsyncWriter<R, E, A> {
  (r: R): () => Promise<[E, A]>
}

export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this["In1"], this["Out2"], this["Out1"]>
}

export declare const Failable: failable.Failable<ReaderAsyncWriterTypeLambda>

declare const a: ReaderAsyncWriter<{ a: string }, "a", string>
declare const b: ReaderAsyncWriter<{ b: string }, "b", number>
declare const c: ReaderAsyncWriter<{ b: string }, "b", number>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: string; }, "a" | "b", string | number>
Failable.firstSuccessOf(a, b, c)
// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: string; }, "a" | "b", string | number>
Failable.firstSuccessOfMany(a, [b, c])
