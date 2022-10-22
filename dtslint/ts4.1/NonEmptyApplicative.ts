import * as _ from "@fp-ts/core/typeclass/NonEmptyApplicative"
import type { TypeLambda } from "@fp-ts/core/HKT"

interface RAW<R, E, A> {
  (r: R): () => Promise<readonly [E, A]>
}

interface RAWTypeLambda extends TypeLambda {
  readonly type: RAW<this["In"], this["Out1"], this["Target"]>
}

declare const fa: RAW<{ a: string }, "a", string>
declare const fb: RAW<{ b: number }, "b", number>
declare const fc: RAW<{ c: boolean }, "c", boolean>

declare const NonEmptyApplicative: _.NonEmptyApplicative<RAWTypeLambda>

// $ExpectType RAW<{ a: string; } & { b: number; } & { c: boolean; }, "a" | "b" | "c", readonly [string, number, boolean]>
_.lift3(NonEmptyApplicative)((a: string, b: number, c: boolean) => [a, b, c] as const)(fa, fb, fc)

// $ExpectType RAW<{ a: string; } & { b: number; } & { c: boolean; }, "a" | "b" | "c", readonly [unknown, unknown, unknown]>
_.lift3(NonEmptyApplicative)(<A, B, C>(a: A, b: B, c: C): readonly [A, B, C] => [a, b, c])(fa, fb, fc)
