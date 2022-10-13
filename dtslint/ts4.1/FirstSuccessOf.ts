import type * as firstSuccessOf_ from "@fp-ts/core/FirstSuccessOf"
import type { TypeLambda } from "@fp-ts/core/HKT"

export interface ReaderAsyncWriter<R, E, A> {
  (r: R): () => Promise<[E, A]>
}

export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this["In1"], this["Out2"], this["Out1"]>
}

export declare const FirstSuccessOf: firstSuccessOf_.FirstSuccessOf<ReaderAsyncWriterTypeLambda>

declare const a: ReaderAsyncWriter<{ a: string }, "a", string>
declare const b: ReaderAsyncWriter<{ b: string }, "b", number>
declare const c: ReaderAsyncWriter<{ c: string }, "c", boolean>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: string; } & { c: string; }, "a" | "b" | "c", string | number | boolean>
FirstSuccessOf.firstSuccessOf(a, b, c)
// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: string; } & { c: string; }, "a" | "b" | "c", string | number | boolean>
FirstSuccessOf.firstSuccessOfIterable(a, [b, c])
