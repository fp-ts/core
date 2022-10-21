import * as nonEmptyAlternative from "@fp-ts/core/typeclass/NonEmptyAlternative"
import type { TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"

export interface ReaderAsyncWriter<R, E, A> {
  (r: R): () => Promise<[E, A]>
}

export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this["In"], this["Out1"], this["Target"]>
}

declare const fa: ReaderAsyncWriter<{ a: string }, "a", string>
declare const fb: ReaderAsyncWriter<{ b: number }, "b", number>

export declare const NonEmptyAlternative: nonEmptyAlternative.NonEmptyAlternative<ReaderAsyncWriterTypeLambda>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: number; }, "a" | "b", string | number>
pipe(fa, NonEmptyAlternative.coproduct(fb))
