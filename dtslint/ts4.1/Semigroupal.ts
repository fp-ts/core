import * as semigroupal from "@fp-ts/core/Semigroupal"
import type { TypeLambda } from "@fp-ts/core/HKT"

export interface ReaderAsyncWriter<R, E, A> {
  (r: R): () => Promise<[E, A]>
}

export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this["In1"], this["Out2"], this["Out1"]>
}

declare const fa: ReaderAsyncWriter<{ a: string }, "a", string>
declare const fb: ReaderAsyncWriter<{ b: number }, "b", number>
declare const fc: ReaderAsyncWriter<{ c: boolean }, "c", boolean>

export declare const Semigroupal: semigroupal.Semigroupal<ReaderAsyncWriterTypeLambda>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: number; } & { c: boolean; }, "a" | "b" | "c", readonly [string, number, boolean]>
semigroupal.lift3(Semigroupal)((a: string, b: number, c: boolean) => [a, b, c] as const)(fa, fb, fc)

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: number; } & { c: boolean; }, "a" | "b" | "c", readonly [unknown, unknown, unknown]>
semigroupal.lift3(Semigroupal)(<A, B, C>(a: A, b: B, c: C): readonly [A, B, C] => [a, b, c])(fa, fb, fc)

export const f: <R1, E1, A, R2, E2, B, R3, E3, C>(
  fa: ReaderAsyncWriter<R1, E1, A>,
  fb: ReaderAsyncWriter<R2, E2, B>,
  fc: ReaderAsyncWriter<R3, E3, C>
) => ReaderAsyncWriter<R1 & R2 & R3, E1 | E2 | E3, readonly [A, B, C]> = semigroupal.lift3(Semigroupal)(<A, B, C>(a: A, b: B, c: C): readonly [A, B, C] => [a, b, c])
