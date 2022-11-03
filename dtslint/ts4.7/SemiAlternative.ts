import * as _ from "@fp-ts/core/typeclass/SemiAlternative"
import type { TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"

interface RAW<R, E, A> {
  (r: R): () => Promise<readonly [E, A]>
}

interface RAWTypeLambda extends TypeLambda {
  readonly type: RAW<this["In"], this["Out1"], this["Target"]>
}

declare const fa: RAW<{ a: string }, string, "fa">
declare const fb: RAW<{ b: number }, number, "fb">

declare const SemiAlternative: _.SemiAlternative<RAWTypeLambda>

// $ExpectType RAW<{ a: string; } & { b: number; }, string | number, "fa" | "fb">
pipe(fa, SemiAlternative.coproduct(fb))
